import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, retry, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { LoadingService } from '../loading.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(private _loadingService: LoadingService, private _router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const hasCityParam = request.params.has('city');
    if (hasCityParam) {
      request = request.clone({
        setParams: {
          key: environment.key,
          days: '10'
        }
      });
    }

    return next.handle(request).pipe(
      tap(response => {
        this._loadingService.show();
        // The 'weatherbit.io' API returns 204 for bad city name
        if (response instanceof HttpResponse && response.status === 204) {
          throw new Error('No content for provided data.');
        }
      }),
      retry(1),
      catchError(error => {
        // Not perfect error handling, but will do for now
        console.error(error);
        this._router.navigateByUrl('');
        return throwError(error);
      }),
      finalize(() => this._loadingService.hide())
    );
  }
}

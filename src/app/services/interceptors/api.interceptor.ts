import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, delay, finalize, map, retry, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { LoadingService } from '../loading.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(private _loadingService: LoadingService) {}

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
          throw new Error('No content');
        }
      }),
      delay(1000), // TODO: Remove this when done
      retry(1),
      catchError(error => throwError(error)),
      finalize(() => this._loadingService.hide())
    );
  }
}

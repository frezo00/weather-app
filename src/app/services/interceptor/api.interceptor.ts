import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, delay, finalize, retry, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { LoadingService } from '../loading.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(private _loadingService: LoadingService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = request.clone({
      setParams: {
        key: environment.key,
        days: '10',
        city: 'Split,HR'
      }
    });

    return next.handle(request).pipe(
      tap(_ => this._loadingService.show()),
      delay(1000),
      retry(1),
      finalize(() => this._loadingService.hide()),
      catchError(error => {
        return throwError(error);
      })
    );
  }
}

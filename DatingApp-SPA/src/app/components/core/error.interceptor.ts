import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {
            return throwError(error.statusText);
          }

          const applicationError = error.headers.get('Application-Error');
          if (applicationError) {
            console.error(applicationError);
            return throwError(applicationError);
          }

          const serveError = error.error.errors;
          let modelStateError = '';
          if (serveError && typeof serveError === 'object') {
            for (const key in serveError) {
              if (serveError[key]) {
                modelStateError += serveError[key] + '\n';
              }
            }
          }
          return throwError(modelStateError || serveError || 'Server Error!!');
        }
      })
    );
  }
}

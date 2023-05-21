import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router:Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError((err:HttpErrorResponse)=>{
      if (err) {
        if (err.status == 404) {
          this.router.navigateByUrl('/not-found')
        }
        if (err.status == 500) {
          this.router.navigateByUrl('/server-error')
        }
        if (err.status == 401 || err.status == 400) {
          Swal.fire({
            title: 'Error!',
            icon: 'error',
            timer:1000,
          })
        }
      }
      return throwError(()=>new Error(err.message))
    }));
  }
}

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse   //Nuevo
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';//Observable antiguo
/*  Nuevo para manejo de sesión */
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AddTokenInterceptor implements HttpInterceptor {

  constructor(private router: Router, private toastr: ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const token = localStorage.getItem('token');

    if (token) {
      request = request.clone({ setHeaders: { Authorization: `Bearer ${token}`}});
    }

    ///return next.handle(request);   old

    /*  Nuevo para manejo de sesión */
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401){
          this.toastr.error('Sesion expirada, por favor vuelva loguarse', 'Error!');
          this.router.navigate(['/inicio/login']);
        }
        return throwError(error);
      })
    );/* Fin bloque nuevo de sesión*/

  }
}

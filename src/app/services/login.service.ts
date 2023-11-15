import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Usuario } from '../models/Usuario';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  myAppUrl: string='';
  myApiUrl: string='';

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;//https://localhost:17994';
    this.myApiUrl = '/api/Login';
   }

   login(usuario: Usuario): Observable<any>{
    var servicio = this.myAppUrl + this.myApiUrl;
    return this.http.post(servicio, usuario);
  }
  
  setLocalStorage(data: string): void {
    localStorage.setItem('token',data); // localStorage.setItem('token',data); //nombreUsuario
  }

 getNombreUsuario(): string{
    var valorVariable =  localStorage.getItem('nombreUsuario')?.toString();
    var valorString = typeof valorVariable === 'string'?valorVariable:'';
    return valorString;
  }  

  getTokenDecoded(): any {
    const helper = new JwtHelperService();
    var token = localStorage.getItem('token')?.toString();
    const decodedToken = helper.decodeToken(  typeof token === 'string'?token:'' );
    return decodedToken;
  }

  removeLocalStorge(): void {
    debugger
    console.log("entro a remover token");
    localStorage.removeItem('token');//nombreUsuario  token
  }

  getToken(): string {
    var token =  localStorage.getItem('token')?.toString(); 
    var valorString = typeof token === 'string'?token:'';
    return valorString;
  }

}

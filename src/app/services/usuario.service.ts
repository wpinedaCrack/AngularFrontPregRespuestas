import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/Usuario';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { ChangePassword } from '../models/ChangePassword';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  myAppUrl: string='';
  myApiUrl: string='';

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;//https://localhost:17994';
    this.myApiUrl = '/api/Usuario';
   }

  saveUser(usuario: Usuario): Observable<any>{
    debugger
    // var body =JSON.stringify( usuario );
    var servicio = this.myAppUrl + this.myApiUrl;
    // //return this.http.post<any>(servicio, usuario );//servicio json nuevo
     return this.http.post(servicio, usuario);
  }

  changePassword(changePassword: ChangePassword): Observable<any>{
    var servicio = this.myAppUrl + this.myApiUrl+ '/CambiarPassowrd';
    return this.http.put(servicio, changePassword);
  }

}

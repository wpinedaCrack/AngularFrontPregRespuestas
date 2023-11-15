import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cuestionario } from '../models/Cuestionario';
import { RespuestaCuestionario } from '../models/respuestaCuestionario';

@Injectable({
  providedIn: 'root'
})
export class RespuestaCuestionarioService {
  myAppUrl: string='';
  myApiUrl: string='';
  
  nombreParticiante: string='';
  servicio: string='';
  fecha: Date = new Date();
  idCuestionario: number=0;
  respuestas: number[] = [];
  cuestionario?: Cuestionario;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = '/api/RespuestaCuestionario/';
    this.servicio = this.myAppUrl + this.myApiUrl;
  }
  guardarRespuestaCuestionario(respuestaCuestionario: RespuestaCuestionario): Observable<any> {
    return this.http.post(this.servicio, respuestaCuestionario)
  }

  getListCuestionarioRespuesta(idCuestionario: number): Observable<any> {
    return this.http.get(this.servicio + idCuestionario);
  }
  eliminarRespuestaCuestionario(idRespuestaCuestionario: number): Observable<any> {
    return this.http.delete(this.servicio + idRespuestaCuestionario);
  }
  getCuestionarioByIdRespuesta(idRespuesta: number): Observable<any> {
    return this.http.get(this.servicio + 'GetCuestionarioByIdRespuesta/' + idRespuesta);
  }

}

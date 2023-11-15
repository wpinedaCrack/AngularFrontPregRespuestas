import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RespuestaCuestionarioService } from 'src/app/services/respuesta-cuestionario.service';
import { CuestionarioService } from 'src/app/services/cuestionario.service';
import { Pregunta } from 'src/app/models/pregunta';
import { RespuestaCuestionarioDetalle } from 'src/app/models/RespuestaCuestionarioDetalle';
import { RespuestaCuestionario } from 'src/app/models/respuestaCuestionario';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.component.html',
  styleUrls: ['./pregunta.component.css']
})
export class PreguntaComponent implements OnInit {
  idCuestionario: number=0;
  listPreguntas: Pregunta[] = [];
  loading = false;
  rtaConfirmada = false; // Cuando el usuario seleccionar una Rta
  opcionSeleccionada: any;
  index = 0;
  idRespuestaSeleccionada: number=0;

  listRespuestaDetalle: RespuestaCuestionarioDetalle[] = [];

  constructor(private respuestaCuestionarioService: RespuestaCuestionarioService,
              private cuestionarioService: CuestionarioService,
              private router: Router){  }

  ngOnInit(): void {
    this.idCuestionario = this.respuestaCuestionarioService.idCuestionario;

    if (this.idCuestionario == null || this.idCuestionario==0){
      this.router.navigate(['/inicio']);
      return;
    }
    console.log("idCuestionario = "+this.idCuestionario);
    this.getCuestionario();
    this.respuestaCuestionarioService.respuestas = [];  // Se setean las respuestas como vacio
  }

  getCuestionario(): void{
    console.log("Obtener Cuestionario Pregunta Componentes");
    this.loading = true;
    this.cuestionarioService.getCuestionario(this.idCuestionario).subscribe(data=>{   
      console.log(data);
      this.listPreguntas = data.listPreguntas;
      this.loading = false;  
      this.respuestaCuestionarioService.cuestionario = data;
    });
  }

  obtenerPregunta(): string{
    return this.listPreguntas[this.index]?.descripcion??"";
  }

  getIndex(): number{
    return this.index;
  }

  respuestaSeleccionada(respuesta: any, idRespuesta: number): void{
    this.opcionSeleccionada = respuesta;
    this.rtaConfirmada = true;
    this.idRespuestaSeleccionada = idRespuesta;
  }

  AddClassOption(respuesta: any): string {
    if (respuesta === this.opcionSeleccionada){
      return 'active text-light';//Agrega el stilo a la respuesta seleccioanda
    }
    else{
      return '';
    }  
  }

  siguiente(): void {
    this.respuestaCuestionarioService.respuestas.push(this.idRespuestaSeleccionada);

     // Creamos un objeto RespuestaDetalle 
     const detalleRespuesta: RespuestaCuestionarioDetalle = {
      respuestaId: this.idRespuestaSeleccionada
    };

    // Agregamos objeto al array
    this.listRespuestaDetalle.push(detalleRespuesta);   

  
    if (this.index === this.listPreguntas.length-1) {
      //this.router.navigate(['/inicio/respuestaCuestionario']);
      console.log("LLe3gamos al final "+this.index+" longitud "+this.listPreguntas.length);
      this.guardarRespuestaCuestionario();
   
    }

    //Imprime array de respuestas

    console.log( this.respuestaCuestionarioService.respuestas );
    this.rtaConfirmada = false;
    this.index++;
    console.log(this.index);
    this.idRespuestaSeleccionada = 0;

   
  }

  
  guardarRespuestaCuestionario(): void {
    const rtaCuestionario: RespuestaCuestionario = {
      id:0,
      cuestionarioId: this.respuestaCuestionarioService.idCuestionario,
      nombreParticipante: this.respuestaCuestionarioService.nombreParticiante,
      listRtaCuestionarioDetalle: this.listRespuestaDetalle,
      fecha: new Date()
    };

    this.loading = true;
    this.respuestaCuestionarioService.guardarRespuestaCuestionario(rtaCuestionario).subscribe(data => {
      this.loading = false;
      this.router.navigate(['/inicio/respuestaCuestionario']);
    }, error => {
      this.loading = false;
      console.log(error);
    });
  }

}


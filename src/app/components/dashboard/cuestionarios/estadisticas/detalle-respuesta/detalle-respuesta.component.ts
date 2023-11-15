import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cuestionario } from 'src/app/models/Cuestionario';
import { RespuestaCuestionarioDetalle } from 'src/app/models/RespuestaCuestionarioDetalle';
import { RespuestaCuestionarioService } from 'src/app/services/respuesta-cuestionario.service';

@Component({
  selector: 'app-detalle-respuesta',
  templateUrl: './detalle-respuesta.component.html',
  styleUrls: ['./detalle-respuesta.component.css']
})
export class DetalleRespuestaComponent {
  idRespuesta: number=0;
  loading = false;
  cuestionario?: Cuestionario;
  respuestas: RespuestaCuestionarioDetalle[] = [];


  constructor( private aRoute: ActivatedRoute,
               private respuestaCuestionarioService: RespuestaCuestionarioService) { 
                  // this.idRespuesta = +this.aRoute.snapshot.paramMap.get('id');
          this.idRespuesta = + Number.parseInt( this.aRoute.snapshot.paramMap.get('id')??"0" );     
  }

  ngOnInit(): void {
    this.getListRespuestasYCuestionario();
  }

  getListRespuestasYCuestionario(): void{
  this.loading = true;
  this.respuestaCuestionarioService.getCuestionarioByIdRespuesta(this.idRespuesta).subscribe(data =>{
   this.cuestionario = data.cuestionario;
   this.respuestas = data.respuestas;
   this.loading = false;
   console.log(data);
  });
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RespuestaCuestionarioService } from 'src/app/services/respuesta-cuestionario.service';
import { RespuestaCuestionario } from 'src/app/models/respuestaCuestionario';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {
  idCuestionario: number=0;
  loading = false;
  listRespuestaCuestionario: RespuestaCuestionario[] = [];

  constructor(private aRoute: ActivatedRoute,
              private respuestaCuestionarioService: RespuestaCuestionarioService,
              private toastr: ToastrService ) {
                //this.idCuestionario = +this.aRoute.snapshot.paramMap.get('id');
                this.idCuestionario = + Number.parseInt( this.aRoute.snapshot.paramMap.get('id')??"0" ); 
   }

  ngOnInit(): void {
    this.getListCuestionarioService();
  }


  getListCuestionarioService(): void {
    this.loading = true;
    this.respuestaCuestionarioService.getListCuestionarioRespuesta(this.idCuestionario).subscribe(data =>{
      this.loading = false;
      this.listRespuestaCuestionario = data;
      debugger
      console.log(data);
    });
  }
  
  eliminarRespuestaCuestionario(idRtaCuestionario: number): void {
    this.loading = true;
    this.respuestaCuestionarioService.eliminarRespuestaCuestionario(idRtaCuestionario).subscribe(data => {
      this.loading = false;
      this.toastr.error('La respuesta al cuestionario fue eliminada con exito!', 'Resgistro eliminado');
      this.getListCuestionarioService();
    }, error => {
      this.loading = false;
    });
  }

}
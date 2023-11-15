import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { ToastrService } from 'ngx-toastr';
import { CuestionarioService } from 'src/app/services/cuestionario.service';
import { Cuestionario } from 'src/app/models/Cuestionario';

@Component({
  selector: 'app-cuestionarios',
  templateUrl: './cuestionarios.component.html',
  styleUrls: ['./cuestionarios.component.css']
})
export class CuestionariosComponent implements OnInit {
  nombreUsuario: string='';
  listCuestionarios: Cuestionario[] = [];
  loading = false;

  constructor(private loginService: LoginService,
              private cuestionarioService: CuestionarioService,
              private toastr: ToastrService) { }

  ngOnInit(): void {  ///   Cuando se inicializa
    this.getNombreUsuario();
    this.getCuestionarios();
  }

  getNombreUsuario(): void{
    console.log(this.loginService.getNombreUsuario());
    this.nombreUsuario = this.loginService.getTokenDecoded().sub;  //getTokenDecoded().sub;//getNombreUsuario();
  }

  getCuestionarios(): void {
    this.loading = true;
    this.cuestionarioService.getListCuestionarioByUser().subscribe(data => {
      console.log(data);
      this.listCuestionarios = data;
      this.loading = false;
    }, error => {
      console.log(error);
      this.loading = false;
      this.toastr.error('Opss.. ocurrio un error', 'Error');
    });
  }

  eliminarCuestionario(idCuestionario: number): void {
    debugger;
    if (confirm('Esta seguro que desea eliminar el cuestionario?')){
      this.loading = true;
      
      this.cuestionarioService.deleteCuestionario(idCuestionario).subscribe(data =>{
        this.loading = false;
        this.toastr.success('El cuestionario fue eliminado con exito!', 'Registro eliminado');
        this.getCuestionarios();
      }, error => {
        this.loading = false;
        this.toastr.error('Opss.. ocurrio un error', 'Error');
      });
     }
  }


}

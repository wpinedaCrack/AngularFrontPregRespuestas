import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cuestionario } from 'src/app/models/Cuestionario';
import { Pregunta } from 'src/app/models/pregunta';
import { CuestionarioService } from 'src/app/services/cuestionario.service';

@Component({
  selector: 'app-paso-dos',
  templateUrl: './paso-dos.component.html',
  styleUrls: ['./paso-dos.component.css']
})
export class PasoDosComponent implements OnInit {
  tituloCuestionario: string='';
  descripcionCuestionario: string='';
  listPreguntas: Pregunta[] = []; //almacena todas las preguntas
  loading = false;

  constructor(private cuestionarioService: CuestionarioService,
              private toastr: ToastrService,
              private router: Router) { }

  ngOnInit(): void {
    this.tituloCuestionario = this.cuestionarioService.tituloCuestionario;
    this.descripcionCuestionario = this.cuestionarioService.descripcionCuestionario;
  }

  guardarPregunta(pregunta: Pregunta): void {
    this.listPreguntas.push(pregunta);
    debugger;
    console.log(this.listPreguntas);
  }

  eliminarPregunta(index: number): void{
    this.listPreguntas.splice(index, 1);// En esta posición elimina un solo elemento
  }

  guardarCuestionario(): void {
    const cuestionario: Cuestionario = {
      nombre: this.tituloCuestionario,
      descripcion: this.descripcionCuestionario,
      listPreguntas: this.listPreguntas
    };
    this.loading = true;

    console.log(cuestionario);

    // Enviamos cuestionario al back
    this.cuestionarioService.guardarCuestionario(cuestionario).subscribe(data => {
      this.toastr.success('El cuestionario fue registrado con exito', 'Cuestionario Registrado');
      this.router.navigate(['/dashboard']);
      this.loading = false;
    }, error => {
      this.toastr.error('Opps.. Ocurrio un error!', 'Error');
      this.router.navigate(['/dashboard']);
      this.loading = false;
    });
  }

}
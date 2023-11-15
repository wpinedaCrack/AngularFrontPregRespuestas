import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CuestionarioService } from 'src/app/services/cuestionario.service';

@Component({
  selector: 'app-cuestionario',
  templateUrl: './cuestionario.component.html',
  styleUrls: ['./cuestionario.component.css']
})
export class CuestionarioComponent {
  idCuestionario: number;
  loading = false;
  cuestionario: any = {};

  constructor(private cuestionarioService: CuestionarioService,
              private aRoute: ActivatedRoute) {
  this.idCuestionario = + Number.parseInt( this.aRoute.snapshot.paramMap.get('id')??"0" );     
  }

  ngOnInit(): void {
    this.getCuestionario();
  }

  getCuestionario(): void {
    this.loading = true;
    this.cuestionarioService.getCuestionario(this.idCuestionario).subscribe(data => {
      this.loading = false;
      this.cuestionario = data;
      console.log(data);
    });
  }

}

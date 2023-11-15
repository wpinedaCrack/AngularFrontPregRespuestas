import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  nombreEjemplo = "Samuel Camilo."
  textoPlaceHolder = "Escribase algo aqui"
  deshabilitado = true
  imgSrc="https://dam.ngenespanol.com/wp-content/uploads/2019/05/Tyrannosaurus-rex-parientes.png"
  texto = "Esto es un texto de event Binding"
  textoWayDataBind =""
  mostrar=true

  listEstudiantes:any[]=[
    {nombre:'Samu', estado:'ok'},
    {nombre:'Cami', estado:'ok'},
    {nombre:'Chivan', estado:'mal'},
    {nombre:'Rocky', estado:'peor'},
    {nombre:'Nicolas', estado:'libre'}
  ]

  constructor(){
    setInterval(()=> this.deshabilitado=false,3000);
    setInterval(()=> this.nombreEjemplo="Camilito",3000);
  }

  getSuma(numero1: number, numero2: number){
     return numero1+numero2;
  }

  cambiartexto():void{
    this.texto = "En el proximo capitulo voy a estudiar two way data-binding"
  }

  toogle(): void{
    this.mostrar = !this.mostrar
  }

}

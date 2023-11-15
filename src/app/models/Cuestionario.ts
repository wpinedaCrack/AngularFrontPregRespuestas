import { Usuario } from './Usuario';
import { Pregunta } from './pregunta';

export class Cuestionario {
    id?: number;
    nombre: string;
    descripcion: string;
    fechaCreacion?: Date;
    listPreguntas: Pregunta[];
    usuario?: Usuario;

    constructor(nombre: string, descripcion: string, fechaCreacion: Date, listPreguntas: Pregunta[],usuario: Usuario){
        this.id=0;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.fechaCreacion = fechaCreacion;
        this.listPreguntas = listPreguntas;
        this.usuario = usuario;
    }
}
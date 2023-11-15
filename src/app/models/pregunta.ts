import { Respuesta } from './respuesta';

export class Pregunta{
    descripcion: string;
    listRespuestas: Respuesta[];
    hide?: boolean;

    constructor(descripcion: string, respuestas: Respuesta[]){
        this.descripcion = descripcion;
        this.listRespuestas = respuestas;
        this.hide = true;
    }
}
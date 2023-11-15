import { RespuestaCuestionarioDetalle } from './RespuestaCuestionarioDetalle';

export class RespuestaCuestionario {
    id: number=0;
    cuestionarioId: number=0;
    nombreParticipante:  string="";
    fecha: Date = new Date();
    listRtaCuestionarioDetalle?: RespuestaCuestionarioDetalle[];
}

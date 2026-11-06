import type { PrioridadId } from "./prioridades";

export interface tarea {
    id: number,
    titulo: string,
    completada: boolean,
    prioridad: PrioridadId,
    fechaVencimiento: string | null,
    inTrush: boolean
}
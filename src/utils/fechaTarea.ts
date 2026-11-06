import type { tarea } from "../types/tarea";

export function estaTareaVencida(tarea: tarea): boolean {

    // Si no tiene fecha, está completada o está en papelera
    if (
        tarea.fechaVencimiento === null ||
        tarea.completada ||
        tarea.inTrush
    ) {
        return false;
    }

    // Obtenemos la fecha actual
    const fechaActual = new Date();

    const anio = fechaActual.getFullYear();
    const mes = String(fechaActual.getMonth() + 1).padStart(2, "0");
    const dia = String(fechaActual.getDate()).padStart(2, "0");

    const fechaHoy = `${anio}-${mes}-${dia}`;

    // Comparamos las fechas
    return tarea.fechaVencimiento < fechaHoy;
}
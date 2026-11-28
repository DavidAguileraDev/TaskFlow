import { useState } from "react";
import type { tarea } from "../types/tarea";
import type { PrioridadId } from "../types/prioridades";

export const LONGITUD_MAXIMA_TITULO = 128;

export function useFormularioTarea({
    tareasDisponibles,
    prioridad,
    handleClickAniadirFn }:
    {
        tareasDisponibles: tarea[],
        prioridad: PrioridadId,
        handleClickAniadirFn: (titulo: string, prioridad: PrioridadId, fechaVencimiento: string | null) => void,
    }) {

    // States
    const [textoConfirm, setTextoConfirm] = useState("");
    const [titulo, setTitulo] = useState("");
    const [fechaVencimiento, setFechaVencimiento] = useState("");


    // Validate the new task and create it only when its title is accepted.
    const handleClickValidarYCrearTarea = ( async () => {

        const tituloRecortado = titulo.trim();

        // Check for repeated titles among all available tasks, excluding tasks in the trash.
        // The comparison is case-sensitive, so titles with different casing are not duplicates.
        const repetido = tareasDisponibles.filter((tarea) => {

            if (tarea.titulo === tituloRecortado) {
                return true
            }

            return false;

        })

        const longitudValida = tituloRecortado.length <= LONGITUD_MAXIMA_TITULO;

        // Create the task only when the trimmed title is valid and has no duplicate among available tasks.

        if (tituloRecortado.length > 0 && longitudValida && repetido.length == 0) {

            handleClickAniadirFn(tituloRecortado, prioridad, fechaVencimiento);
            setTextoConfirm("Tarea creada");
            setTitulo("");



        // Titles longer than the database limit show a specific message.

        } else if (!longitudValida) {

            setTextoConfirm("El título es demasiado largo");

        // A duplicate among available tasks shows a message instead of throwing an error.

        } else if (repetido.length > 0) {

            setTextoConfirm("Hay otra tarea con el mismo nombre");

        // An empty title also prevents creation and shows a message.
        } else {

            setTextoConfirm("No se ha podido crear la tarea");

        }



    })

    // HandleOnChange for change the title of the task
    const handleOnChangeTitulo = ((e: React.ChangeEvent<HTMLInputElement>) => {

        setTitulo(e.target.value)

    })

    // HandleOnChange for change the date of the task
    const handleOnChangeFecha = ((e: React.ChangeEvent<HTMLInputElement>) => {

        setFechaVencimiento(e.target.value)

    })




    // The return of the variables and functions

    return { textoConfirm, titulo, fechaVencimiento, handleClickValidarYCrearTarea, handleOnChangeTitulo, handleOnChangeFecha }

}
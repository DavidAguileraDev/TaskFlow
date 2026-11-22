import { useState } from "react";
import type { tarea } from "../types/tarea";
import type { PrioridadId } from "../types/prioridades";

export function useFormularioTarea({
    tareasFiltradas,
    prioridad,
    handleClickAniadirFn }:
    {
        tareasFiltradas: tarea[],
        prioridad: PrioridadId,
        handleClickAniadirFn: (titulo: string, prioridad: PrioridadId, fechaVencimiento: string | null) => void,
    }) {

    // States
    const [textoConfirm, setTextoConfirm] = useState("");
    const [titulo, setTitulo] = useState("");
    const [fechaVencimiento, setFechaVencimiento] = useState("");


    // HandleClick for create the task
    const handleClickChangeTitulo = (() => {

        const repetido = tareasFiltradas.filter((tarea) => {

            if (tarea.titulo === titulo.trim()) {
                return true
            }

            return false;

        })

        if (titulo.trim().length > 0 && repetido.length == 0) {

            handleClickAniadirFn(titulo.trim(), prioridad, fechaVencimiento);
            setTextoConfirm("Tarea creada");
            setTitulo("");



        } else if (repetido.length > 0) {

            setTextoConfirm("Hay otra tarea con el mismo nombre");

        } else {

            setTextoConfirm("No se ha podido crear la tarea");

        }



    })

    // HandleOnChange for change the date of the task
    const handleOnChangeFecha = ((e: React.ChangeEvent<HTMLInputElement>) => {

        setFechaVencimiento(e.target.value)

    })

    // HandleOnChange for change the title of the task
    const handleOnChangeTitulo = ((e: React.ChangeEvent<HTMLInputElement>) => {


        setTitulo(e.target.value)


    })



    // The return of the variables

    return { textoConfirm, titulo, fechaVencimiento, handleClickChangeTitulo, handleOnChangeTitulo, handleOnChangeFecha }

}
import { useState } from "react";
import type { tarea } from "../types/tarea";
import type { PrioridadId } from "../types/prioridades";

export function useFormularioTarea({
    handleClickAniadirFn,
    tareasFiltradas,
    prioridad }:
    {
        handleClickAniadirFn: (titulo: string, prioridad: PrioridadId, fechaVencimiento: string | null) => void,
        tareasFiltradas: tarea[],
        prioridad: PrioridadId
    }) {


    const [textoConfirm, setTextoConfirm] = useState("");
    const [nombre, setNombre] = useState("");
    const [fechaVencimiento, setFechaVencimiento] = useState("");



    const handleClickNombre = (() => {

        const repetido = tareasFiltradas.filter((tarea) => {

            if (tarea.titulo === nombre.trim()) {
                return true
            }

            return false;

        })

        if (nombre.trim().length > 0 && repetido.length == 0) {

            handleClickAniadirFn(nombre.trim(), prioridad, fechaVencimiento);
            setTextoConfirm("Tarea creada");
            setNombre("");



        } else if (repetido.length > 0) {

            setTextoConfirm("Hay otra tarea con el mismo nombre");

        } else {

            setTextoConfirm("No se ha podido crear la tarea");

        }



    })

    const handleOnChangeFecha = ((e: React.ChangeEvent<HTMLInputElement>) => {

        setFechaVencimiento(e.target.value)

    })

    const handleOnChangeNombre = ((e: React.ChangeEvent<HTMLInputElement>) => {


        setNombre(e.target.value)


    })




    return { textoConfirm, nombre, fechaVencimiento, handleClickNombre, handleOnChangeNombre, handleOnChangeFecha }

}
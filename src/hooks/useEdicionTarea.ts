import { useEffect, useState } from "react";
import type { tarea } from "../types/tarea";



export function useEdicionTarea({ tarea, numeroFiltro, listTareasDisponibles, handleClickAlternarTareaEnPapelera, handleClickEliminarfn, modificarTareaCompletada, modificarTituloTarea }:
    {
        tarea: tarea
        numeroFiltro: number,
        listTareasDisponibles: tarea[],
        handleClickAlternarTareaEnPapelera: (id: number) => void,
        handleClickEliminarfn: (id: number) => void,
        modificarTituloTarea: (id: number, nuevoTitulo: string) => void,
        modificarTareaCompletada: (id: number, completada: boolean) => void
    }) {

    const id = tarea.id;
    const titulo = tarea.titulo;
    const completada = tarea.completada;
    const inTrush = tarea.inTrush;

    const [editando, setEditando] = useState(false);
    const [nuevoTitulo, setNuevoTitulo] = useState(titulo);
    const [mensaje, setMensaje] = useState("");


    useEffect(() => {
        handleClickCancelar();
    }, [numeroFiltro])

    const texto = completada ? "⟲" : "✔";

    const nombreClassName = completada ? "tarea-completada" : "";

    const botonCompletarClassName = completada
        ? 'boton-tarea is-completada'
        : 'boton-tarea'

    let mensajeClassName = mensaje === "¡Titulo cambiado con éxito!" ? "mensaje-positivo" : "mensaje-negativo";

    const handleOnChangeNuevoTitulo = ((e: React.ChangeEvent<HTMLInputElement>) => {

        setNuevoTitulo(e.target.value)

    })

    const handleClickCompletar = (() => {


        modificarTareaCompletada(id, !completada)

    })

    const handleClickEliminarOPapelera = (() => {
        if (inTrush) {
            handleClickEliminarfn(id)
        } else {
            handleClickAlternarTareaEnPapelera(id)
        }
    })



    const handleClickRestaurar = (() => {

        console.log(listTareasDisponibles);

        const existeTarea = listTareasDisponibles.some(tarea => tarea.titulo === titulo);

        if (!existeTarea) {

            handleClickAlternarTareaEnPapelera(id);

        } else {
            setMensaje("No puedes restaurar una tareas cuyo nombre esta activo")
        }

    })

    const handleClickEditar = (() => {

        setEditando(!editando);

    })

    const handleClickGuardar = (() => {
        if (nuevoTitulo === titulo) {
            handleClickCancelar()
        } else if (nuevoTitulo.trim().length > 0) {
            modificarTituloTarea(id, nuevoTitulo)
            setMensaje("¡Titulo cambiado con éxito!")
        } else {
            setMensaje("No se puede introducir un titulo vacío")
        }
    })

    const handleClickCancelar = (() => {
        setEditando(false)
        setNuevoTitulo(titulo)
        setMensaje("");
    })



    return {
        editando,
        nuevoTitulo,
        mensaje,
        texto,
        nombreClassName,
        botonCompletarClassName,
        mensajeClassName,
        handleOnChangeNuevoTitulo,
        handleClickCompletar,
        handleClickEliminarOPapelera,
        handleClickRestaurar,
        handleClickEditar,
        handleClickGuardar,
        handleClickCancelar
    }

}
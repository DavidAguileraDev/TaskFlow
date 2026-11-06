import { useEffect, useState } from "react";
import type { tarea } from "../types/tarea";
import { usePrioridad } from "./usePrioridad";
import type { PrioridadId } from "../types/prioridades";



export function useEdicionTarea({ tarea, numeroFiltro, listTareasDisponibles, handleClickAlternarTareaEnPapelera, handleClickEliminarfn, modificarTarea, modificarTareaCompletada }:
    {
        tarea: tarea
        numeroFiltro: number,
        listTareasDisponibles: tarea[],
        handleClickAlternarTareaEnPapelera: (id: number) => void,
        handleClickEliminarfn: (id: number) => void,
        modificarTarea: (id: number, nuevoTitulo: string, nuevaPrioridad: PrioridadId, nuevaFechaVencimiento: string | null) => void,
        modificarTareaCompletada: (id: number, completada: boolean) => void
    }) {

    const id = tarea.id;
    const titulo = tarea.titulo;
    const completada = tarea.completada;
    const prioridad_actual = tarea.prioridad
    const fechaVencimiento = tarea.fechaVencimiento
    const inTrush = tarea.inTrush;


    const { prioridad, nombrePrioridad, handleClickSetPrioridad } = usePrioridad(prioridad_actual);

    const [editando, setEditando] = useState(false);
    const [nuevoTitulo, setNuevoTitulo] = useState(titulo);
    const [nuevaPrioridad, setnuevaPrioridad] = useState(prioridad);
    const [nuevaFechaVencimiento, setnuevaFechaVencimiento] = useState(fechaVencimiento ?? "");
    const [mensaje, setMensaje] = useState("");


    useEffect(() => {

        setnuevaPrioridad(prioridad)

    }, [prioridad])


    useEffect(() => {
        handleClickCancelar();
    }, [numeroFiltro])

    const texto = completada ? "⟲" : "✔";

    const nombreClassName = completada ? "tarea-completada" : "";

    const botonCompletarClassName = completada
        ? 'boton-tarea is-completada'
        : 'boton-tarea'

    const mensajeClassName = mensaje.includes("éxito")
        ? "mensaje-positivo"
        : "mensaje-negativo";

    const handleOnChangeNuevoTitulo = ((e: React.ChangeEvent<HTMLInputElement>) => {

        setNuevoTitulo(e.target.value)

    })

    const handleOnChangeNuevaFechaVencimiento = ((e: React.ChangeEvent<HTMLInputElement>) => {

        setnuevaFechaVencimiento(e.target.value)

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
        
        const tituloLimpio = nuevoTitulo.trim();

        const tituloModificado = tituloLimpio !== titulo;
        const prioridadModificada = prioridad_actual !== nuevaPrioridad;
        const fechaModificicada = fechaVencimiento !== nuevaFechaVencimiento;

        // No se ha modificado nada
        if (!tituloModificado && !prioridadModificada && !fechaModificicada) {
            handleClickCancelar();
            return;
        }

        // El título está vacío
        if (nuevoTitulo.trim().length === 0) {
            setMensaje("No se puede introducir un título vacío");
            return;
        }

        // Guardamos los cambios
        modificarTarea(id, nuevoTitulo.trim(), nuevaPrioridad, nuevaFechaVencimiento);

        // Mensaje según los cambios realizados
        if (tituloModificado && prioridadModificada && fechaModificicada) {
            setMensaje("¡Tarea modificada con éxito!");
        } else if (fechaModificicada) {
            setMensaje("Fecha cambiada con éxito!");
        } else if (tituloModificado) {
            setMensaje("¡Título cambiado con éxito!");
        } else {
            setMensaje("¡Prioridad cambiada con éxito!");
        }
    });

    const handleClickCancelar = (() => {
        setEditando(false)
        setNuevoTitulo(titulo)
        setMensaje("");
        setnuevaPrioridad(prioridad_actual);
        setnuevaFechaVencimiento(fechaVencimiento ?? "");
    })



    return {
        editando,
        nuevoTitulo,
        nuevaPrioridad,
        nuevaFechaVencimiento,
        mensaje,
        texto,
        nombreClassName,
        botonCompletarClassName,
        mensajeClassName,
        handleOnChangeNuevoTitulo,
        handleOnChangeNuevaFechaVencimiento,
        handleClickCompletar,
        handleClickEliminarOPapelera,
        handleClickRestaurar,
        handleClickEditar,
        handleClickGuardar,
        handleClickCancelar,
        prioridad,
        nombrePrioridad,
        handleClickSetPrioridad
    }

}
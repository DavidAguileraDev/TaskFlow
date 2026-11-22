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

    // We take the atr of the task object
    const id = tarea.id;
    const titulo = tarea.titulo;
    const completada = tarea.completada;
    const prioridad_actual = tarea.prioridad
    const fechaVencimiento = tarea.fechaVencimiento
    const inTrash = tarea.inTrash;

    // Custom hook
    const { prioridad, nombrePrioridadPorNumero, handleClickSetPrioridad } = usePrioridad(prioridad_actual);

    // States
    const [editando, setEditando] = useState(false);
    const [nuevoTitulo, setNuevoTitulo] = useState(titulo);
    const [nuevaPrioridad, setnuevaPrioridad] = useState(prioridad);
    const [nuevaFechaVencimiento, setnuevaFechaVencimiento] = useState(fechaVencimiento ?? "");
    const [mensaje, setMensaje] = useState("");


    // When priority change, set a new Priority
    useEffect(() => {

        setnuevaPrioridad(prioridad)

    }, [prioridad])


    // When we selected another filter option in aside bar, we close the edit menu
    useEffect(() => {
        
        handleClickCancelar();

    }, [numeroFiltro])

    // What we will show according to context of user 

    const texto = completada ? "⟲" : "✔";

    const nombreClassName = completada ? "tarea-completada" : "";

    const botonCompletarClassName = completada
        ? 'boton-tarea is-completada'
        : 'boton-tarea'

    const mensajeClassName = mensaje.includes("éxito")
        ? "mensaje-positivo"
        : "mensaje-negativo";


    // HandleOnChage for a new title
    const handleOnChangeNuevoTitulo = ((e: React.ChangeEvent<HTMLInputElement>) => {

        setNuevoTitulo(e.target.value)

    })

    // HandleOnChage for a new expiration date
    const handleOnChangeNuevaFechaVencimiento = ((e: React.ChangeEvent<HTMLInputElement>) => {

        setnuevaFechaVencimiento(e.target.value)

    })

    // HandleOnChage for change complete useState
    const handleClickCompletar = (() => {


        modificarTareaCompletada(id, !completada)

    })

    // Depending on whether the task is in the trash: 
    // 1.- If it's not in the trash, it sends it to the trash
    // 2.- If it's already in the trash, it deletes it permanently.
    const handleClickEliminarOPapelera = (() => {
        if (inTrash) {
            handleClickEliminarfn(id)
        } else {
            handleClickAlternarTareaEnPapelera(id)
        }
    })


    // If the task is in trash, we retore the task
    const handleClickRestaurar = (() => {


        const existeTarea = listTareasDisponibles.some(tarea => tarea.titulo === titulo);

        if (!existeTarea) {

            handleClickAlternarTareaEnPapelera(id);

        } else {
            setMensaje("No puedes restaurar una tareas cuyo nombre esta activo")
        }

    })


    // Open or close the task editing menu
    const handleClickEditar = (() => {

        setEditando(!editando);

    })

    // HandleClick for save the task according to the conditions
    const handleClickGuardar = (() => {
        
        // Constants
        const tituloLimpio = nuevoTitulo.trim();
        const tituloModificado = tituloLimpio !== titulo;
        const prioridadModificada = prioridad_actual !== nuevaPrioridad;
        const fechaModificicada = fechaVencimiento !== nuevaFechaVencimiento;

        // Nothing has been modified
        if (!tituloModificado && !prioridadModificada && !fechaModificicada) {
            handleClickCancelar();
            return;
        }

        // The tittle is empty
        if (nuevoTitulo.trim().length === 0) {
            setMensaje("No se puede introducir un título vacío");
            return;
        }

        // Save the changes
        modificarTarea(id, nuevoTitulo.trim(), nuevaPrioridad, nuevaFechaVencimiento);

        // Message according to changes that has been realized
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

    // HandleClick for close the editing menu and restart the default values
    const handleClickCancelar = (() => {
        setEditando(false)
        setNuevoTitulo(titulo)
        setMensaje("");
        setnuevaPrioridad(prioridad_actual);
        setnuevaFechaVencimiento(fechaVencimiento ?? "");
    })


    // Returns variables and functions

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
        nombrePrioridadPorNumero,
        handleOnChangeNuevoTitulo,
        handleOnChangeNuevaFechaVencimiento,
        handleClickCompletar,
        handleClickEliminarOPapelera,
        handleClickRestaurar,
        handleClickEditar,
        handleClickGuardar,
        handleClickCancelar,
        handleClickSetPrioridad
    }

}
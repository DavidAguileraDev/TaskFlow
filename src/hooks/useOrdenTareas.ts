import { useState } from "react";
import type { tarea } from "../types/tarea";

export function useOrdenTareas({ listTareasBuscadasPorTitulo }: { listTareasBuscadasPorTitulo:() => tarea[] }) {

    // State
    const [orden, setOrden] = useState("Predeterminado");


    // HandleClick for set the order in which the tasks will be displayed
    const handleClickOrden = ((modoOrden: string) => {

        setOrden(modoOrden);

    })

    
    const tareasOrdenadas = [...listTareasBuscadasPorTitulo()].sort((a, b) => {


        switch (orden) {
            case "az":
                return a.titulo.localeCompare(b.titulo);

            case "za":
                return b.titulo.localeCompare(a.titulo);

            case "prioridad_asc":
                return a.prioridad - b.prioridad;

            case "prioridad_desc":
                return b.prioridad - a.prioridad;

            case "fecha_asc":

                if (a.fechaVencimiento === null) return 1;
                if (b.fechaVencimiento === null) return -1;

                return new Date(a.fechaVencimiento).getTime() - new Date(b.fechaVencimiento).getTime()

            case "fecha_desc":

                if (a.fechaVencimiento === null) return 1;
                if (b.fechaVencimiento === null) return -1;

                return new Date(b.fechaVencimiento).getTime() - new Date(a.fechaVencimiento).getTime()

            default:
                return a.id - b.id;
        }
    })


    // The return of the variables and functions


    return { tareasOrdenadas,handleClickOrden }

}
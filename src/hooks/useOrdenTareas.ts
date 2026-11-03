import { useState } from "react";
import type { tarea } from "../types/tarea";

export function useOrdenTareas({tareasFiltradas}:{tareasFiltradas:tarea[]}) {
    const [orden, setOrden] = useState("Predeterminado");


    const handleClickOrden = ((modoOrden: string) => {
        
        setOrden(modoOrden);

    })

    const tareasOrdenadas = [...tareasFiltradas].sort((a, b) => {

            switch (orden) {
                case "az":
                    return a.titulo.localeCompare(b.titulo);

                case "za":
                    return b.titulo.localeCompare(a.titulo);

                default:
                    return a.id - b.id;
            }
        })

    return {handleClickOrden,tareasOrdenadas}

}
import { useState } from "react";
import { prioridades, type PrioridadId } from "../types/prioridades";

export function usePrioridad(prioridadInicial: PrioridadId): {
    prioridad: PrioridadId,
    nombrePrioridad: (prioridad_especifica: PrioridadId) => string,
    handleClickSetPrioridad: (num_propiedad: PrioridadId) => void
} {

    const [prioridad, setPrioridad] = useState<PrioridadId>(prioridadInicial);

    const nombrePrioridad = ((prioridad_especifica: PrioridadId) => {
        return prioridades.find(
            prioridad_obj => prioridad_obj.id === prioridad_especifica
        )?.nombre ?? ""
    });

    const handleClickSetPrioridad = (num_propiedad: PrioridadId) => {
        setPrioridad(num_propiedad)
    }

    return { prioridad, nombrePrioridad, handleClickSetPrioridad };

}
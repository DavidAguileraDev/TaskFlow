import type { PrioridadId } from "../../types/prioridades";


export function SelectorPrioridadComponente({ prioridad, handleClickSetPrioridad }:
    {
        prioridad: PrioridadId,
        handleClickSetPrioridad: (num_propiedad: PrioridadId) => void
    }) {



    return (

        <div className="prioridad-selector">

            <button
                type="button"
                className={`prioridad-opcion baja ${prioridad === 1 ? "seleccionada" : ""}`}
                onClick={() => handleClickSetPrioridad(1)}
            >
                Baja
            </button>

            <button
                type="button"
                className={`prioridad-opcion media ${prioridad === 2 ? "seleccionada" : ""}`}
                onClick={() => handleClickSetPrioridad(2)}
            >
                Media
            </button>

            <button
                type="button"
                className={`prioridad-opcion alta ${prioridad === 3 ? "seleccionada" : ""}`}
                onClick={() => handleClickSetPrioridad(3)}
            >
                Alta
            </button>

        </div>
    )

}
import type { tarea } from "../../types/tarea.ts"
import type { PrioridadId } from "../../types/prioridades.ts";
import { usePrioridad } from "../../hooks/usePrioridad.ts";
import { useFormularioTarea } from "../../hooks/useFormularioTarea.ts";
import { SelectorPrioridadComponente } from "./SelectorPrioridadComponente.tsx";
import { InputBarraBusqueda } from "./InputBarraBusqueda.tsx";


export function FormularioTareaComponent({ handleClickAniadirFn, tareasFiltradas }:
    {
        handleClickAniadirFn:
        (titulo: string, prioridad: PrioridadId, fechaVencimiento: string | null) => void,
        tareasFiltradas: tarea[]
    }) {




    const { prioridad, handleClickSetPrioridad } = usePrioridad(2);

    const {
        textoConfirm,
        nombre,
        fechaVencimiento,
        handleClickNombre,
        handleOnChangeNombre,
        handleOnChangeFecha
    } = useFormularioTarea(
        {
            handleClickAniadirFn,
            tareasFiltradas,
            prioridad
        });




    return (



        <>

            <section className="tarea-input-contenedor">

                <div className="tarea-input-wrapper">

                    <button
                        type="button"
                        onClick={handleClickNombre}
                        className="tarea-icono-btn"
                    >
                        +
                    </button>

                    <InputBarraBusqueda
                        id="nombre-tarea"
                        name="nombre-tarea"
                        funcion={((e) => handleOnChangeNombre(e))}
                        value={nombre}
                        placeholder="Añadir tarea"
                    />

                    

                    <SelectorPrioridadComponente

                        prioridad={prioridad}
                        handleClickSetPrioridad={handleClickSetPrioridad}

                    />

                    <input
                        type="date"
                        value={fechaVencimiento}
                        onChange={(e) => handleOnChangeFecha(e)}
                    />

                </div>

                <p>{textoConfirm}</p>

            </section>

        </>

    );


}
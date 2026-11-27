
import { SelectorPrioridadComponente } from "./SelectorPrioridadComponente.tsx";
import { InputBarraBusqueda } from "./InputBarraBusqueda.tsx";
import type { tarea } from "../../types/tarea.ts";
import type { PrioridadId } from "../../types/prioridades.ts";
import { usePrioridad } from "../../hooks/usePrioridad.ts";
import { useFormularioTarea } from "../../hooks/useFormularioTarea.ts";


export function FormularioTareaComponent({ handleClickAniadirFn, tareasDisponibles }:
    {
        handleClickAniadirFn:
        (titulo: string, prioridad: PrioridadId, fechaVencimiento: string | null) => void,
        tareasDisponibles: tarea[]
    }) {




    const { prioridad, handleClickSetPrioridad } = usePrioridad(2);

    const {
        textoConfirm,
        titulo,
        fechaVencimiento,
        handleClickValidarYCrearTarea,
        handleOnChangeTitulo,
        handleOnChangeFecha
    } = useFormularioTarea(
        {
            handleClickAniadirFn,
            tareasDisponibles,
            prioridad
        });




    return (



        <>

            <section className="tarea-input-contenedor">

                <div className="tarea-input-wrapper">

                    <button
                        type="button"
                        onClick={handleClickValidarYCrearTarea}
                        className="tarea-icono-btn"
                    >
                        +
                    </button>

                    <InputBarraBusqueda
                        id="nombre-tarea"
                        name="nombre-tarea"
                        funcion={((e) => handleOnChangeTitulo(e))}
                        value={titulo}
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
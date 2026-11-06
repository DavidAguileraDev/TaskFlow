import type { tarea } from "../../types/tarea";
import { useEdicionTarea } from "../../hooks/useEdicionTareas";
import { SelectorPrioridadComponente } from "./SelectorPrioridadComponente";
import { type PrioridadId } from "../../types/prioridades";
import { estaTareaVencida } from "../../utils/fechaTarea";

export function TareaComponente({ tarea, numeroFiltro, listTareasDisponibles, handleClickAlternarTareaEnPapelera, handleClickEliminarfn, modificarTareaCompletada, modificarTarea }:
    {
        tarea: tarea
        numeroFiltro: number,
        listTareasDisponibles: tarea[],
        handleClickAlternarTareaEnPapelera: (id: number) => void,
        handleClickEliminarfn: (id: number) => void,
        modificarTarea: (id: number, nuevoTitulo: string, nuevaPrioridad: PrioridadId, nuevaFechaVencimiento: string | null) => void,
        modificarTareaCompletada: (id: number, completada: boolean) => void
    }) {


    const {
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
        nombrePrioridad,
        handleClickSetPrioridad
    } = useEdicionTarea({
        tarea,
        numeroFiltro,
        listTareasDisponibles,
        handleClickAlternarTareaEnPapelera,
        handleClickEliminarfn,
        modificarTareaCompletada,
        modificarTarea
    })



    const id = tarea.id;
    const titulo = tarea.titulo;
    const fechaVencimiento = tarea.fechaVencimiento
        ? new Date(tarea.fechaVencimiento + "T00:00:00").toLocaleDateString("es-ES")
        : null;
    const inTrush = tarea.inTrush;

    const tareaVencida = estaTareaVencida(tarea);

    return (
        <>

            <div className="tarea-contenedor">

                {/* CABECERA */}
                <div className="tarea-cabecera">

                    <div className="tarea-titulo-contenedor">
                        <h1 className="tarea-id">#{id}</h1>

                        <h2 className={nombreClassName}>
                            {titulo}
                        </h2>
                    </div>

                    {!inTrush && (
                        <button
                            className="boton-tarea boton-editar"
                            onClick={handleClickEditar}
                            title="Editar tarea"
                        >
                            ✎
                        </button>
                    )}

                </div>


                {/* INFORMACIÓN DE LA TAREA */}
                <div className="tarea-informacion">

                    <span className={`prioridad prioridad-${nombrePrioridad(tarea.prioridad)}`}>
                        {nombrePrioridad(tarea.prioridad).toUpperCase()}
                    </span>

                    {fechaVencimiento && (
                        <span className={`fecha-vencimiento ${tareaVencida ? "fecha-vencida" : ""}`}>
                            <span>◷</span>
                            {tareaVencida ? "Vencida: " : "Vence: "}
                            {fechaVencimiento}
                        </span>
                    )}

                    {inTrush && (
                        <span className="estado-papelera">
                            En papelera
                        </span>
                    )}

                </div>


                {/* ACCIONES */}
                <div className="tarea-acciones">

                    {!inTrush && (
                        <button
                            className={botonCompletarClassName}
                            onClick={handleClickCompletar}
                        >
                            {texto}
                        </button>
                    )}

                    {inTrush && (
                        <>
                            <p className={mensajeClassName}>{mensaje}</p>

                            <button
                                className="boton-tarea"
                                onClick={handleClickRestaurar}
                            >
                                Restaurar
                            </button>
                        </>
                    )}

                    <button
                        className="boton-tarea boton-eliminar"
                        onClick={handleClickEliminarOPapelera}
                    >
                        {inTrush ? "Eliminar definitivamente" : "Eliminar"}
                    </button>

                </div>


                {/* MENÚ DE EDICIÓN */}
                {editando && (
                    <div className="menu-editar-tarea">

                        <h3>Editar tarea</h3>

                        <div className="editar-campo">
                            <label>Título</label>

                            <input
                                type="text"
                                value={nuevoTitulo}
                                onChange={(e) => handleOnChangeNuevoTitulo(e)}
                            />
                        </div>

                        <div className="editar-campo">
                            <label>Prioridad</label>

                            <SelectorPrioridadComponente
                                prioridad={nuevaPrioridad}
                                handleClickSetPrioridad={handleClickSetPrioridad}
                            />
                        </div>

                        <div className="editar-campo">
                            <label>Fecha de vencimiento</label>

                            <input
                                type="date"
                                value={nuevaFechaVencimiento ?? ""}
                                onChange={(e) => handleOnChangeNuevaFechaVencimiento(e)}
                            />
                        </div>

                        <div className="editar-acciones">

                            <button onClick={handleClickCancelar}>
                                Cancelar
                            </button>

                            <button onClick={handleClickGuardar}>
                                Guardar cambios
                            </button>

                        </div>

                        {mensaje && (
                            <p className={mensajeClassName}>
                                {mensaje}
                            </p>
                        )}

                    </div>
                )}

            </div>
        </>
    );

}
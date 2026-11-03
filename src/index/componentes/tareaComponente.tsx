import type { tarea } from "../../types/tarea";
import { useEdicionTarea } from "../../hooks/useEdicionTarea";


export function TareaComponente({ tarea, numeroFiltro, listTareasDisponibles, handleClickAlternarTareaEnPapelera, handleClickEliminarfn, modificarTareaCompletada, modificarTituloTarea }:
    {
        tarea: tarea
        numeroFiltro: number,
        listTareasDisponibles: tarea[],
        handleClickAlternarTareaEnPapelera: (id: number) => void,
        handleClickEliminarfn: (id: number) => void,
        modificarTituloTarea: (id: number, nuevoTitulo: string) => void,
        modificarTareaCompletada: (id: number, completada: boolean) => void
    }) {


    const {
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
    } = useEdicionTarea({
        tarea,
        numeroFiltro,
        listTareasDisponibles,
        handleClickAlternarTareaEnPapelera,
        handleClickEliminarfn,
        modificarTareaCompletada,
        modificarTituloTarea
    })


    const id = tarea.id;
    const titulo = tarea.titulo;
    const inTrush = tarea.inTrush;


    return (
        <>

            <div className="tarea-contenedor">

                <h1>{id}</h1>
                <h1 className={nombreClassName} >{titulo} {inTrush ? "si" : "No"}</h1>

                {!inTrush && <button className="boton-tarea" onClick={handleClickEditar}>✎</button>}
                {!inTrush && <button className={botonCompletarClassName} onClick={handleClickCompletar}>{texto}</button>}
                {inTrush && <p className={mensajeClassName}>{mensaje}</p>}
                {inTrush && <button className="boton-tarea" onClick={handleClickRestaurar}>
                    Restaurar
                </button>}
                <button className="boton-tarea" onClick={handleClickEliminarOPapelera}>Eliminar</button>

                {editando && (
                    <div className="menu-editar-tarea">

                        <h3>Editar tarea</h3>

                        <input
                            type="text"
                            value={nuevoTitulo}
                            onChange={(e) =>
                                handleOnChangeNuevoTitulo(e)
                            }
                        />

                        <button onClick={handleClickGuardar}>
                            Guardar
                        </button>

                        <button onClick={handleClickCancelar}>
                            Cancelar
                        </button>


                        {mensaje && <p className={mensajeClassName}>{mensaje}</p>}

                    </div>
                )}


            </div>

        </>
    );

}
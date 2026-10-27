import { useState } from "react";


// B. Corregir la edición de tareas

// Si quieres cambiar solo una parte del título, tienes que escribirlo entero.
// Puedes guardar una tarea sin título.

/* 
Al abrir la edición, el campo debe contener el título actual.
No debes permitir guardar un título vacío.
Si pulsas «Cancelar», el título original debe mantenerse.
Si no has cambiado el texto, guardar no debería causar problemas.
*/

export function TareaComponente({ id, titulo, completada, inTrush, handleClickAlternarTareaEnPapelera, handleClickEliminarfn, modificarTareaCompletada, modificarTituloTarea }:
    {
        id: number,
        titulo: string,
        completada: boolean,
        inTrush: boolean,
        handleClickAlternarTareaEnPapelera: (id: number) => void,
        handleClickEliminarfn: (id: number) => void,
        modificarTituloTarea: (id: number, nuevoTitulo: string) => void,
        modificarTareaCompletada: (id: number, completada: boolean) => void
    }) {

    const [editando, setEditando] = useState(false);
    const [nuevoTitulo, setNuevoTitulo] = useState(titulo);
    const [mensaje, setMensaje] = useState("");

    const texto = completada ? "⟲" : "✔";

    const nombreClassName = completada ? "tarea-completada" : "";

    const botonCompletarClassName = completada
        ? 'boton-tarea is-completada'
        : 'boton-tarea'

    let mensajeClassName = mensaje === "¡Titulo cambiado con éxito!" ? "mensaje-positivo" : "mensaje-negativo";




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

        handleClickAlternarTareaEnPapelera(id);

    })

    const handleClickEditar = (() => {

        setEditando(!editando);

    })

    const handleClickGuardar = (() => {
        if (nuevoTitulo === titulo) {
            handleClickCancelar()
        } else if (nuevoTitulo.trim().length > 0) {
            modificarTituloTarea(id, nuevoTitulo)
            setMensaje("¡Titulo cambiado con éxito!")
        } else {
            setMensaje("No se puede introducir un titulo vacío")
        }
    })

    const handleClickCancelar = (() => {
        setEditando(false)
        setNuevoTitulo(titulo)
        setMensaje("");
    })

    return (
        <>

            <div className="tarea-contenedor">

                <h1>{id}</h1>
                <h1 className={nombreClassName} >{titulo} {inTrush ? "si" : "No"}</h1>

                {!inTrush && <button className="boton-tarea" onClick={handleClickEditar}>✎</button>}
                {!inTrush && <button className={botonCompletarClassName} onClick={handleClickCompletar}>{texto}</button>}
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
                                setNuevoTitulo(e.target.value)
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
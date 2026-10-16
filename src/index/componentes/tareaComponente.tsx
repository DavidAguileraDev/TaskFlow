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

export function TareaComponente({ id, titulo, completada, handleClickEliminarfn, modificarTareaCompletada, modificarTituloTarea }:
    { id: number, titulo: string, completada: boolean, handleClickEliminarfn: Function, modificarTareaCompletada: Function, modificarTituloTarea:Function }) {

    const [editando, setEditando] = useState(false);
    const [nuevoTitulo, setNuevoTitulo] = useState("");

    const texto = completada ? "⟲" : "✔";

    const nombreClassName = completada ? "tarea-completada" : "";

    const botonCompletarClassName = completada
        ? 'tarea-completar-button is-completada'
        : 'tarea-completar-button'


    const handleClickCompletar = (() => {


        modificarTareaCompletada(id, !completada)

    })

    const handleClickEliminar = (() => {
        handleClickEliminarfn(id)
    })


    const handleClickEditar = (() => {

        setEditando(editando ? false : true);

    })

    const handleClickGuardar = (() => {
        modificarTituloTarea(id, nuevoTitulo)
        setNuevoTitulo("");
        setEditando(false)
    })

    const handleClickCancelar = (() => {
        setEditando(false)
    })

    return (
        <>

            <div className="tarea-contenedor">

                <h1>{id}</h1>
                <h1 className={nombreClassName}>{titulo}</h1>

                <button className="boton-editar-tarea" onClick={handleClickEditar}>✎</button>
                <button className={botonCompletarClassName} onClick={handleClickCompletar}>{texto}</button>
                <button className="boton-eliminar-tarea" onClick={handleClickEliminar}>Eliminar</button>

                {editando && (
                <div className="menu-editar-tarea">

                    <h3>Editar tarea</h3>

                    <input
                        type="text"
                        value={nuevoTitulo}
                        onChange={(e) =>
                            setNuevoTitulo(e.target.value)
                        }
                        placeholder="Nuevo nombre"
                    />

                    <button onClick={handleClickGuardar}>
                        Guardar
                    </button>

                    <button onClick={handleClickCancelar}>
                        Cancelar
                    </button>

                    {/*mensaje && <p>{mensaje}</p>*/}

                </div>
            )}

            </div>

        </>
    );

}
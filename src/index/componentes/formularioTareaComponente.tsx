import { useState } from "react";

import type { tarea } from "../../types/tarea.ts"


export function FormularioTareaComponent({ handleClickAniadirFn, tareas}: { handleClickAniadirFn : Function , tareas : tarea[]}) {


    const [textoConfirm, setTextoConfirm] = useState("");
    const [nombre, setNombre] = useState("");

    const handleClickNombre = (() => {

        const repetido = tareas.filter((tarea) => {

            if(tarea.titulo === nombre.trim()){
                return true
            }

            return false;

        })

        if (nombre.trim().length > 0 && repetido.length == 0) {

            handleClickAniadirFn(nombre.trim());
            setTextoConfirm("Tarea creada");
            setNombre("");
            


        } else if (repetido.length > 0) {

            setTextoConfirm("Hay otra tarea con el mismo nombre");

        }else {

            setTextoConfirm("No se ha podido crear la tarea");

        }


    })





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
                    <input
                        type="text"
                        id="nombre-tarea"
                        name="nombre-tarea"
                        onChange={(e) => setNombre(e.target.value)}
                        value={nombre}
                        placeholder="Añadir tarea"
                    />
                </div>
                <p>{textoConfirm}</p>
            </section>

        </>

    );


}
import { useState } from "react";


export function FormularioTareaComponent({ handleClickAniadirFn }: { handleClickAniadirFn: Function }) {


    const [textoConfirm, setTextoConfirm] = useState("");
    const [nombre, setNombre] = useState("");

    const handleClickNombre = (() => {


        if (nombre.trim().length > 0) {

            handleClickAniadirFn(nombre.trim());
            setTextoConfirm("Tarea creada");
            setNombre("");

        } else {
        
            setTextoConfirm("No se ha podido crear la tarea");
        
        }


    })





    return (



        <>

            <section className="">

                <input type="text" id="nombre-tarea" name="nombre-tarea" onChange={(e) => setNombre(e.target.value)} value={nombre} placeholder="Nombre de tarea" />


                <button onClick={handleClickNombre} id="añadir-tarea" name="añadir-tarea">Añadir</button>

            </section>

            <p>{textoConfirm}</p>

        </>

    );


}
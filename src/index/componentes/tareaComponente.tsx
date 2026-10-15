

export function TareaComponente({id, titulo, completada, handleClickEliminarfn, modificarTareaCompletada}: 
    {id:number, titulo:string, completada:boolean, handleClickEliminarfn:Function, modificarTareaCompletada:Function}){



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


    return(
        <>
        
        <div className="tarea-contenedor">

            <h1>{id}</h1>
            <h1 className={nombreClassName}>{titulo}</h1>

            <button className={botonCompletarClassName} onClick={handleClickCompletar}>{texto}</button>
            <button className="boton-eliminar-tarea" onClick={handleClickEliminar}>Eliminar</button>
        </div>
        
        </>
    );

}
import { useState } from "react";
import { InputBarraBusqueda } from "./InputBarraBusqueda";

export function BuscarTareasPorTexto({
    handleBuscarTarea
}: {
    handleBuscarTarea: (texto: string) => void
}) {

    const [texto, setTexto] = useState("");

    const handleOnChange = (nuevoTexto: string) => {
        setTexto(nuevoTexto);
        handleBuscarTarea(nuevoTexto);
    };

    const handleLimpiar = () => {
        setTexto("");
        handleBuscarTarea("");
    };

    return (
        <div className="buscar-tareas-contenedor">

            <div className="buscar-tareas-wrapper">

                <span className="buscar-tareas-icono">
                    ⌕
                </span>

                <InputBarraBusqueda
                    placeholder="Buscar tareas..."
                    value={texto}
                    funcion={(e) => handleOnChange(e.target.value)}
                    aria-label="Buscar tareas por título"
                />

                {texto.length > 0 && (
                    <button
                        type="button"
                        className="buscar-tareas-limpiar"
                        onClick={handleLimpiar}
                        aria-label="Limpiar búsqueda"
                    >
                        ×
                    </button>
                )}

            </div>

        </div>
    );
}

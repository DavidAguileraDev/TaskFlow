
import { useState } from "react";

interface Props {
    handleClickOrdenfn: (orden: string) => void;
}

export function FiltroOrdenacionComponente({
    handleClickOrdenfn
}: Props) {

    const [editando, setEditando] = useState(false);

    const handleClickEditar = () => {
        setEditando(!editando);
    };

    const handleClickSeleccionarOrden = (orden: string) => {
        handleClickOrdenfn(orden);
        setEditando(false);
    };

    return (
        <div className="filtro-ordenacion">

            {/* BOTÓN PRINCIPAL */}
            <button
                type="button"
                className={`filter-button ${editando ? "activo" : ""}`}
                onClick={handleClickEditar}
                aria-expanded={editando}
                aria-label="Opciones de ordenación"
            >
                <svg
                    width="24px"
                    height="24px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M4 8H13" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M17 8H20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M11 16H20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M4 16H7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                    <circle cx="9" cy="16" r="2" stroke="currentColor" strokeWidth="2.5" />
                    <circle cx="15" cy="8" r="2" stroke="currentColor" strokeWidth="2.5" />
                </svg>
            </button>


            {/* MENÚ DE ORDENACIÓN */}
            {editando && (
                <div className="menu-filtro-tarea">

                    <div className="menu-filtro-header">
                        <h3>Ordenar tareas</h3>
                    </div>

                    <div className="menu-filtro-grupo">

                        <span className="menu-filtro-titulo">
                            General
                        </span>

                        <button onClick={() => handleClickSeleccionarOrden("")}>
                            Predeterminado
                        </button>

                    </div>


                    <div className="menu-filtro-grupo">

                        <span className="menu-filtro-titulo">
                            Alfabéticamente
                        </span>

                        <button onClick={() => handleClickSeleccionarOrden("az")}>
                            A - Z
                        </button>

                        <button onClick={() => handleClickSeleccionarOrden("za")}>
                            Z - A
                        </button>

                    </div>


                    <div className="menu-filtro-grupo">

                        <span className="menu-filtro-titulo">
                            Prioridad
                        </span>

                        <button onClick={() => handleClickSeleccionarOrden("prioridad_asc")}>
                            De menor a mayor
                        </button>

                        <button onClick={() => handleClickSeleccionarOrden("prioridad_desc")}>
                            De mayor a menor
                        </button>

                    </div>


                    <div className="menu-filtro-grupo">

                        <span className="menu-filtro-titulo">
                            Fecha de vencimiento
                        </span>

                        <button onClick={() => handleClickSeleccionarOrden("fecha_asc")}>
                            Más próximas primero
                        </button>

                        <button onClick={() => handleClickSeleccionarOrden("fecha_desc")}>
                            Más lejanas primero
                        </button>

                    </div>

                </div>
            )}

        </div>
    );
}

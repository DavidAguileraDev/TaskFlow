import { useState } from "react";

export function FiltroOrdenacionComponente({handleClickOrdenfn}:{handleClickOrdenfn: (orden:string) => void}) {

    const [editando, setEditando] = useState(false);
    
    const handleClickEditar = (() => {

        setEditando(!editando);

    })

    

    return (
        <>
            <div className="filter-show-tasks">

                <button className="filter-button" onClick={handleClickEditar}>
                    <svg width="28px" height="28px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_429_11030)">
                            <path d="M4 8H13" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M17 8L20 8" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M11 16L20 16" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M4 16H7" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                            <circle cx="9" cy="16" r="2" stroke="#ffffff" stroke-width="2.5" />
                            <circle cx="15" cy="8" r="2" stroke="#ffffff" stroke-width="2.5" />
                        </g>
                        <defs>
                            <clipPath id="clip0_429_11030">
                                <rect width="24" height="24" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                </button>

                {editando && (
                    <div className={`menu-filtro-tarea ${editando ? "open" : ""}`}>

                        <button className="boton-filter-show-tasks" onClick={(() => { handleClickOrdenfn("") })}>
                            Predeterminado
                        </button>

                        <button className="boton-filter-show-tasks" onClick={(() => { handleClickOrdenfn("az") })}>
                            Orden alfabético asc
                        </button>

                        <button className="boton-filter-show-tasks" onClick={(() => { handleClickOrdenfn("za") })}>
                            Orden alfabético desc
                        </button>




                    </div>
                )}

            </div>



        </>

    )
}
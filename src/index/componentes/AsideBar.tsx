
import { filtros } from "../constantes/filtros.ts";

export function AsideBar({
    tareasDisponibles,
    tareasIncompletas,
    tareasCompletas,
    tareasPapelera,
    cambiarFiltroFn,
    numeroFiltro }:
    {
        tareasDisponibles: number,
        tareasCompletas: number,
        tareasIncompletas: number,
        tareasPapelera: number,
        cambiarFiltroFn: (titulo: number) => void,
        numeroFiltro: number
    }) {

    const cantidad_tareas = [tareasDisponibles, tareasIncompletas, tareasCompletas, tareasPapelera];


    

    return (
        <>
            <aside className="sidebar">
                <div className="sidebar-header">
                    <span>TaskFlow</span>
                    <span>⌘K</span>
                </div>

                {
                    filtros.map((filtro) => {
                        return (
                                <button
                                    key={filtro.id}
                                    type="button"
                                    className={`sidebar-button ${numeroFiltro === filtro.id ? "active" : ""}`}
                                    onClick={() => { 
                                        cambiarFiltroFn(filtro.id)
                                        

                                        }}>
                                    <span>{filtro.nombre}</span>
                                    <span className="badge">{cantidad_tareas[filtro.id]}</span>

                                </button>
                        )

                    })
                }
                {/*  <div className="sidebar-item">
                    <span>📅 Today</span>
                    <span className="badge">4</span>
                </div>
                <div className="sidebar-item">
                    <span>⏰ Tomorrow</span>
                    <span className="badge">3</span>
                </div> */}

                
            </aside>
        </>
    )


}
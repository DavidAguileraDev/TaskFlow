import type { tarea } from "../types/tarea.ts";

export function AsideBar({tareas, tareasCompletadas, cambiarFiltroFn, numeroFiltro} : {tareas: tarea[], tareasCompletadas:number, cambiarFiltroFn:Function,numeroFiltro:number}) {


    const handleClickCambiarFiltro0 = (() => {
        cambiarFiltroFn(0)
    })

    const handleClickCambiarFiltro1 = (() => {
        cambiarFiltroFn(1)
    })


    return (
        <>
            <aside className="sidebar">
                <div className="sidebar-header">
                    <span>TaskFlow</span>
                    <span>⌘K</span>
                </div>
                <div  className={`sidebar-item ${numeroFiltro === 0 ? "active" : ""}`} onClick={handleClickCambiarFiltro0}>
                    <span>📥 Tareas</span>
                    <span className="badge">{tareas.length}</span>
                </div>
                <div  className={`sidebar-item ${numeroFiltro === 1 ? "active" : ""}`} onClick={handleClickCambiarFiltro1}>
                    <span>💤 Tareas completadas</span>
                    <span className="badge">{tareasCompletadas}</span>
                </div>
                <div className="sidebar-item">
                    <span>📌 Pinboard</span>
                    <span className="badge">2</span>
                </div>
                <div className="sidebar-item">
                    <span>📅 Today</span>
                    <span className="badge">4</span>
                </div>
                <div className="sidebar-item">
                    <span>⏰ Tomorrow</span>
                    <span className="badge">3</span>
                </div>

                <div className="sidebar-item">
                    <span>🗑️ Trash</span>
                </div>
            </aside>
        </>
    )


}
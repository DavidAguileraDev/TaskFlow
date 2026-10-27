
export function AsideBar({tareasDisponibles, tareasCompletadas, tareasIncompletas, tareasPapelera, cambiarFiltroFn, numeroFiltro}: 
    { tareasDisponibles:number, tareasCompletadas:number,tareasIncompletas:number, tareasPapelera:number, cambiarFiltroFn: (titulo: number) => void,numeroFiltro:number}) {


    const handleClickCambiarFiltro0 = (() => {
        cambiarFiltroFn(0)
    })

    const handleClickCambiarFiltro1 = (() => {
        cambiarFiltroFn(1)
    })

    const handleClickCambiarFiltro2 = (() => {
        cambiarFiltroFn(2)
    })
    const handleClickCambiarFiltro3 = (() => {
        cambiarFiltroFn(3)
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
                    <span className="badge">{tareasDisponibles}</span>
                </div>
                <div  className={`sidebar-item ${numeroFiltro === 1 ? "active" : ""}`} onClick={handleClickCambiarFiltro1}>
                    <span>📌 Tareas pendientes</span>
                    <span className="badge">{tareasIncompletas}</span>
                </div>
                <div  className={`sidebar-item ${numeroFiltro === 2 ? "active" : ""}`} onClick={handleClickCambiarFiltro2}>
                    <span>💤 Tareas completadas</span>
                    <span className="badge">{tareasCompletadas}</span>
                </div>
               {/*  <div className="sidebar-item">
                    <span>📅 Today</span>
                    <span className="badge">4</span>
                </div>
                <div className="sidebar-item">
                    <span>⏰ Tomorrow</span>
                    <span className="badge">3</span>
                </div> */}

                <div className={`sidebar-item ${numeroFiltro === 3 ? "active" : ""}`} onClick={handleClickCambiarFiltro3}>
                    <span>🗑️ Trash</span>
                    <span className="badge">{tareasPapelera}</span>
                </div>
            </aside>
        </>
    )


}
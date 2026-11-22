import { filtros } from "../../dashboard/constantes/filtros";


export function AsideBar({
    tareasDisponibles,
    tareasIncompletas,
    tareasCompletas,
    tareasPapelera,
    numeroFiltro,
    handleClickCambiarFiltroFn}:
    {
        tareasDisponibles: number,
        tareasCompletas: number,
        tareasIncompletas: number,
        tareasPapelera: number,
        numeroFiltro: number,
        handleClickCambiarFiltroFn: (titulo: number) => void
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
                                    handleClickCambiarFiltroFn(filtro.id)


                                }}>
                                <span>{filtro.nombre}</span>
                                <span className="badge">{cantidad_tareas[filtro.id]}</span>

                            </button>
                        )

                    })
                }
            


            </aside>
        </>
    )


}
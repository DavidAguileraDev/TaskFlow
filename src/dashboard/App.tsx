import { FormularioTareaComponent } from "./componentes-dashboard/FormularioTareaComponente.tsx"
import { TareaComponente } from "./componentes-dashboard/TareaComponente.tsx"
import { AsideBar } from "./componentes-dashboard/AsideBar.tsx"
import { useTareas } from "../hooks/useTarea.ts";
import { useFiltroTareas } from "../hooks/useFiltroTareas.ts";
import { FiltroOrdenacionComponente } from "./componentes-dashboard/FiltroOrdenacionComponente.tsx"
import { useOrdenTareas } from "../hooks/useOrdenTareas.ts";
import { BuscarTareasPorTexto } from "./componentes-dashboard/BuscarTareasPorTexto.tsx";
import "./app.css";
import { useCurrentUser } from "../hooks/useCurrentUser.ts";

export default function App() {

  const {
    tareas,
    aniadirTarea,
    alternarTareaEnPapelera,
    eliminarTarea,
    modificarTarea,
    modificarTareaCompletada } = useTareas()

  const {
    filtroTareas,
    numTareasDisponibles,
    numTareasCompletadas,
    numTareasIncompletadas,
    numTareasPapelera,
    listTareasDisponibles,
    handleClickCambiarFiltro,
    handleOnChangeBuscarTarea,
    listTareasBuscadasPorTitulo } = useFiltroTareas({ tareas })

  const {
    tareasOrdenadas,
    handleClickOrden } = useOrdenTareas({ listTareasBuscadasPorTitulo });

  const { usuario } = useCurrentUser();
  const textoNumTareas = numTareasDisponibles > 0 ? "Tienes " + numTareasDisponibles + " tareas" : "No tienes ninguna tarea"

  

  return (
    <div className="app-container">

      {/* Sidebar estilo Linear adaptado a pantalla completa */}



      <AsideBar
        tareasDisponibles={numTareasDisponibles}
        tareasIncompletas={numTareasIncompletadas}
        tareasCompletas={numTareasCompletadas}
        tareasPapelera={numTareasPapelera}
        handleClickCambiarFiltroFn={handleClickCambiarFiltro}
        numeroFiltro={filtroTareas}

      />

      {/* Contenido principal a pantalla completa */}
      <main className="main-content">
        <h1>Bienvenido de nuevo, {usuario?.name}</h1>
        <p>{textoNumTareas}</p>

        <div className="formulario-wrapper">
          <FormularioTareaComponent handleClickAniadirFn={aniadirTarea} tareasDisponibles={listTareasDisponibles} />
        </div>

        <BuscarTareasPorTexto handleOnChangeBuscarTareafn={handleOnChangeBuscarTarea} />

        <FiltroOrdenacionComponente handleClickOrdenfn={handleClickOrden} />

        {tareasOrdenadas.length > 0 ? (
          <section className="tareas-contenedor">

            {

              tareasOrdenadas.map(task => (
                <TareaComponente
                  key={task.id}
                  tarea={task}
                  numeroFiltro={filtroTareas}
                  listTareasDisponibles={listTareasDisponibles}
                  handleClickAlternarTareaEnPapelera={alternarTareaEnPapelera}
                  handleClickEliminarfn={eliminarTarea}
                  modificarTarea={modificarTarea}
                  modificarTareaCompletada={modificarTareaCompletada}
                />
              ))

            }



          </section>
        ) : (
          <p>No hay tareas para mostrar.</p>
        )}
      </main>
    </div>
  );
}
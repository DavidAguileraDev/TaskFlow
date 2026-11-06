import { FormularioTareaComponent } from "./componentes/FormularioTareaComponente.tsx"
import { TareaComponente } from "./componentes/TareaComponente.tsx"
import { AsideBar } from "./componentes/AsideBar.tsx"
import { useTareas } from "../hooks/useTarea.ts";
import { useFiltroTareas } from "../hooks/useFiltroTareas.ts";
import { FiltroOrdenacionComponente } from "./componentes/FiltroOrdenacionComponente.tsx"
import { useOrdenTareas } from "../hooks/useOrdenTareas.ts";
import { BuscarTareasPorTexto } from "./componentes/BuscarTareasPorTexto.tsx";


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
    cambiarFiltro,
    tareasFiltradas,
    listTareasDisponibles,
    handleBuscarTarea,
    listTareasBuscadasPorTitulo } = useFiltroTareas({ tareas })

  const {
    handleClickOrden,
    tareasOrdenadas } = useOrdenTareas({ listTareasBuscadasPorTitulo });


  const textoNumTareas = numTareasDisponibles > 0 ? "Tienes " + numTareasDisponibles + " tareas" : "No tienes ninguna tarea"


  return (
    <div className="app-container">
      {/* Sidebar estilo Linear adaptado a pantalla completa */}

      <AsideBar
        tareasDisponibles={numTareasDisponibles}
        tareasIncompletas={numTareasIncompletadas}
        tareasCompletas={numTareasCompletadas}
        tareasPapelera={numTareasPapelera}
        cambiarFiltroFn={cambiarFiltro}
        numeroFiltro={filtroTareas}

      />

      {/* Contenido principal a pantalla completa */}
      <main className="main-content">
        <h1>TaskFlow</h1>
        <p>{textoNumTareas}</p>

        <div className="formulario-wrapper">
          <FormularioTareaComponent handleClickAniadirFn={aniadirTarea} tareasFiltradas={tareasFiltradas} />
        </div>

        <BuscarTareasPorTexto handleBuscarTarea={handleBuscarTarea} />

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
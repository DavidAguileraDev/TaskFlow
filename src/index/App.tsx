import { FormularioTareaComponent } from "./componentes/formularioTareaComponente.tsx"
import { TareaComponente } from "./componentes/tareaComponente.tsx"
import { AsideBar } from "./asideBar.tsx"
import { useTareas } from "../hooks/useTarea.ts";
import { useFiltroTareas } from "../hooks/useFiltroTareas.ts";
import { FiltroOrdenacionComponente } from "./componentes/filtroOrdenacionComponente.tsx"
import { useOrdenTareas } from "../hooks/useOrdenTareas.ts";


export default function App() {


  const { tareas, aniadirTarea, alternarTareaEnPapelera, eliminarTarea, modificarTituloTarea, modificarTareaCompletada } = useTareas()
  const { filtroTareas, numTareasDisponibles, numTareasCompletadas, numTareasIncompletadas, numTareasPapelera, cambiarFiltro, tareasFiltradas, listTareasDisponibles } = useFiltroTareas({ tareas })
  const { handleClickOrden, tareasOrdenadas } = useOrdenTareas({tareasFiltradas});


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

          <FiltroOrdenacionComponente handleClickOrdenfn={handleClickOrden}/>

        {tareasFiltradas.length > 0 && (
          <section className="tareas-contenedor">

            {
              
              tareasOrdenadas.map(task => {

                return (

                  <TareaComponente
                    key={task.id}
                    tarea={task}
                    numeroFiltro={filtroTareas}
                    listTareasDisponibles={listTareasDisponibles}
                    handleClickAlternarTareaEnPapelera={alternarTareaEnPapelera}
                    handleClickEliminarfn={eliminarTarea}
                    modificarTituloTarea={modificarTituloTarea}
                    modificarTareaCompletada={modificarTareaCompletada}
                  />

                );

              })

            }
          </section>
        )}
      </main>
    </div>
  );
}
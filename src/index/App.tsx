import { FormularioTareaComponent } from "./componentes/formularioTareaComponente.tsx"
import { TareaComponente } from "./componentes/tareaComponente.tsx"
import { AsideBar } from "./asideBar.tsx"
import { useTareas } from "../hooks/useTarea.ts";
import { useFiltroTareas } from "../hooks/useFiltroTareas.ts";



export default function App() {


  const { tareas, aniadirTarea, eliminarTarea, modificarTituloTarea, modificarTareaCompletada } = useTareas()
  const {filtroTareas, tareasCompletadas, tareasIncompletadas, cambiarFiltro, tareasFiltradas} = useFiltroTareas({tareas})


  const textoNumTareas = tareas.length > 0 ? "Tienes " + tareas.length + " tareas" : "No tienes ninguna tarea"


  return (
    <div className="app-container">
      {/* Sidebar estilo Linear adaptado a pantalla completa */}

      <AsideBar
        tareas={tareas}
        tareasCompletadas={tareasCompletadas}
        tareasIncompletas={tareasIncompletadas}
        cambiarFiltroFn={cambiarFiltro}
        numeroFiltro={filtroTareas}

      />

      {/* Contenido principal a pantalla completa */}
      <main className="main-content">
        <h1>TaskFlow</h1>
        <p>{textoNumTareas}</p>

        <div className="formulario-wrapper">
          <FormularioTareaComponent handleClickAniadirFn={aniadirTarea} tareas={tareas} />
        </div>

        {tareasFiltradas.length > 0 && (
          <section className="tareas-contenedor">

            {

              tareasFiltradas.map(task => {

                return (

                  <TareaComponente
                    key={task.id}
                    id={task.id}
                    titulo={task.titulo}
                    completada={task.completada}
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
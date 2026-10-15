import { useState } from "react";
import type { tarea } from "../types/tarea.ts";
import { FormularioTareaComponent } from "./componentes/formulario_tareaComponente.tsx"
import { TareaComponente } from "./componentes/tareaComponente.tsx"
import { AsideBar } from "./asideBar.tsx"
export default function App() {

  const [tareas, setTareas] = useState<tarea[]>([])
  const [filtroTareas, setfiltroTareas] = useState(0)
  const [idTarea, setIdTarea] = useState(1)

  const tareasCompletadas = tareas.filter(
    tarea => tarea.completada
  ).length;


  const cambiarFiltro = ((tipo_filtro: number) => {

    setfiltroTareas(tipo_filtro);

  })

  const aniadirTarea = ((tarea_añadir: string) => {

    const tarea_obj: tarea = {

      id: idTarea,
      titulo: String(tarea_añadir),
      completada: false

    }

    setTareas([...tareas, tarea_obj]);
    setIdTarea(idTarea + 1)
  })

  const eliminarTarea = ((id: number) => {

  

    const tareasActuales = tareas.filter(tareas => tareas.id !== id)

    
    setTareas(tareasActuales)

  })

  const cambiarTareaCompletada = (id: number, completada: boolean) => {

    const nuevasTareas = tareas.map((tarea) => {

      if (tarea.id === id) {

        return {
          id: tarea.id,
          titulo: tarea.titulo,
          completada: completada
        };

      } else {

        return tarea;

      }
    });

    setTareas(nuevasTareas);
  };

  const tareasFiltradas = tareas.filter(tarea => {

    if (filtroTareas === 1) {
      return tarea.completada;
    }

    return true

  });

  return (
    <div className="app-container">
      {/* Sidebar estilo Linear adaptado a pantalla completa */}

      <AsideBar
        tareas={tareas}
        tareasCompletadas={tareasCompletadas}
        cambiarFiltroFn={cambiarFiltro}
        numeroFiltro={filtroTareas}

      />

      {/* Contenido principal a pantalla completa */}
      <main className="main-content">
        <h1>TaskFlow</h1>
        <p>Filtro actual: {filtroTareas}</p>
        <p>Tienes {tareas.length} tareas</p>

        <div className="formulario-wrapper">
          <FormularioTareaComponent handleClickAniadirFn={aniadirTarea} />
        </div>

        {tareasFiltradas.length > 0 && (
          <section className="tareas-contenedor">

            {

              tareasFiltradas.map(({ id, titulo, completada }) => {

                return (

                  <TareaComponente
                    key={id}
                    id={id}
                    titulo={titulo}
                    completada={completada}
                    handleClickEliminarfn={eliminarTarea}
                    modificarTareaCompletada={cambiarTareaCompletada}
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
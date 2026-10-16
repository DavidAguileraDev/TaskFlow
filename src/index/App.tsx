import { useEffect, useState } from "react";
import type { tarea } from "../types/tarea.ts";
import { FormularioTareaComponent } from "./componentes/formularioTareaComponente.tsx"
import { TareaComponente } from "./componentes/tareaComponente.tsx"
import { AsideBar } from "./asideBar.tsx"
export default function App() {

  const [tareas, setTareas] = useState<tarea[]>(() => {

    const guardadas = localStorage.getItem("tareas");

    return guardadas !== null ? JSON.parse(guardadas) : [];

  });
  
  const [filtroTareas, setfiltroTareas] = useState(0)

  useEffect((() => {

    localStorage.setItem("tareas", JSON.stringify(tareas));

  }), [tareas])

  const tareasCompletadas = tareas.filter(
    tarea => tarea.completada
  ).length;

  const tareasIncompletadas = tareas.filter(
    tarea => !tarea.completada
  ).length;


  const textoNumTareas = tareas.length > 0 ? "Tienes " + tareas.length + " tareas" : "No tienes ninguna tarea"

  const cambiarFiltro = ((tipo_filtro: number) => {

    setfiltroTareas(tipo_filtro);

  })

  const aniadirTarea = ((tarea_añadir: string) => {

    const nuevoId = tareas.length > 0
      ? Math.max(...tareas.map(tarea => tarea.id)) + 1
      : 1;

    const tarea_obj: tarea = {

      id: nuevoId,
      titulo: String(tarea_añadir),
      completada: false

    }

    setTareas([...tareas, tarea_obj]);
  })

  const eliminarTarea = ((id: number) => {



    const tareasActuales = tareas.filter(tareas => tareas.id !== id)


    setTareas(tareasActuales)

  })

  const modificarTituloTarea = (id: number, nuevoTitulo: string) => {

    const nuevasTareas = tareas.map((tarea) => {

      if (tarea.id === id) {

        return {
          id: tarea.id,
          titulo: nuevoTitulo,
          completada: tarea.completada
        };

      } else {

        return tarea;

      }
    });

    setTareas(nuevasTareas);
  };

  const modificarTareaCompletada = (id: number, completada: boolean) => {

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
      return !tarea.completada;
    }
    else if (filtroTareas === 2) {
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

              tareasFiltradas.map(({ id, titulo, completada }) => {

                return (

                  <TareaComponente
                    key={id}
                    id={id}
                    titulo={titulo}
                    completada={completada}
                    handleClickEliminarfn={eliminarTarea}
                    modificarTareaCompletada={modificarTareaCompletada}
                    modificarTituloTarea={modificarTituloTarea}
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
import { useEffect, useState } from "react";
import type { tarea } from "../types/tarea";



export function useTareas(): {
    tareas: tarea[],
    aniadirTarea: (titulo: string) => void,
    alternarTareaEnPapelera:(id: number) => void,
    eliminarTarea: (id: number) => void,
    modificarTituloTarea: (id: number, titulo: string) => void,
    modificarTareaCompletada: (id: number, completada: boolean) => void
} {

  const [tareas, setTareas] = useState<tarea[]>([]);

  const refreshTareas = () => {

    const guardadas = localStorage.getItem("tareas");

    setTareas(guardadas !== null ? JSON.parse(guardadas) : [])

  }

  useEffect(refreshTareas, [])

  useEffect((() => {

    localStorage.setItem("tareas", JSON.stringify(tareas));

  }), [tareas])

  const aniadirTarea = ((tarea_añadir: string) => {

    const nuevoId = tareas.length > 0
      ? Math.max(...tareas.map(tarea => tarea.id)) + 1
      : 1;

    const tarea_obj: tarea = {

      id: nuevoId,
      titulo: String(tarea_añadir),
      completada: false,
      inTrush: false

    }

    setTareas([...tareas, tarea_obj]);
  })

  const alternarTareaEnPapelera = ((id: number) => {



    const nuevasTareas = tareas.map((tarea) => {

      if (tarea.id === id) {

        return {
          id: tarea.id,
          titulo: tarea.titulo,
          completada: tarea.completada,
          inTrush: !tarea.inTrush
        };

      } else {

        return tarea;

      }
    });
    
    setTareas(nuevasTareas);

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
          completada: tarea.completada,
          inTrush: tarea.inTrush
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
          completada: completada,
          inTrush: tarea.inTrush
        };

      } else {

        return tarea;

      }
    });

    setTareas(nuevasTareas);
  };

  return {tareas, aniadirTarea, alternarTareaEnPapelera, eliminarTarea, modificarTituloTarea, modificarTareaCompletada }
}
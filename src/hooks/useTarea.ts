import { useEffect, useState } from "react";
import type { tarea } from "../types/tarea";
import type { PrioridadId } from "../types/prioridades";



export function useTareas(): {
  tareas: tarea[],
  aniadirTarea: (titulo: string, prioridad:PrioridadId, fechaVencimiento: string | null) => void,
  alternarTareaEnPapelera: (id: number) => void,
  eliminarTarea: (id: number) => void,
  modificarTarea: (id: number, titulo: string, nuevaPrioridad: PrioridadId, nuevaFechaVencimiento: string | null) => void,
  modificarTareaCompletada: (id: number, completada: boolean) => void,
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

  const aniadirTarea = ((titulo: string, prioridad: PrioridadId, fechaVencimiento: string | null) => {

    const nuevoId = tareas.length > 0
      ? Math.max(...tareas.map(tarea => tarea.id)) + 1
      : 1;

    const tarea_obj: tarea = {

      id: nuevoId,
      titulo: String(titulo),
      completada: false,
      prioridad: prioridad,
      fechaVencimiento: fechaVencimiento,
      inTrush: false

    }

    setTareas([...tareas, tarea_obj]);
  })

  const alternarTareaEnPapelera = ((id: number) => {



    const nuevasTareas = tareas.map((tarea) => {

      if (tarea.id === id) {

        return {
          ...tarea,
          inTrush: !tarea.inTrush
        };

      }

      return tarea;

    });

    setTareas(nuevasTareas);

  })

  const eliminarTarea = ((id: number) => {



    const tareasActuales = tareas.filter(tareas => tareas.id !== id)


    setTareas(tareasActuales)

  })

  const modificarTarea = (id: number, nuevoTitulo: string, nuevaPrioridad: PrioridadId, nuevaFechaVencimiento: string | null) => {

    const nuevasTareas = tareas.map((tarea) => {

      if (tarea.id === id) {

        return {
          ...tarea,
          titulo: nuevoTitulo,
          prioridad:nuevaPrioridad,
          fechaVencimiento:nuevaFechaVencimiento
        };

      }

      return tarea;

    });

    setTareas(nuevasTareas);
  };

  const modificarTareaCompletada = (id: number, completada: boolean) => {

    const nuevasTareas = tareas.map((tarea) => {

      if (tarea.id === id) {

        return {
          ...tarea,
          completada: completada,
        };

      }
        return tarea;

      
    });

    setTareas(nuevasTareas);
  };

  return { tareas, aniadirTarea, alternarTareaEnPapelera, eliminarTarea, modificarTarea, modificarTareaCompletada }
}
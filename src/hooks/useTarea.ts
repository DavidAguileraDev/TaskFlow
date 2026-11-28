import { useEffect, useState } from "react";
import type { tarea } from "../types/tarea";
import type { PrioridadId } from "../types/prioridades";
import { useCurrentUser } from "./useCurrentUser";
import { endpoint } from "../dashboard/constantes/endpoint";



export function useTareas(): {
  tareas: tarea[],
  aniadirTarea: (titulo: string, prioridad: PrioridadId, fechaVencimiento: string | null) => void,
  alternarTareaEnPapelera: (id: number) => void,
  eliminarTarea: (id: number) => void,
  modificarTarea: (id: number, titulo: string, nuevaPrioridad: PrioridadId, nuevaFechaVencimiento: string | null) => void,
  modificarTareaCompletada: (id: number, completada: boolean) => void,
} {

  const { usuario } = useCurrentUser()

  const [tareas, setTareas] = useState<tarea[]>([]);

  useEffect((() => {

    obtenerTareas();


  }), [usuario])

  const obtenerTareas = async () => {

    try {

      if (!usuario?.id) return;

      const respuesta = await fetch(`${endpoint}/api/tareas/creador/${usuario?.id}`, {
        method: "GET",
        credentials: "include"
      });

      const datos = await respuesta.json();

      // If response not "success", dont follow the next instructions
      if (!datos.success) {

        return;
      }


      const nuevasTareas: tarea[] = datos.tareas;

      setTareas(nuevasTareas);



    } catch (error) {
      console.error("Error al conectar con el servidor:", error);
    }

  }

  const aniadirTarea = (async (titulo: string, prioridad: PrioridadId, fechaVencimiento: string | null) => {




    try {

      const respuesta = await fetch(`${endpoint}/api/tareas/creador/${usuario?.id}/aniadir`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          titulo,
          prioridad,
          fechaVencimiento
        })
      });

      const datos = await respuesta.json();

      // If response not "ok", dont follow the next instructions
      if (!datos.success) {
        return;
      }

      const nuevaTarea: tarea = {
        id: datos.tarea.id,
        titulo: datos.tarea.titulo,
        completada:  datos.tarea.completada,
        prioridad:  datos.tarea.prioridad,
        fechaVencimiento:  datos.tarea.fechaVencimiento,
        inTrash:  datos.tarea.inTrash
      }

      setTareas([...tareas, nuevaTarea]);

    } catch (error) {
      console.error("Error al conectar con el servidor:", error);
    }
  })

  const alternarTareaEnPapelera = ((id: number) => {



    const nuevasTareas = tareas.map((tarea) => {

      if (tarea.id === id) {

        return {
          ...tarea,
          inTrash: !tarea.inTrash
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
          prioridad: nuevaPrioridad,
          fechaVencimiento: nuevaFechaVencimiento
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
  // The return of the variables and functions

  return { tareas, aniadirTarea, alternarTareaEnPapelera, eliminarTarea, modificarTarea, modificarTareaCompletada }
}
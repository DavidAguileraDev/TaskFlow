import { useState } from "react";
import type { tarea } from "../types/tarea";

export function useFiltroTareas({ tareas }: { tareas: tarea[] }): {
  filtroTareas: number,
  numTareasDisponibles: number,
  numTareasCompletadas: number,
  numTareasIncompletadas: number,
  numTareasPapelera: number,
  cambiarFiltro: (tipo_filtro: number) => void,
  tareasFiltradas: tarea[],
  listTareasDisponibles: tarea[]
} {

  const [filtroTareas, setfiltroTareas] = useState(0)

  const numTareasDisponibles = tareas.filter(
    tarea => !tarea.inTrush
  ).length;

  const numTareasCompletadas = tareas.filter(
    tarea => tarea.completada && !tarea.inTrush
  ).length;

  const numTareasIncompletadas = tareas.filter(
    tarea => !tarea.completada && !tarea.inTrush
  ).length;

  const numTareasPapelera = tareas.filter(
    tarea => tarea.inTrush
  ).length;

  const cambiarFiltro = ((tipo_filtro: number) => {

    setfiltroTareas(tipo_filtro);

  })

  const tareasFiltradas = tareas.filter(tarea => {

    if (filtroTareas === 0) {
      return !tarea.inTrush;
    }
    else if (filtroTareas === 1) {
      return !tarea.completada && !tarea.inTrush;
    }
    else if (filtroTareas === 2) {
      return tarea.completada && !tarea.inTrush;

    } else if (filtroTareas === 3) {
      return tarea.inTrush;
    }

    return true

  });

  const listTareasDisponibles = tareas.filter(tarea => {

    return !tarea.inTrush;

  });

  return { filtroTareas, numTareasDisponibles, numTareasCompletadas, numTareasIncompletadas, numTareasPapelera, cambiarFiltro, tareasFiltradas, listTareasDisponibles }
}
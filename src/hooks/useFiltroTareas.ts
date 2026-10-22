import { useState } from "react";
import type { tarea } from "../types/tarea";

export function useFiltroTareas({tareas}:{tareas:tarea[]}):{
  filtroTareas:number,
  tareasCompletadas:number, 
  tareasIncompletadas:number, 
  cambiarFiltro: (tipo_filtro: number) => void,
  tareasFiltradas: tarea[]} {

  const [filtroTareas, setfiltroTareas] = useState(0)

  const tareasCompletadas = tareas.filter(
    tarea => tarea.completada
  ).length;

  const tareasIncompletadas = tareas.filter(
    tarea => !tarea.completada
  ).length;

  const cambiarFiltro = ((tipo_filtro: number) => {

    setfiltroTareas(tipo_filtro);

  })

  const tareasFiltradas = tareas.filter(tarea => {

    if (filtroTareas === 1) {
      return !tarea.completada;
    }
    else if (filtroTareas === 2) {
      return tarea.completada;
    }

    return true

  });

  return {filtroTareas, tareasCompletadas, tareasIncompletadas,cambiarFiltro,tareasFiltradas}
}
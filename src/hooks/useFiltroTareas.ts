import { useState } from "react";
import type { tarea } from "../types/tarea";

export function useFiltroTareas({tareas}:{tareas:tarea[]}):{
  filtroTareas:number,
  tareasDisponibles:number,
  tareasCompletadas:number, 
  tareasIncompletadas:number, 
  tareasPapelera:number,
  cambiarFiltro: (tipo_filtro: number) => void,
  tareasFiltradas: tarea[]} {

  const [filtroTareas, setfiltroTareas] = useState(0)

  const tareasDisponibles = tareas.filter(
    tarea => !tarea.inTrush
  ).length;

  const tareasCompletadas = tareas.filter(
    tarea => tarea.completada && !tarea.inTrush
  ).length;

  const tareasIncompletadas = tareas.filter(
    tarea => !tarea.completada && !tarea.inTrush
  ).length;

  const tareasPapelera = tareas.filter(
    tarea => tarea.inTrush
  ).length;

  const cambiarFiltro = ((tipo_filtro: number) => {

    setfiltroTareas(tipo_filtro);

  })

  const tareasFiltradas = tareas.filter(tarea => {

    if(filtroTareas === 0){
      return !tarea.inTrush;
    }
    else if (filtroTareas === 1) {
      return !tarea.completada && !tarea.inTrush;
    }
    else if (filtroTareas === 2) {
      return tarea.completada && !tarea.inTrush;

    }else if (filtroTareas === 3) {
      return tarea.inTrush;
    }

    return true

  });

  return {filtroTareas, tareasDisponibles, tareasCompletadas, tareasIncompletadas, tareasPapelera, cambiarFiltro,tareasFiltradas}
}
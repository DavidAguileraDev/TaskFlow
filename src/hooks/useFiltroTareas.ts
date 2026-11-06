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
  listTareasDisponibles: tarea[],
  listTareasBuscadasPorTitulo:() => tarea[],
  handleBuscarTarea: (texto: string) => void
} {

  const [filtroTareas, setfiltroTareas] = useState(0)
  const [tituloTareaBuscar, setTituloTareaBuscar] = useState("");


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

  const handleBuscarTarea = ((texto: string) => {

    setTituloTareaBuscar(texto)

  })

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

   const listTareasBuscadasPorTitulo = (() => {

    if (tituloTareaBuscar) {
      return tareasFiltradas.filter(tarea => {

        return tarea.titulo.toLowerCase().includes(

          tituloTareaBuscar.trim().toLowerCase()

        );

      });
    } else{
      return tareasFiltradas
    }

  });

  const listTareasDisponibles = tareas.filter(tarea => {

    return !tarea.inTrush;

  });




  return {
    filtroTareas,
    numTareasDisponibles,
    numTareasCompletadas,
    numTareasIncompletadas,
    numTareasPapelera,
    cambiarFiltro,
    tareasFiltradas,
    listTareasBuscadasPorTitulo,
    listTareasDisponibles,
    handleBuscarTarea
  }
}
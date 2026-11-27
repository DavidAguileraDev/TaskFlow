import { useState } from "react";
import type { tarea } from "../types/tarea";

export function useFiltroTareas({ tareas }: { tareas: tarea[] }): {
  filtroTareas: number,
  numTareasDisponibles: number,
  numTareasCompletadas: number,
  numTareasIncompletadas: number,
  numTareasPapelera: number,
  listTareasDisponibles: tarea[],
  handleClickCambiarFiltro: (tipo_filtro: number) => void,
  listTareasBuscadasPorTitulo: () => tarea[],
  handleOnChangeBuscarTarea: (texto: string) => void
} {

  // States
  const [filtroTareas, setfiltroTareas] = useState(0)
  const [tituloTareaBuscar, setTituloTareaBuscar] = useState("");


  // The constants to show how many tasks each filter has

  const numTareasDisponibles = tareas.filter(
    tarea => !tarea.inTrash
  ).length;

  const numTareasCompletadas = tareas.filter(
    tarea => tarea.completada && !tarea.inTrash
  ).length;

  const numTareasIncompletadas = tareas.filter(
    tarea => !tarea.completada && !tarea.inTrash
  ).length;

  const numTareasPapelera = tareas.filter(
    tarea => tarea.inTrash
  ).length;



  // HandleClick to show the tasks that are displayed
  const handleClickCambiarFiltro = ((tipo_filtro: number) => {

    setfiltroTareas(tipo_filtro);

  })

  // List of tasks filtered according to the selected sidebar filter

const tareasFiltradas = tareas.filter(tarea => {

    // Filter 0: All tasks not in the trash
    if (filtroTareas === 0) {
      return !tarea.inTrash;
    }
    // Filter 1: Incomplete tasks not in the trash
    else if (filtroTareas === 1) {
      return !tarea.completada && !tarea.inTrash;
    }
    // Filter 2: Completed tasks not in the trash
    else if (filtroTareas === 2) {
      return tarea.completada && !tarea.inTrash;
    }
    // Filter 3: Tasks in the trash
    else if (filtroTareas === 3) {
      return tarea.inTrash;
    }

    return true;
});

  // Give the tasks that aren't in the trash

  const listTareasDisponibles = tareas.filter(tarea => {

    return !tarea.inTrash;

  });

  // Change the state of the TituloTareaBuscar for searchibg
  const handleOnChangeBuscarTarea = ((texto: string) => {

    setTituloTareaBuscar(texto)

  })

  // Tasks filter by title write on the searcher
  const listTareasBuscadasPorTitulo = (() => {

    if (tituloTareaBuscar) {
      return tareasFiltradas.filter(tarea => {

        return tarea.titulo.toLowerCase().includes(

          tituloTareaBuscar.trim().toLowerCase()

        );

      });
    } else {
      return tareasFiltradas
    }

  });

  // The return of the variables and functions

  return {
    filtroTareas,
    numTareasDisponibles,
    numTareasCompletadas,
    numTareasIncompletadas,
    numTareasPapelera,
    listTareasDisponibles,
    handleClickCambiarFiltro,
    handleOnChangeBuscarTarea,
    listTareasBuscadasPorTitulo
  }
}
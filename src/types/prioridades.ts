export const prioridades = [
    { id: 1, nombre: "baja" },
    { id: 2, nombre: "media" },
    { id: 3, nombre: "alta" },
] as const;

export type PrioridadId = typeof prioridades[number]["id"];
# AGENTS.md

## Permisos (regla absoluta)

- No ejecutar ningún comando (npm, git, composer, tests, build, scripts, etc.) sin permiso explícito del usuario.
- No modificar, crear, renombrar ni eliminar ningún archivo sin permiso explícito. La única excepción es este `AGENTS.md` cuando el usuario lo solicita.
- Leer e inspeccionar archivos está permitido para entender el proyecto.
- Si una petición es ambigua o implica cambios, proponer el plan por escrito y esperar confirmación antes de actuar.
- Un permiso dado para una acción concreta no autoriza otras acciones ni acciones futuras similares.

## Idioma y convenciones

- Español para todos los identificadores de código: variables, funciones, hooks, componentes, tipos, interfaces, constantes, props y campos. Ejemplos: `obtenerTareaPorId`, `listaTareas`, `estaCargando`, `TipoPrioridad`.
- Inglés para comentarios de código, `README.md`, archivos bajo `docs/` y cualquier otra documentación o texto descriptivo.
- Los comentarios se usan solo cuando aportan contexto que el código no expresa por sí mismo; se escriben en inglés.
- No asumir traducciones de textos de interfaz ni de mensajes de usuario: preguntar antes de decidirlas.

## Estructura del proyecto

- Frontend React + TypeScript + Vite en la raíz (`src/`): hooks en `src/hooks`, tipos en `src/types`, utilidades en `src/utils`, componentes en `src/componentes` y `src/dashboard/componentes-dashboard`.
- Backend Symfony en `api/backend_taskflow/`, con su propio `AGENTS.md`. Al trabajar en ese directorio, respetar también esas instrucciones.

## Flujo de trabajo

- Antes de cualquier cambio, indicar qué archivos se afectarían y esperar autorización.
- Cuando el usuario pida un commit, dar solo el texto del mensaje; crear el commit solo si el usuario lo indica expresamente.
- No instalar dependencias, ejecutar migraciones ni cambiar archivos de configuración o bloqueo sin permiso.
- Las verificaciones (lint, typecheck, tests) solo se ejecutan si el usuario lo autoriza expresamente.

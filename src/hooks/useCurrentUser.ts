import { useEffect, useState } from "react";
import type { usuario } from "../types/usuario";

export function useCurrentUser() {


    // States

    const [usuario, setUsuario] = useState<usuario | null>(null);

    // Endpoint for do the consults to API
    const endpoint = "http://localhost:8000";

    // Get the user to use the data in the app
    const obtenerUsuario = async () => {
        try {
            const respuesta = await fetch(`${endpoint}/api/me`, {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const datos = await respuesta.json();

            // If response not "ok", dont follow the next instructions
            if (!respuesta.ok) {
                console.log("No hay una sesión iniciada:", datos.message);
                return;
            }

            // If all its "ok" set the user in the state
            setUsuario(datos.user)

        } catch (error) {
            console.error("Error al consultar la sesión:", error);
        }
    };

    // Fetches the current user when the component mounts.
    useEffect(() => {
        obtenerUsuario();
    }, []);

    // The return of the variables and functions

    return ({ usuario, obtenerUsuario })
}
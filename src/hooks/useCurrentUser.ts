import { useEffect, useState } from "react";
import type { usuario } from "../types/usuario";

export function useCurrentUser() {

    const [usuario, setUsuario] = useState<usuario | null>(null);

     const endpoint = "http://localhost:8000";

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

            if (!respuesta.ok) {
                console.log("No hay una sesión iniciada:", datos.message);
                return;
            }

            setUsuario(datos.user)

        } catch (error) {
            console.error("Error al consultar la sesión:", error);
        }
    };

    useEffect(() => {
        obtenerUsuario();
    }, []);


    return ({ usuario, obtenerUsuario })
}
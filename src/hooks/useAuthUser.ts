import { useState } from "react";
import type { AuthData } from "../types/AuthData";
import { useNavigate } from "react-router-dom";
import { endpoint } from "../dashboard/constantes/endpoint";

export function useAuthUser({ proceso }: { proceso: "sign-in" | "sign-up"}) {

    //States
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [acceptTerms, setAcceptTerms] = useState<boolean>(false);
    const [rememberMe, setRememberMe] = useState<boolean>(false);

    // Function for redirect for a new URL
    const navigate = useNavigate();



    //handleOnChanges for form

    const handleOnChangeName = (nuevoTexto: string) => {
        setName(nuevoTexto);
    };

    const handleOnChangeEmail = (nuevoTexto: string) => {
        setEmail(nuevoTexto);
    };

    const handleOnChangePassword = (nuevoTexto: string) => {
        setPassword(nuevoTexto);
    };

    const handleOnChangeConfirmPassword = (nuevoTexto: string) => {
        setConfirmPassword(nuevoTexto);
    };

    const handleOnChangeAcceptTerms = (e: boolean) => {
        setAcceptTerms(e);
    };

    const handleOnChangeRememberMe = (e: boolean) => {
        setRememberMe(e);
    };



    // Fetch AuthData for get a response of information
    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault();

        try {

            const data_user: AuthData = {
                email: email,
                password: password,
                name: name,
                confirmPassword: confirmPassword,
                acceptTerms: acceptTerms
            }

            const respuesta = await fetch(`${endpoint}/api/${proceso}`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data_user)
            });

            const datos = await respuesta.json();

            // If response not "ok", dont follow the next instructions
            if (!respuesta.ok) {
                console.log(datos.error);
                return;
            }

            // Data logs
            console.log(datos.message);
            console.log(datos.user);

            // Redirect only when the user login succesfull
            if (proceso === "sign-in") {
                navigate(`/dashboard`);

            }


        } catch (error) {
            console.error("Error al conectar con el servidor:", error);
        }
    };


    // The return of the variables and functions

    return {
        name,
        email,
        password,
        confirmPassword,
        acceptTerms,
        rememberMe,
        handleOnChangeName,
        handleOnChangeEmail,
        handleOnChangePassword,
        handleOnChangeConfirmPassword,
        handleOnChangeAcceptTerms,
        handleOnChangeRememberMe,
        handleSubmit,
    }
}
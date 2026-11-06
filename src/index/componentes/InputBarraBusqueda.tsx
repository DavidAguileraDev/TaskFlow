import type React from "react";

export function InputBarraBusqueda({
    funcion,
    ...props
}: {
    funcion: (e: React.ChangeEvent<HTMLInputElement>) => void;
} & React.ComponentProps<"input">) {

    return (
        <input
            type="text"
            onChange={funcion}
            {...props}
        />
    );
}
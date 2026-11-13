import { InputBarraBusqueda } from "../../componentes/InputBarraBusqueda";
import { useAuthUser } from "../../hooks/useAuthUser";
import { Link } from "react-router-dom";

export default function Register() {

    const proceso = "sign-up"

    const {
        acceptTerms,
        handleOnChangeName,
        handleOnChangeEmail,
        handleOnChangePassword,
        handleOnChangeConfirmPassword,
        handleOnChangeAcceptTerms,
        handleSubmit } = useAuthUser({ proceso });

    return (
        <div
            className="container-fluid min-vh-100 d-flex align-items-center justify-content-center m-0 p-0"
            style={{ backgroundColor: "#141417" }}
        >
            <div
                className="card border-0 p-4 p-sm-5 shadow-lg w-100"
                style={{
                    maxWidth: "420px",
                    backgroundColor: "#1c1c24",
                    border: "1px solid #30303a",
                    borderRadius: "16px"
                }}
            >
                {/* Cabecera centrada */}
                <div className="text-center mb-4">
                    <h4 className="fw-semibold mb-1" style={{ color: "#f4f4f5" }}>
                        TaskFlow
                    </h4>
                    <p className="small mb-0" style={{ color: "#a1a1aa" }}>
                        Crea una cuenta nueva
                    </p>
                </div>

                {/* Formulario totalmente alineado a la izquierda */}
                <form onSubmit={handleSubmit} className="w-100 text-start">

                    {/* Campo Nombre */}
                    <div className="mb-3 w-100">
                        <label className="form-label small fw-semibold mb-1 d-block" style={{ color: "#a1a1aa" }}>
                            Nombre completo
                        </label>
                        <InputBarraBusqueda
                            className="form-control"
                            id="fieldName"
                            type="text"
                            name="name"
                            funcion={(e) => handleOnChangeName(e.target.value)}
                        />
                    </div>

                    {/* Campo Email */}
                    <div className="mb-3 w-100">
                        <label className="form-label small fw-semibold mb-1 d-block" style={{ color: "#a1a1aa" }}>
                            Correo electrónico
                        </label>
                        <InputBarraBusqueda
                            className="form-control"
                            id="fieldEmail"
                            type="email"
                            name="email"
                            funcion={(e) => handleOnChangeEmail(e.target.value)}
                        />
                    </div>

                    {/* Campo Password */}
                    <div className="mb-3 w-100">
                        <label className="form-label small fw-semibold mb-1 d-block" style={{ color: "#a1a1aa" }}>
                            Contraseña
                        </label>
                        <InputBarraBusqueda
                            className="form-control"
                            id="fieldPassword"
                            type="password"
                            name="password"
                            funcion={(e) => handleOnChangePassword(e.target.value)}
                        />
                    </div>

                    {/* Campo Confirmar Password */}
                    <div className="mb-3 w-100">
                        <label className="form-label small fw-semibold mb-1 d-block" style={{ color: "#a1a1aa" }}>
                            Confirmar contraseña
                        </label>
                        <InputBarraBusqueda
                            className="form-control"
                            id="fieldConfirmPassword"
                            type="password"
                            name="confirmPassword"
                            funcion={(e) => handleOnChangeConfirmPassword(e.target.value)}
                        />
                    </div>

                    {/* Checkbox Términos y condiciones */}
                    <div className="form-check mb-4 w-100 ps-0">
                        <div className="d-flex align-items-center">
                            <input
                                className="form-check-input m-0 me-2"
                                type="checkbox"
                                id="acceptTerms"
                                checked={acceptTerms}
                                name="accept-terms"
                                onChange={(e) => handleOnChangeAcceptTerms(e.target.checked)}
                                style={{ cursor: "pointer", backgroundColor: "#27272a", borderColor: "#3f3f46" }}
                            />
                            <label className="form-check-label small" htmlFor="acceptTerms" style={{ color: "#a1a1aa", cursor: "pointer" }}>
                                Acepto los términos y condiciones
                            </label>
                        </div>
                    </div>

                    {/* Botón de envío */}
                    <div className="d-grid w-100 mb-3">
                        <button
                            type="submit"
                            name="send-register-data"
                            className="btn fw-semibold py-2 rounded-3 w-100"
                            style={{
                                backgroundColor: "#4f46e5",
                                border: "1px solid #6366f1",
                                color: "#ffffff",
                                borderRadius: "10px"
                            }}
                        >
                            Sign up
                        </button>
                    </div>

                </form>

                {/* Apartado para volver al login al pie */}
                <div className="text-center mt-3 pt-3 w-100" style={{ borderTop: "1px solid rgba(255, 255, 255, 0.06)" }}>
                    <p className="small mb-0" style={{ color: "#a1a1aa" }}>
                        ¿Ya tienes cuenta?{" "}
                        <Link
                            to="/sign-in"
                            className="fw-semibold text-decoration-none"
                            style={{ color: "#818cf8" }}
                        >
                            Inicia sesión aquí
                        </Link>
                    </p>
                </div>

            </div>
        </div>
    );
}
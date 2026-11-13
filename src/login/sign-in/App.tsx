import { InputBarraBusqueda } from "../../componentes/InputBarraBusqueda";
import { useAuthUser } from "../../hooks/useAuthUser";

export default function App() {

    const proceso = "sign-in"
    
    const {rememberMe, handleOnChangeEmail, handleOnChangePassword, handleOnChangeRememberMe, handleSubmit} = useAuthUser({proceso})

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
                        Sign in
                    </p>
                </div>

                {/* Formulario totalmente alineado a la izquierda */}
                <form onSubmit={handleSubmit} method="POST" className="w-100 text-start">

                    {/* Campo Email */}
                    <div className="mb-3 w-100">
                        <label className="form-label small fw-semibold mb-1 d-block" style={{ color: "#a1a1aa" }}>
                            Correo electrónico
                        </label>
                        <InputBarraBusqueda
                            className="form-control"
                            id="fieldText"
                            type="email"
                            name="email"
                            funcion={(e: React.ChangeEvent<HTMLInputElement>) => handleOnChangeEmail(e.target.value)}
                        />
                    </div>

                    {/* Campo Password */}
                    <div className="mb-2 w-100">
                        <label className="form-label small fw-semibold mb-1 d-block" style={{ color: "#a1a1aa" }}>
                            Contraseña
                        </label>
                            <InputBarraBusqueda
                                className="form-control"
                                id="fieldText"
                                type="password"
                                name="password"
                                funcion={(e: React.ChangeEvent<HTMLInputElement>) => handleOnChangePassword(e.target.value)}
                            />
                    </div>

                    {/* Enlace de recuperación pegado a la izquierda */}
                    <div className="mb-3 w-100">
                        <a href="#recuperar" className="text-decoration-none small" style={{ color: "#818cf8", fontSize: "12px" }}>
                            ¿Olvidaste tu contraseña?
                        </a>
                    </div>

                    {/* Checkbox Mantener sesión pegado a la izquierda */}
                    <div className="form-check mb-4 w-100 ps-0">
                        <div className="d-flex align-items-center">
                            <input
                                className="form-check-input m-0 me-2"
                                type="checkbox"
                                id="rememberMe"
                                checked={rememberMe}
                                onChange={(e) => handleOnChangeRememberMe(e.target.checked)}
                                style={{ cursor: "pointer", backgroundColor: "#27272a", borderColor: "#3f3f46" }}
                            />
                            <label className="form-check-label small" htmlFor="rememberMe" style={{ color: "#a1a1aa", cursor: "pointer" }}>
                                Mantener sesión iniciada
                            </label>
                        </div>
                    </div>

                    {/* Botón de envío */}
                    <div className="d-grid w-100 mb-3">
                        <button
                            type="submit"
                            name="send-login-data"
                            className="btn fw-semibold py-2 rounded-3 w-100"
                            style={{
                                backgroundColor: "#4f46e5",
                                border: "1px solid #6366f1",
                                color: "#ffffff",
                                borderRadius: "10px"
                            }}
                        >
                            Sign in
                        </button>
                    </div>

                </form>

                {/* Apartado de registro al pie */}
                <div className="text-center mt-3 pt-3 w-100" style={{ borderTop: "1px solid rgba(255, 255, 255, 0.06)" }}>
                    <p className="small mb-0" style={{ color: "#a1a1aa" }}>
                        ¿Aún no tienes cuenta?{" "}
                        <a href="/sign-up" className="fw-semibold text-decoration-none" style={{ color: "#818cf8" }}>
                            Regístrate aquí
                        </a>
                    </p>
                </div>

            </div>
        </div>
    );
}
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import "./Login.css";

interface LoginData {
  email: string;
  password: string;
}

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginData>();
  const { signin, isAuthenticated, errors: loginErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/tasks", { replace: true });
  }, [isAuthenticated, navigate]);

  const onSubmit = handleSubmit(async (values) => {
    await signin(values);
  });

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={onSubmit}>
        <div className="login-icon">🔐</div>
        <h1 className="login-title">Bienvenido de nuevo</h1>
        <p className="login-subtitle">Ingresa tus datos para continuar</p>

        {loginErrors.map((error: string, i: number) => (
          <div className="login-error" key={i}>
            {error}
          </div>
        ))}

        <label className="login-label">Correo electrónico</label>
        <input
          className="login-input"
          type="email"
          placeholder="tucorreo@ejemplo.com"
          {...register("email", { required: true })}
        />

        <label className="login-label">Contraseña</label>
        <input
          className="login-input"
          type="password"
          placeholder="••••••••"
          {...register("password", { required: true })}
        />

        <button className="login-button" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Ingresando..." : "Iniciar sesión"}
        </button>

        <p className="login-footer">
          ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;
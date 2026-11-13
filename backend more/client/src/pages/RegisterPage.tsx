import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import type { RegisterData } from "../api/auth";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";



import "./Register.css";


function RegisterPage() {

  const { register, handleSubmit, formState: { errors }, } = useForm<RegisterData>();
  const { signup, isAuthenticated, errors: registerErrors } = useAuth();
  const navigate = useNavigate();


  useEffect(() => {
    if (isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);


  const onSubmit = handleSubmit(async (values) => {
    await signup(values);
  });


  return (
    <div className="register-page">
      {registerErrors.map((error, i) => (
        <div className="register-error" key={i}>
          {error}
        </div>
      ))}
      <form
        className="register-card"
        onSubmit={onSubmit}
      >
        <h1 className="register-title">Crear cuenta</h1>
        <p className="register-subtitle">Completa tus datos para registrarte</p>

        <input
          className="register-input"
          type="text"
          placeholder="Username"
          {...register("username", { required: true })}
        />
        {errors.username && <span className="register-error">Username is required</span>}
        <input
          className="register-input"
          type="email"
          placeholder="Email"
          {...register("email", { required: true })}
        />
        {errors.email && <span className="register-error">Username is required</span>}
        <input
          className="register-input"
          type="password"
          placeholder="Password"
          {...register("password", { required: true })}
        />
        {errors.password && <span className="register-error">Password is required</span>}

        <button className="register-button" type="submit">
          Register
        </button>
        <p className="login-footer">
          ¿No tienes cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </form>
    </div>
  )
}

export default RegisterPage

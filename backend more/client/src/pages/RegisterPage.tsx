import {useForm} from "react-hook-form";
import {useAuth} from "../context/AuthContext.tsx";


import "./Register.css";

function RegisterPage() {

  const {register, handleSubmit} = useForm()
  const {signup} = useAuth();
  
  const onSubmit = handleSubmit(async (values) => {
    signup(values);
  });


  return (
    <div className="register-page">
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
    <input
      className="register-input"
      type="email"
      placeholder="Email"
      {...register("email", { required: true })}
    />
    <input
      className="register-input"
      type="password"
      placeholder="Password"
      {...register("password", { required: true })}
    />

    <button className="register-button" type="submit">
      Register
    </button>
  </form>
</div>
  )
}

export default RegisterPage

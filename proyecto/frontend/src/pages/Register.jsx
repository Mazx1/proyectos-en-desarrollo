import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "usuario"
  });
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      const response = await api.post("/auth/register", form);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Error al registrar");
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: "40px auto", fontFamily: "Arial" }}>
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Nombre" value={form.name} onChange={handleChange} required style={{ width: "100%", marginBottom: 8 }} />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required style={{ width: "100%", marginBottom: 8 }} />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required style={{ width: "100%", marginBottom: 8 }} />
        <select name="role" value={form.role} onChange={handleChange} style={{ width: "100%", marginBottom: 8 }}>
          <option value="usuario">usuario</option>
          <option value="admin">admin</option>
          <option value="superadmin">superadmin</option>
        </select>
        <button type="submit">Crear cuenta</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p>
        Ya tienes cuenta? <Link to="/login">Inicia sesion</Link>
      </p>
    </div>
  );
};

export default Register;

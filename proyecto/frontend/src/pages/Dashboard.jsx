import { useNavigate } from "react-router-dom";
import api from "../api";

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const testAdmin = async () => {
    try {
      const response = await api.get("/auth/admin");
      alert(response.data.message);
    } catch (error) {
      alert(error.response?.data?.message || "No autorizado");
    }
  };

  const testSuperAdmin = async () => {
    try {
      const response = await api.get("/auth/superadmin");
      alert(response.data.message);
    } catch (error) {
      alert(error.response?.data?.message || "No autorizado");
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", fontFamily: "Arial" }}>
      <h2>Dashboard</h2>
      <p>Bienvenido: {user?.name}</p>
      <p>Rol actual: <strong>{user?.role}</strong></p>

      <button onClick={testAdmin} style={{ marginRight: 8 }}>
        Probar endpoint admin
      </button>
      <button onClick={testSuperAdmin} style={{ marginRight: 8 }}>
        Probar endpoint superadmin
      </button>
      <button onClick={logout}>Cerrar sesion</button>
    </div>
  );
};

export default Dashboard;

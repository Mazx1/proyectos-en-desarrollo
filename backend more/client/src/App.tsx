import {AuthProvider} from "./context/AuthContext";
import { BrowserRouter,Routes,Route,} from "react-router-dom";



import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import TaskPage from "./pages/taskPage";
import TaskFormPage from "./pages/taskFormPage";
import ProfilePage from "./pages/profilePage";
import HomePage from "./pages/HomePage";
import ProtectedRoutes from "./pages/protectecRoutes";
//import TaskDetailPage from "./pages/taskdetailPage";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route element={<ProtectedRoutes />}>
        <Route path="/tasks" element={<TaskPage />} />
        <Route path="/add-task" element={<TaskFormPage />} />
        <Route path="/task/:id" element={<TaskFormPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Routes>
      </BrowserRouter>
    </AuthProvider>
    
  );     
}
export default App;

import {AuthProvider} from "./context/AuthContext.tsx";
import { BrowserRouter,Routes,Route} from "react-router-dom";



import RegisterPage from "./pages/RegisterPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/tasks" element={<div>tasks</div>} />
        <Route path="/add-task" element={<div>add-task</div>} />
        <Route path="/task/:id" element={<div>task</div>} />
        <Route path="/profile" element={<div>profile</div>} />
      </Routes>
      </BrowserRouter>
    </AuthProvider>
    
  );     
}
export default App;

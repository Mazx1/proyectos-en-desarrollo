import {BrowserRouter, Route, Routes} from "react-router"

import Header from "./components/Header";
import ProductForm from "./components/ProductForm.jsx"
import ProductList from './components/ProductList.jsx'
function App() {
  

  return (
    <BrowserRouter>
    <div className="container mx-auto">
      <Header />
      <Routes>
        <Route path="/" element={<ProductList/>} />
        <Route path="/nuevo-producto" element={<ProductForm/>} />
        <Route path="/editar-producto" element={<ProductForm/>} />
      </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App

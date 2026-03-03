import { useState } from "react";
import { createProduct } from "../api/products";
import {useNavigate} from "react-router-dom";

export default function ProductForm() {

    const [product, setProduct] = useState({
        nombre:"",
        precio: 0,
        descripcion: ""
    });

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        await createProduct(product)
        navigate("/")
        console.log(product)
    }


  return (
    <div>
      <form onSubmit={ handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-bold text-gray-700">
            Nombre
          </label>
          <input 
            onChange={(e)=> setProduct({...product, nombre: e.target.value})}            
            type="text"
            className="w-full mt-1 p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label onChange={(e)=> setProduct({...product, precio: e.target.value})}          
           className="block text-sm font-bold text-gray-700">
            Precio
          </label>
          <input
            type="text"
            className="w-full mt-1 p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label onChange={(e)=> setProduct({...product, descripcion: e.target.value})}          
           className="block text-sm font-bold text-gray-700">
            Descripción
          </label>
          <input
            type="text"
            className="w-full mt-1 p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            Guardar
          </button>

          <button
            type="button"
            className="bg-red-600 text-white px-4 py-2 rounded-lg ml-2"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

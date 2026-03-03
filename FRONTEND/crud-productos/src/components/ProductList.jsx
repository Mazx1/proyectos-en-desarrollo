import  { useState } from 'react'
import { getProducts } from '../api/products'
import { useEffect } from 'react'

export default function ProductList() {

    const[products, setProducts] = useState([])

    const loadProducts = async() => {
        const response = await getProducts()
        setProducts(response.data)
        console.log(response)
    }
    useEffect(()=>{
        loadProducts()
    },[])

  return (
    <div className='mt-8'>
      <h1 className='text-3xl font-bold text-sky-900'>Productos Disponibles</h1>
      <div className='grid grid-cols-1 md:grid-cols-3 mt-5 gap-5 text-amber-50'>
        {products.map(product=>(
          <div key={product.id} className='bg-sky-950 p-4 rounded-lg shadow'>
          <p>{product.nombre}</p>
          <p><span className='font-bolt'>Precio:</span> $ {product.precio}</p>
          <p><span className='font-bold'></span>{product.description}</p>
          <div className='mt-4'> 
            <button className='bg-green-900 text-white px-2 py-1 rounded-lg'>Editar</button>
            <button className='bg-red-900 text-white px-2 py-1 rounded-lg ml-2'>Eliminar</button>
          </div>          
          </div>          
        ))}
      </div>
    </div>
  )
}

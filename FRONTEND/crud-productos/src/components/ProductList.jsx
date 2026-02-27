import React, { useState } from 'react'
import { getProducts } from '../api/products'
import { useEffect } from 'react'

export default function ProductList() {

    const[products, setProducts] = useState([])

    const loadProducts = async() => {
        const response = await getProducts()
        console.log(response)
    }
    useEffect(()=>{
        loadProducts()
    },[])

  return (
    <div>
      <h1>Productos DIsponibles</h1>
    </div>
  )
}

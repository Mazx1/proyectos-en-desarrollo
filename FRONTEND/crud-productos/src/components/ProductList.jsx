import React from 'react'
import { getProducts } from '../api/products'

export default function ProductList() {

    const loadProducts = async() => {
        const response = await getProducts()
        console.log(response)
    }
    loadProducts()

  return (
    <div>
      producto lista
    </div>
  )
}

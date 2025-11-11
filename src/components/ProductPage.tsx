import axios from 'axios'
import  { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

interface Product{
    id:number,
    title:string,
    description:string,
    price:number,
    rating:number,
    images:string
}

const ProductPage = () => {
    const {id}=useParams<{id:string}>()
    const navigate=useNavigate()
    const[product,setProduct]=useState<Product|null>(null)

    useEffect(()=>{
        if(id){
            axios.get<Product>(`https://dummyjson.com/products/${id}`).then(response=>{
                setProduct(response.data)
            }).catch(error=>console.error("Error Fetching product data",error))
        }
    },[id,])
    // console.log(product?.images[0])
    if(!product){
        return <h1>loading...</h1>
    }
  return (
    <div>
        <button onClick={()=>navigate(-1)} className='px-2 py-1 bg-black text-white rounded '>Back</button>

        <div className='mt-7 w-full px-6 '>
            <img className='w-[300px]' src={product.images[0]} alt="" />
            <h2 className='font-bold text-xl'>{product.title} </h2>
            <p className='text-gray-600'>{product.description} </p>
            <div className='flex gap-8'>
                <p>Price: ${product.price} </p>
                <p>Rating: {product.rating} </p>
            </div>
        </div>
    </div>
  )
}

export default ProductPage
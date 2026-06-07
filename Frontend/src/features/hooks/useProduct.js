import { useContext, useEffect } from "react"
import { ProductContext } from "../productContext"
import { getAllProduct, productCreate, productDelete, updateProduct } from "../services/product.services"

export default function useProduct() {

    const {product, setProduct, loading, setLoading} = useContext(ProductContext)
    

    const handleProduct = async (formData) => {
        try {
            setLoading(true)
            const response = await productCreate(formData)
            setProduct(response.products)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id) => {
        try {
            setLoading(true)
            const response = await productDelete(id)
            alert(response.message)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const handleUpdate = async ({id, formData}) => {
        try {
            setLoading(true)
            const response = await updateProduct({id, formData})
            setProduct(response.products)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const getProduct = async () => {
        try {
            setLoading(true)
            const response = await getAllProduct()
            setProduct(response.products)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getProduct()
    }, [setProduct])

    return {handleProduct, handleDelete, handleUpdate,getProduct ,product, loading}
}

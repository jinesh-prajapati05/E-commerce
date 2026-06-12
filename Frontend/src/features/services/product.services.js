import axios from "axios";

const api = axios.create({
  baseURL: "https://e-commerce-jv0t.onrender.com/api/v1/auth",
  withCredentials: true,
});

export async function productCreate(formData) {
  try {
    const response = await api.post("/product", formData);
    return response.data
  } catch (error) {
    console.log(error);
  }
}

export async function getAllProduct() {
    try {
        const response = await api.get('/product')
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export async function productDelete(id) {
    try {
        const response = await api.delete(`/product/delete/${id}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
    
}

export async function updateProduct({id, formData}) {
    try {
        const response = await api.put(`/product/update/${id}`, formData)
        return response.data
    } catch (error) {
        console.log(error)        
    }
}

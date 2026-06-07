import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/product",
  withCredentials: true,
});

export async function productCreate(formData) {
  try {
    const response = await api.post("/", formData);
    return response.data
  } catch (error) {
    console.log(error);
  }
}

export async function getAllProduct() {
    try {
        const response = await api.get('/')
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export async function productDelete(id) {
    try {
        const response = await api.delete(`/delete/${id}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
    
}

export async function updateProduct({id, formData}) {
    try {
        const response = await api.put(`/update/${id}`, formData)
        return response.data
    } catch (error) {
        console.log(error)        
    }
}

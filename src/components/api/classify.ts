import axios from "axios";

export const classify = (async(formData: FormData)=>{
    try{
        const response = await axios.post("http://localhost:5050/classify",formData,{
        headers: { "Content-Type": "multipart/form-data" },
      })
        return response
    }catch(error){
        console.error("Error",error)
        throw error
    }
})
import axios from "axios";

export const extract = (async(formdata: FormData)=>{
    try{
        const response = await axios.post("http://localhost:5001/extract-info",formdata,{
            headers: { "Content-Type": "multipart/form-data" },
            }
        )
        return response
    }catch(error){
        console.error("Error",error)
        throw error
    }
})
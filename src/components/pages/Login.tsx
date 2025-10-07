import React, { useState } from 'react'
import TextField from "@mui/material/TextField"
import Button from '@mui/material/Button'
import {Stethoscope} from 'lucide-react'
import {DotLottieReact} from "@lottiefiles/dotlottie-react"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

interface LoginProps{
    onLogin: () => void
}

const Login:React.FC<LoginProps> = ({onLogin}) => {

const [formData,setFormData] = useState({
    email:'',
    password:''
})

const handleChange = ((e: React.ChangeEvent<HTMLInputElement>)=>{
    const {name,value} = e.target
    setFormData((prevData)=>({
        ...prevData,[name]:value,
    }))
})

const handleSubmit = ( async (e: React.FormEvent)=>{
    e.preventDefault();
    if (!formData.email && !formData.password) {
        alert("All Fields are required");
        return;
    }
    try{
        const response = await axios.post('http://localhost:5000/signin',formData);
            if(response.status === 200){
                onLogin()
                navigate("/dashboard");
                alert("Login Successfully")
            }
        }catch(error: any){
            if (error.response) {
                const status = error.response.status;
                
                switch (status) {
                    case 400:
                        alert("Email and Password are required");
                        break;
                    case 401:
                        alert("Invalid Email or Password");
                        break;
                    case 500:
                        alert("Server Error");
                        break;
                    default:
                        alert("Unexpected Error");
                }
            } else {
                alert("Network Error. Please try again.");
            }
        }
    })

const navigate = useNavigate()
return (
    <div className="root-div h-screen flex flex-row justify-between m-5 items-center">
        <div className="form-container shadow-2xl shadow-black-400 rounded rounded-lg flex flex-cols justify-center items-center mx-10 w-[40%]">
            <form onSubmit={handleSubmit} className='sign_in flex flex-col gap-2 w-full px-15 py-10'>

                <div className="logo flex flex-col items-center mb-4">
                    <Stethoscope 
                    className='bg-primary text-white rounded-xl h-15 w-15 p-3'
                    />
                    <h1 className='text-3xl text-primary font-semibold'>MediScan</h1>
                    <h2 className='text-sm text-secondary mb-8'>Medical Record Verification System</h2>
                </div>

                <label htmlFor="Email">Email</label>
                    <TextField
                        required
                        type='email'
                        name='email'
                        onChange={handleChange}
                        value={formData.email}
                        label= "Email"
                        variant='outlined'
                        fullWidth
                    />
                <label htmlFor="password">Password</label>
                    <TextField
                        required
                        type='password'
                        name='password'
                        onChange={handleChange}
                        value={formData.password}
                        label= "Password"
                        variant='outlined'
                        fullWidth
                    />

                <Button
                    variant='contained'
                    fullWidth
                    className='!bg-primary !mt-4'
                    type='submit'
                    >Sign In
                </Button>
                <div className="create_acccount flex justify-center">
                    <p className='text-secondary text-sm'>Don't have an account?</p>
                    <p className='text-primary text-sm ml-2 cursor-pointer font-semibold'
                    onClick={() => {
                        navigate('/signup'); window.scrollTo(0, 0);
                    }}
                    >Create Account</p>
                </div>
            </form>
        </div>

        <div className="right-side flex items-center justify-center">
            <div className='animation'>
                 <DotLottieReact
                    src='https://lottie.host/30123d7c-c25e-48a9-8b21-9fb0d355f476/deyQO8P1XK.lottie'
                    loop
                    autoplay
                    height={600}
                    width={600}
                />
            </div>
        </div>

        </div>
    )
}

export default Login

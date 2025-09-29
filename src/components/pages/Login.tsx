import React, { useState } from 'react'
import TextField from "@mui/material/TextField"
import Button from '@mui/material/Button'
import {Stethoscope} from 'lucide-react'
import {DotLottieReact} from "@lottiefiles/dotlottie-react"
import { useNavigate } from 'react-router-dom'

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

const handleSubmit = ((e: React.FormEvent)=>{
    e.preventDefault();
      if (formData && formData.email && formData.password) {
    onLogin();               // update App state
    navigate("/dashboard");  // redirect to dashboard
  } else {
    alert("Please fill in all fields");
  }
    console.log("Response",formData)
})

const navigate = useNavigate()
return (
    <div className="root-div h-screen flex">
        <form onSubmit={handleSubmit} className='sign_in w-[50%] h-screen flex justify-center items-center flex-col gap-4 items-center'>
            <div className="sign_in_form w-[50%] flex flex-col gap-4">

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

            </div>
        </form>

        <div className="right-side hidden lg:flex flex-col justify-evenly items-center w-[50%] h-screen">
            <div className='animation'>
                 <DotLottieReact
                    src='https://lottie.host/72a09b48-7e93-4265-9bd4-89913384ec26/dzMjMnI9Zt.lottie'
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

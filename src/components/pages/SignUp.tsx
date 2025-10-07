import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import {DotLottieReact} from "@lottiefiles/dotlottie-react"
import type { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import axios from "axios";
import { useNavigate } from 'react-router-dom';


const SignUp:React.FC = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "",
    role: "",
    department: "",
    licenseNumber: "",
    hospitalId: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: ""
  });

  const validateStep1 = () => {
  const { firstName, middleName, lastName, gender, role, department, licenseNumber, hospitalId } = formData;
  if (
    !firstName.trim() ||
    !middleName.trim() ||
    !lastName.trim() ||
    !gender ||
    !role ||
    !department.trim() ||
    !licenseNumber.trim() ||
    !hospitalId.trim()
  ) {
    alert("Please fill out all required fields in Step 1");
    return false;
  }
  return true;
};

  
  const [step,setStep] = useState<number>(1);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const  handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);

    if(formData.password == formData.confirmPassword){
      try{
        const request = await axios.post("http://localhost:5000/register",formData);
        console.log("FormData",request);
        alert("Successfully Register")
      }catch(error){
        console.log('Error', error)
      }
    }else{
      alert("Password does not match")
      return ;
    }
  }


  return (
    <div className='root-signup flex flex-row h-screen'>
        <div className="welcome_text w-[50%] h-screen flex justify-center items-center flex-col gap-4 items-center">
            <h1 className='text-4xl font-bold text-primary'>Create your Account</h1>
            <p className='text-secondary text-md'></p>

            <div className="animation_container">
              <DotLottieReact
                src='https://lottie.host/a613f40c-8b33-43b5-8c33-48c45983a857/goVaQcXqY5.lottie'
                loop
                autoplay
                height={400}
                width={400}
             />
            </div>
        </div>

        <div className="form_container w-[50%] h-full flex flex-col">

          <form onSubmit={handleSubmit} className="form-signup w-full flex flex-col justify-center px-10">

            {step === 1 &&(
              <>
             <div className="personal_info_title text-center m-10">
                <h1 className='text-2xl font-semibold text-primary border-b border-primary pb-4'
                >Personal Information</h1>
              </div>
            
            <div className="personal_information w-full grid grid-cols-2 gap-4">
              <TextField
              required
              type='text'
              label= "First Name"
              name='firstName'
              value={formData.firstName}
              onChange={handleChange}
              variant='outlined'
              fullWidth
            />
            <TextField
              required
              type='text'
              label= "Middle Name"
              name='middleName'
              value={formData.middleName}
              onChange={handleChange}
              variant='outlined'
              fullWidth
            />

            <TextField
              required
              type='text'
              label= "Last Name"
              name='lastName'
              value={formData.lastName}
              onChange={handleChange}
              variant='outlined'
              fullWidth
            />

             <FormControl sx={{ m: 0, minWidth: 80 }}>
                <InputLabel id="demo-simple-select-autowidth-label">Gender</InputLabel>
                  <Select
                    labelId="demo-simple-select-autowidth-label"
                    name='gender'
                    id="demo-simple-select-autowidth"
                    value={formData.gender}
                    onChange={handleChange}
                    autoWidth
                    label="Gender"
                >
                    
                    <MenuItem  value={"Male"} >Male</MenuItem>
                    <MenuItem value={"Female"}>Female</MenuItem>
                  </Select>
            </FormControl>
            </div>

            <div className="professional_info_container">
              <div className="professional_info_title text-center m-10">
                <h1 className='text-2xl font-semibold text-primary border-b border-primary pb-4'
                >Professional Information</h1>
               </div> 

               <div className="professional_information w-full grid grid-cols-2 gap-4">
                  <FormControl sx={{ m: 0, minWidth: 80 }}>
                      <InputLabel id="demo-simple-select-autowidth-label">Role</InputLabel>
                    <Select
                      labelId="demo-simple-select-autowidth-label"
                      name='role'
                      id="demo-simple-select-autowidth"
                      value={formData.role}
                      onChange={handleChange}
                      autoWidth
                      label="Role"
                    >
                    
                      <MenuItem value={"Doctor"}>Doctor</MenuItem>
                      <MenuItem value={"Nurse"}>Nurse</MenuItem>
                       <MenuItem value={"Admin"}>Admin</MenuItem>
                    </Select>
                  </FormControl>

                  <TextField
                    required
                    type='text'
                    label= "Department e.g. Cardiology"
                    name='department'
                    value={formData.department}
                    onChange={handleChange}
                    variant='outlined'
                    fullWidth
                  />

                  <TextField
                    required
                    type='number'
                    name='licenseNumber'
                    value={formData.licenseNumber}
                    onChange={handleChange}
                    label= "Professional License Number"
                    variant='outlined'
                    fullWidth
                  />

                  <TextField
                    required
                    type='number'
                    name='employerId'
                    value={formData.hospitalId}
                    onChange={handleChange}
                    label= "Hospital/Employer ID"
                    variant='outlined'
                    fullWidth
                  />
               </div>
               

               <div className="button_container align-center grid grid-cols-2 gap-4">
                <Button
                  variant='outlined'
                  className='!mt-4 mr-4'
                  onClick={() => {
                    navigate('/'); window.scrollTo(0, 0);
                  }}
                >
                  Back to Login
                </Button>
                <Button
                  variant='contained'
                  className='!bg-primary !mt-4'
                  onClick={() => {
                    if(validateStep1()){
                      setStep(2);
                    }}
                  }
                >
                  Next
                </Button>
                
               </div>
            </div>
            </>
            )}
            {step === 2 &&(
              <>
              <div className="contact_container">
                 <div className="contact_info_title text-center m-10">
                    <h1 className='text-2xl font-semibold text-primary border-b border-primary pb-4'
                    >Contact Information</h1>
                  </div>
                <div className="contact_information w-full grid grid-cols-2 gap-4">
                 <TextField
                    required
                    type='email'
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    label="Personal Email"
                    variant='outlined'
                    fullWidth
                  />
                  <TextField
                    required
                    type='number'
                    label="Phone Number"
                    name='phoneNumber'
                    value={formData.phoneNumber}
                    onChange={handleChange} 
                    variant='outlined'
                    fullWidth
                  />
                  </div>
              </div>
              <div className="security_container">
                <div className="security_info_title text-center m-10">
                    <h1 className='text-2xl font-semibold text-primary border-b border-primary pb-4'
                    >Security Information</h1>
                  </div>
                <div className="security_information w-full grid grid-cols-2 gap-4">
                  <TextField
                    required
                    type='password'
                    label="Password"
                    name='password'
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <TextField
                    required
                    type='password'
                    label="Confirm Password"
                    name='confirmPassword'
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </div>
                <div className="button_container grid grid-cols-2 flex justify-center gap-4">
                  <Button
                  variant='outlined'
                  className='!mt-4 mr-4'
                  onClick={() => setStep(1)}
                >
                  Previous
                </Button>
                <Button
                  variant='contained'
                  className='!mt-4'
                  type='submit'
                >
                  Submit
                </Button>
                </div>
              </div>
              </>
            )}
          
          </form>
        </div>
      </div>  
  )
}

export default SignUp

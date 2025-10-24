import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Stethoscope } from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  // Check token on mount
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("All fields are required");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/signin", formData);

      if (response.status === 200) {
        const { token, user:{id} } = response.data;

        if (token) {
          localStorage.setItem("authToken", token);
          localStorage.setItem("userEmail", formData.email);
          localStorage.setItem("userId",id)

          onLogin();
          navigate("/dashboard");
          toast.success("Login Successful");
        } else {
          console.log("No token received from server");
        }
      }
    } catch (error: any) {
      if (error.response) {
        const status = error.response.status;
        toast.dismiss();
        switch (status) {
          case 400:
            toast.error("Email and Password are required");
            break;
          case 401:
            toast.error("Invalid Email or Password");
            break;
          case 500:
            toast.error("Server Error");
            break;
          default:
            toast.error("Unexpected Error");
        }
      } else {
        toast.dismiss();
        toast.error("Network Error. Please try again.");
      }
    }
  };

  return (
    <div className="root-div h-screen flex flex-row justify-between m-5 items-center">
      {/* Left Side: Form */}
      <div className="form-container shadow-2xl shadow-black-400 rounded-lg flex flex-cols justify-center items-center mx-10 w-[40%]">
        <form onSubmit={handleSubmit} className="sign_in flex flex-col gap-2 w-full px-15 py-10">
          <div className="logo flex flex-col items-center mb-4">
            <Stethoscope className="bg-primary text-white rounded-xl h-15 w-15 p-3" />
            <h1 className="text-3xl text-primary font-semibold">MediScan</h1>
            <h2 className="text-sm text-secondary mb-8">
              Medical Record Verification System
            </h2>
          </div>

          <label htmlFor="Email">Email</label>
          <TextField
            required
            type="email"
            name="email"
            onChange={handleChange}
            value={formData.email}
            label="Email"
            variant="outlined"
            fullWidth
          />

          <label htmlFor="password">Password</label>
          <TextField
            required
            type={showPassword ? "text" : "password"}
            name="password"
            onChange={handleChange}
            value={formData.password}
            label="Password"
            variant="outlined"
            fullWidth
            InputProps={{
              endAdornment: (
                <Button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  style={{ textTransform: "none", minWidth: "auto", padding: "0 8px" }}
                >
                  {showPassword ? "Hide" : "Show"}
                </Button>
              ),
            }}
          />

          <Button variant="contained" fullWidth className="!bg-primary !mt-4" type="submit">
            Sign In
          </Button>

          <div className="create_account flex justify-center mt-3">
            <p className="text-secondary text-sm">Don't have an account?</p>
            <p
              className="text-primary text-sm ml-2 cursor-pointer font-semibold"
              onClick={() => {
                navigate("/signup");
                window.scrollTo(0, 0);
              }}
            >
              Create Account
            </p>
          </div>
        </form>
      </div>

      {/* Right Side: Animation */}
      <div className="right-side flex items-center justify-center">
        <div className="animation">
          <DotLottieReact
            src="https://lottie.host/30123d7c-c25e-48a9-8b21-9fb0d355f476/deyQO8P1XK.lottie"
            loop
            autoplay
            height={600}
            width={600}
          />
        </div>
      </div>

      <style>{`input::-ms-reveal { display: none; }`}</style>
    </div>
  );
};

export default Login;

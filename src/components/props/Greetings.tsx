import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { CircleUser } from "lucide-react";
import React from "react";

interface GreetingsProps {
  firstName: string;
  role: string;
}

const Greetings: React.FC<GreetingsProps> = ({ firstName, role }) => {
  const greetFunction = (role: string, firstName: string) => {
    const hour = new Date().getHours();
    let timeGreeting = "";

    if (hour < 12) {
      timeGreeting = "Good Morning";
    } else if (hour < 18) {
      timeGreeting = "Good Afternoon";
    } else {
      timeGreeting = "Good Evening";
    }

    switch (role.toLowerCase()) {
      case "doctor":
        return `${timeGreeting}, Dr. ${firstName}`;
      case "nurse":
        return `${timeGreeting}, Nurse ${firstName}`;
      case "admin":
        return `${timeGreeting}, Admin ${firstName}`;
      default:
        return `${timeGreeting}, ${firstName}`;
    }
  };

  return (
    <div className="greetings flex justify-center m-5">
      <div className="greetings-card w-[95%] flex items-center gap-3 p-4 shadow rounded-lg bg-white">
        <div className="animation_container">
            <DotLottieReact
                src="https://lottie.host/e2faa6a5-ef0d-4377-b246-e3d0a03c6a33/JzZ1X0PL4s.lottie"
                loop
                autoplay
                height={100}
                width={100}
            />
        </div>
      
        <div className="greet-text">
          <p className="text-sm text-gray-500">Welcome Back!</p>
          <h3 className="text-lg font-semibold text-secondary">
            {greetFunction(role, firstName)}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Greetings;

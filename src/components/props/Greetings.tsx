import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { fetchUser } from "../api/displayUser";
import React, { useEffect, useState } from "react";

const Greetings: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [role, setRole] = useState("");

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

  useEffect(() => {
    const loadUserData = async () => {
      const id = localStorage.getItem("userId");
      if (!id) return;

      try {
        const response = await fetchUser(id);
        const user = response.data.user;
        setFirstName(user.firstName);
        setRole(user.role);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    loadUserData();
  }, []);

  return (
    <div className="greetings flex px-3 sm:px-5 my-3 sm:my-5">
      <div className="greetings-card w-full flex items-center gap-2 sm:gap-3 md:gap-4 p-3 sm:p-4 md:p-5 shadow-md rounded-lg bg-white">
        <div className="animation_container flex-shrink-0">
          <DotLottieReact
            src="https://lottie.host/e2faa6a5-ef0d-4377-b246-e3d0a03c6a33/JzZ1X0PL4s.lottie"
            loop
            autoplay
            className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28"
          />
        </div>

        <div className="greet-text min-w-0 flex-1">
          <p className="text-xs sm:text-sm text-secondary mb-0.5 sm:mb-1">
            Welcome Back!
          </p>
          <h3 className="text-base sm:text-lg md:text-xl font-semibold text-primary truncate">
            {firstName ? greetFunction(role, firstName) : "Loading..."}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Greetings;

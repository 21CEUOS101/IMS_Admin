import { LoginForm } from "../Custom_Components/LoginForm";
import React from "react";

const Login = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;

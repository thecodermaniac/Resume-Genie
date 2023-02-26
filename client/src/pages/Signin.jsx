import React from "react";
import LoginForm from "../components/LoginForm";

function Signin({ darkMode }) {
  return (
    <div className="flex justify-around">
      <aside className="w-1/2 bg-black h-screen">
        <LoginForm darkMode={darkMode} />
      </aside>
      <aside className="w-1/2 bg-white h-screen rounded-2xl hidden md:flex">
        Hello World 2
      </aside>
    </div>
  );
}

export default Signin;

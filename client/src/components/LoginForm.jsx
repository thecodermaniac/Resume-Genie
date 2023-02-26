import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";

const LoginForm = () => {
  //   const [loginName, setLoginName] = useState("");
  //   const [loginEmail, setLoginEmail] = useState("");
  //   const [password, setPassword] = useState("");
  //   const [rePassword, setRePassword] = useState("");
  //   const [contact, setContact] = useState(0);

  const url = "";
  const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState({
    name: "",
    email: "",
    password: "",
    rePassword: "",
    contact: "",
  });

  const submitForm = (e) => {
    e.preventDefault();
    if (
      loginForm.name &&
      loginForm.email &&
      loginForm.password &&
      loginForm.rePassword &&
      loginForm.contact &&
      loginForm.password === loginForm.rePassword
    ) {
      axios
        .post(url, {
          name: loginForm.name,
          email: loginForm.email,
          password: loginForm.password,
          rePassword: loginForm.rePassword,
          contact: loginForm.contact,
        })
        .then((res) => {
          console.log(res.data);
          navigate("/");
        });
    }
  };

  const handleChange = (e) => {
    const newData = { ...loginForm };
    newData[e.target.id] = e.target.value;
    setLoginForm(newData);
  };

  //   console.log(loginName, loginEmail, password, rePassword, contact);
  return (
    <div className=" h-screen justify-center items-center flex flex-col">
      <div className=" items-center flex flex-col">
        <h1 className=" font-bold text-3xl">Create Account</h1>
        <p>Gaand Maraa</p>
      </div>
      <form
        onSubmit={(e) => {
          submitForm(e);
        }}
        action=""
        className="flex flex-col pt-20 items-center justify-center"
      >
        <input
          type="text"
          placeholder="Name"
          className="  pr-56 bg-transparent border-b-2 border-[#ffffffb8] mb-10 focus:outline-none"
          onChange={(e) => handleChange(e)}
          id="name"
          value={loginForm.name}
          required
        />
        <input
          type="text"
          placeholder="Email"
          className="  pr-56 bg-transparent border-b-2 border-[#ffffffb8] mb-10 focus:outline-none"
          onChange={(e) => handleChange(e)}
          id="email"
          value={loginForm.email}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="  pr-56 bg-transparent border-b-2 border-[#ffffffb8] mb-10 focus:outline-none"
          onChange={(e) => handleChange(e)}
          id="password"
          value={loginForm.password}
          required
        />
        <input
          type="password"
          placeholder="Re-enter Password"
          className="  pr-56 bg-transparent border-b-2 border-[#ffffffb8] mb-10 focus:outline-none"
          onChange={(e) => handleChange(e)}
          id="rePassword"
          value={loginForm.rePassword}
          required
        />
        <input
          type="text"
          placeholder="Contact"
          className="  pr-56 bg-transparent border-b-2 border-[#ffffffb8] mb-10 focus:outline-none"
          onChange={(e) => handleChange(e)}
          id="contact"
          value={loginForm.contact}
          required
        />
        <input
          type="submit"
          value="Create Account"
          className="  bg-white text-black w-1/2 border-none py-1 mb-10 hover:bg-gradient-to-r from-teal-500 to-cyan-500 cursor-pointer duration-500 ease-in-out flex items-center justify-center"
        />
      </form>
    </div>
  );
};

export default LoginForm;

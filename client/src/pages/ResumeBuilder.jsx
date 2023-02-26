import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import bgBlur from "../images/blur.png";
import { IoIosAddCircle } from "react-icons/io";
import { AiFillMinusCircle } from "react-icons/ai";

import Loading from "../components/Loader";

const ResumeBuilder = ({ setResult, darkMode }) => {
  const [fullName, setFullName] = useState("");
  const [currentPosition, setCurrentPosition] = useState("");
  const [currentLength, setCurrentLength] = useState(1);
  const [currentTechnologies, setCurrentTechnologies] = useState("");
  const [headshot, setHeadshot] = useState(null);
  const [companyInfo, setCompanyInfo] = useState([{ name: "", position: "" }]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAddCompany = () =>
    setCompanyInfo([...companyInfo, { name: "", position: "" }]);

  const handleRemoveCompany = (index) => {
    const list = [...companyInfo];
    list.splice(index, 1);
    setCompanyInfo(list);
  };
  const handleUpdateCompany = (e, index) => {
    const { name, value } = e.target;
    const list = [...companyInfo];
    list[index][name] = value;
    setCompanyInfo(list);
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("headshotImage", headshot, headshot.name);
    formData.append("fullName", fullName);
    formData.append("currentPosition", currentPosition);
    formData.append("currentLength", currentLength);
    formData.append("currentTechnologies", currentTechnologies);
    formData.append("workHistory", JSON.stringify(companyInfo));
    axios
      .post("http://localhost:3001/resume/create", formData, {})
      .then((res) => {
        if (res.data.message) {
          setResult(res.data.data);
          navigate("/resume");
        }
      })
      .catch((err) => console.error(err));
    setLoading(true);
  };
  return (
    <div className=" flex flex-row mx-10 h-[calc(100vh-7rem)] rounded-xl justify-center ">
      <aside
        className={`hidden md:flex w-1/3 shadow-md  ${
          darkMode ? "bg-gray-900" : "bg-teal-100"
        } rounded-l-xl`}
      >
        <div className=" mt-10 md:mx-10 flex flex-col justify-around h-full">
          <h1 className=" text-5xl font-bold mb-10">Resume Builder</h1>
          {/* Card Start */}
          <div
            className={`${
              darkMode ? "bg-gray-800" : "bg-teal-50"
            } shadow-md px-10 py-10 rounded-lg`}
          >
            <p className=" text-xl mb-4">
              Generate a resume with ChatGPT in few seconds
            </p>
          </div>
          {/* Card End */}
        </div>
      </aside>
      {/* Form Start */}
      <aside className=" mx-0 md:mx-10 flex justify-center items-center ">
        <form
          className=" max-w-[71%] md:w-full "
          onSubmit={handleFormSubmit}
          method="POST"
          encType="multipart/form-data"
        >
          <div className=" flex flex-col mb-5">
            <label htmlFor="fullName" className=" text-lg font-semibold">
              Enter your full name
            </label>
            <input
              type="text"
              required
              name="fullName"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className={` bg-transparent px-5 py-3  border-b-2 ${
                darkMode
                  ? "border-[#ffffffb8] text-white"
                  : "border-black text-black"
              }   focus:outline-none `}
            />
          </div>

          <div className="nestedContainer   mb-5">
            <div>
              <label htmlFor="currentPosition">Current Position</label>
              <input
                type="text"
                required
                name="currentPosition"
                className={` ${
                  darkMode
                    ? "border-[#ffffffb8] text-white"
                    : "border-black text-black"
                }  w-full bg-transparent border-b-2 border-[#ffffffb8]  focus:outline-none `}
                value={currentPosition}
                onChange={(e) => setCurrentPosition(e.target.value)}
              />
            </div>
            <div className=" ml-10">
              <label htmlFor="currentLength">For how long? (year)</label>
              <input
                type="number"
                required
                name="currentLength"
                className={` ${
                  darkMode
                    ? "border-[#ffffffb8] text-white"
                    : "border-black text-black"
                }  w-full bg-transparent border-b-2 border-[#ffffffb8]  focus:outline-none `}
                value={currentLength}
                onChange={(e) => setCurrentLength(e.target.value)}
              />
            </div>
          </div>
          <div className="  flex flex-col mb-5">
            <label htmlFor="currentTechnologies">Technologies used</label>
            <input
              type="text"
              required
              name="currentTechnologies"
              className={`${
                darkMode
                  ? "border-[#ffffffb8] text-white"
                  : "border-black text-black"
              }  w-full bg-transparent border-b-2 border-[#ffffffb8]  focus:outline-none`}
              value={currentTechnologies}
              onChange={(e) => setCurrentTechnologies(e.target.value)}
            />
          </div>

          {companyInfo.map((company, index) => (
            <div
              className="justify-between w-full items-center flex "
              key={index}
            >
              <div className="companies">
                <label htmlFor="name">Company Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  className={` ${
                    darkMode
                      ? "border-[#ffffffb8] text-white"
                      : "border-black text-black"
                  } bg-transparent border-b-2 border-[#ffffffb8]  focus:outline-none`}
                  onChange={(e) => handleUpdateCompany(e, index)}
                />
              </div>
              <div className="companies">
                <label htmlFor="position">Position Held</label>
                <input
                  type="text"
                  name="position"
                  required
                  className={` ${
                    darkMode
                      ? "border-[#ffffffb8] text-white"
                      : "border-black text-black"
                  } bg-transparent border-b-2 border-[#ffffffb8]  focus:outline-none`}
                  onChange={(e) => handleUpdateCompany(e, index)}
                />
              </div>

              <div className=" flex flex-row items-center">
                {companyInfo.length < 3 && (
                  <button onClick={handleAddCompany}>
                    <IoIosAddCircle className=" text-4xl rounded-full bg-transparent text-teal-500" />
                  </button>
                )}
                {companyInfo.length > 1 && (
                  <button
                    onClick={() => handleRemoveCompany(index)}
                    className=" ml-2"
                  >
                    <AiFillMinusCircle className=" text-4xl rounded-full bg-transparent text-red-500" />
                  </button>
                )}
              </div>
            </div>
          ))}
          <div className=" flex flex-col mt-5 w-full">
            <label htmlFor="photo">Upload your image</label>
            <input
              type="file"
              name="photo"
              required
              id="photo"
              accept="image/x-png,image/jpeg"
              onChange={(e) => setHeadshot(e.target.files[0])}
              className={` ${
                darkMode
                  ? "border-[#ffffffb8] text-white"
                  : "border-black text-black"
              }  w-full border-none p-0 mt-3 bg-transparent border-b-2 border-[#ffffffb8]  focus:outline-none`}
            />
          </div>
          <div className=" flex items-center justify-center">
            {!loading && (
              <button className=" mt-10 bg-teal-500 px-3 py-2 rounded-md hover:bg-teal-600 font-semibold">
                CREATE RESUME
              </button>
            )}
            {loading && <Loading />}
          </div>
        </form>
      </aside>
      {/* Form End */}
    </div>
  );
};

export default ResumeBuilder;

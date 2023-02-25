import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import bgBlur from "../images/blur.png";

import Loading from "../components/Loader";

const ResumeBuilder = ({ setResult }) => {
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
    <div className=" flex flex-row mx-10 border-2 border-red-500 h-[calc(100vh-8rem)] rounded-xl justify-center ">
      <aside className=" hidden md:flex w-1/3 bg-gradient-to-tr from-teal-500 to-teal-600 rounded-l-xl">
        <div className=" mt-10 md:mx-10 flex flex-col justify-around h-full">
          <h1 className=" text-5xl font-bold mb-10">Resume Builder</h1>
          {/* Card Start */}
          <div className=" bg-teal-600 shadow-md px-10 py-10 rounded-lg">
            <p className=" text-xl mb-4">
              Generate a resume with ChatGPT in few seconds
            </p>
          </div>
          {/* Card End */}
        </div>
      </aside>
      <aside className=" mx-0 md:mx-10 flex justify-center">
        <form
          className=" border-2 border-red-500"
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
              className=" px-5 py-3 text-black"
            />
          </div>

          <div className="nestedContainer border-2 border-red-500 mb-5">
            <div>
              <label htmlFor="currentPosition">Current Position</label>
              <input
                type="text"
                required
                name="currentPosition"
                className="w-full border-2 border-red-500"
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
                className="w-full border-2 border-red-500"
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
              className=" w-full "
              value={currentTechnologies}
              onChange={(e) => setCurrentTechnologies(e.target.value)}
            />
          </div>

          {companyInfo.map((company, index) => (
            <div className="nestedContainer" key={index}>
              <div className="companies">
                <label htmlFor="name">Company Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  onChange={(e) => handleUpdateCompany(e, index)}
                />
              </div>
              <div className="companies">
                <label htmlFor="position">Position Held</label>
                <input
                  type="text"
                  name="position"
                  required
                  onChange={(e) => handleUpdateCompany(e, index)}
                />
              </div>

              <div className="btn__group">
                {companyInfo.length - 1 === index && companyInfo.length < 4 && (
                  <button id="addBtn" onClick={handleAddCompany}>
                    Add
                  </button>
                )}
                {companyInfo.length > 1 && (
                  <button
                    id="deleteBtn"
                    onClick={() => handleRemoveCompany(index)}
                  >
                    Del
                  </button>
                )}
              </div>
            </div>
          ))}
          <div className=" flex flex-col mt-5 w-full">
            <label htmlFor="photo">Upload your headshot image</label>
            <input
              type="file"
              name="photo"
              required
              id="photo"
              accept="image/x-png,image/jpeg"
              onChange={(e) => setHeadshot(e.target.files[0])}
              className=" w-full border-none p-0 mt-3 "
            />
          </div>
          {!loading && <button>CREATE RESUME</button>}
          {loading && <Loading />}
        </form>
      </aside>
    </div>
  );
};

export default ResumeBuilder;

import React, { useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import axios from "axios";
import Loading from "../components/Loader";

const ResumeAnalyse = ({ darkMode }) => {
  const [loading, setLoading] = useState(false);
  const [headshot, setHeadshot] = useState(null);
  const [analyseAns, setAns] = useState("");
  const handleUpload = (e) => {
    setLoading(true);
    const dataForm = new FormData();
    dataForm.append("pdffile", headshot, headshot.name);
    axios
      .post("http://localhost:3001/resume/analyse", dataForm)
      .then((res) => {
        setAns(res?.data?.answer);
        console.log(res?.data?.answer);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        alert(err);
      });
  };
  return (
    <div className=" h-screen ">
      <div className=" mx-10 absolute top-40">
        <h1 className=" text-3xl text-teal-500">Analysis</h1>
        <p className=" mt-10 text-2xl font-medium">
          AI-powered resume analysis and feedback to help you stand out in your
          job search.
        </p>
      </div>
      <div className=" flex items-center justify-center h-screen flex-col">
        <div className={` flex flex-col px-40 rounded-md py-20  `}>
          <label
            for="choose-file"
            className=" px-1 py-1 font-semibold md:text-xl border-0 cursor-pointer border-b-2 border-gray-900 hover:text-teal-500 transition-all duration-500 ease-in-out"
          >
            <h1 className=" flex items-center gap-4 ">
              Choose File
              <AiOutlineCloudUpload className=" text-2xl" />
            </h1>
          </label>
          <input
            onChange={(e) => setHeadshot(e.target.files[0])}
            type="file"
            id="choose-file"
            className=" p-0 w-24 border-0 cursor-pointer hidden"
          />
          <button
            onClick={handleUpload}
            className=" py-2 px-7 bg-teal-600 mt-10 rounded-md"
          >
            Upload
          </button>
        </div>
        {loading && <Loading />}
        {!loading && (
          <div className={` mx-20 `}>
            <h1 className=" text-2xl font-semibold mb-5 ">
              Review about your Resume:
            </h1>
            <p className="">{analyseAns}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeAnalyse;

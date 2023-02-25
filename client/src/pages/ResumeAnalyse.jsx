import React, { useState } from "react";
import axios from "axios";

const ResumeAnalyse = () => {
  const [headshot, setHeadshot] = useState(null);
  const [analyseAns, setAns] = useState("");
  const handleUpload = (e) => {
    const dataForm = new FormData();
    dataForm.append("pdffile", headshot, headshot.name);
    axios
      .post("http://localhost:3001/resume/analyse", dataForm)
      .then((res) => {
        setAns(res?.data?.answer);
        console.log(res.data);
      })
      .catch((err) => alert(err));
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
      <div className=" flex items-center justify-center h-screen">
        <input onChange={(e) => setHeadshot(e.target.files[0])} type="file" />
        <button onClick={handleUpload}>upload</button>
      </div>
    </div>
  );
};

export default ResumeAnalyse;

import React, { useState } from "react";
import axios from "axios";

const ResumeAnalyse = () => {
  const [headshot, setHeadshot] = useState(null);
  const handleUpload = (e) => {
    const dataForm = new FormData();
    dataForm.append("pdffile", headshot, headshot.name);
    axios
      .post("http://localhost:5000/resume/analyse", dataForm)
      .then((res) => {})
      .catch((err) => console.log(err));
  };
  return (
    <div className="App">
      <input onChange={(e) => setHeadshot(e.target.files[0])} type="file" />
      <button onClick={handleUpload}>upload</button>
    </div>
  );
};

export default ResumeAnalyse;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AskMe from "./pages/AskMe";
import ResumeBuilder from "./pages/ResumeBuilder";

import Resume from "./pages/Resume";
import ResumeAnalyse from "./pages/ResumeAnalyse";
import Signin from "./pages/Signin";

function App() {
  const [result, setResult] = useState({});
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    console.log(darkMode);
  }, [darkMode]);

  return (
    <div
      className={`${darkMode ? "bg-black text-white" : "bg-white text-black"}`}
    >
      <Router>
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <Routes>
          <Route
            path="/"
            element={<Home darkMode={darkMode} setDarkMode={setDarkMode} />}
          />
          <Route
            path="/ask-me"
            element={<AskMe darkMode={darkMode} setDarkMode={setDarkMode} />}
          />
          <Route
            path="/resume-builder"
            element={
              <ResumeBuilder
                setResult={setResult}
                darkMode={darkMode}
                setDarkMode={setDarkMode}
              />
            }
          />
          <Route
            path="/resume"
            element={<Resume result={result} darkMode={darkMode} />}
          />
          <Route path="/signin" element={<Signin darkMode={darkMode} />} />
          <Route
            path="/analysis"
            element={<ResumeAnalyse />}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

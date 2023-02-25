import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AskMe from "./pages/AskMe";
import ResumeBuilder from "./pages/ResumeBuilder";

import Resume from "./pages/Resume";
import ResumeAnalyse from "./pages/ResumeAnalyse";

function App() {
  const [result, setResult] = useState({});
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<Home />} />
        <Route path="/ask-me" element={<AskMe />} />
        <Route path="/resume-builder" element={<ResumeBuilder setResult={setResult} />} />
        <Route path="/resume" element={<Resume result={result} />} />
        <Route path="/analysis" element={<ResumeAnalyse />} />

      </Route>
    )
  );
  return (
    <div className=" text-white bg-black">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

const Root = () => {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <>
      <Navbar setDarkMode={setDarkMode} darkMode={darkMode} />
      <div>
        <Outlet />
      </div>
    </>
  );
};

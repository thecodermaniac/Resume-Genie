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

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<Home />} />
        <Route path="/ask-me" element={<AskMe />} />
      </Route>
    )
  );
  return (
    <div className=" text-black">
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

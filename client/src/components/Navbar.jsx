import { BsFillMoonStarsFill, BsFillSunFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import { useState } from "react";
import { VscListFlat, VscChromeClose } from "react-icons/vsc";

export default function Navbar(props) {
  const [showmobileNav, setShow] = useState(false);
  const toggleExpanded = () => {
    setShow((current) => !current);
    setToggleHamberger(!toggleHamburger);
  };
  const [toggleHamburger, setToggleHamberger] = useState(true);
  return (
    // For Sticky, set the classes: sticky, top-0 left-0
    <>
      <nav className="sticky w-full top-0 left-0 transition-all duration-1000 ease-in-out mb-3 flex justify-around z-20 backdrop-blur-lg  py-5 md:py-5 bg-transparent">
        <Link
          to="/"
          className={`text-xl md:text-xl lg:text-xl font-semibold ${
            props.darkMode ? "text-teal-500" : "text-teal-600"
          } flex items-center`}
        >
          <img src={logo} alt="" className="w-4 mr-10" />
          Resume Genie
        </Link>
        <ul className="hidden md:flex items-center">
          <li>
            <Link
              to="/analysis"
              className={` hover:text-teal-300 text-[0.8rem] md:text-base ${
                props.darkMode ? "text-white" : "text-black"
              } px-4 py-2 border-none rounded-md ml-4 md:ml-8`}
            >
              Analysis
            </Link>
          </li>
          <li>
            {/* <a
            href="/myCV.pdf"
            target="_blank"
            className=" text-[0.8rem] md:text-base bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-4 py-2 border-none rounded-md ml-4 md:ml-8"
          >
            Resume
          </a> */}
            <Link
              to="/ask-me"
              className={`hover:text-teal-300 text-[0.8rem] md:text-base ${
                props.darkMode ? "text-white" : "text-black"
              } px-4 py-2 border-none rounded-md ml-4 md:ml-8`}
            >
              Ask Me
            </Link>
          </li>
          <li>
            <Link
              to={"/resume-builder"}
              className={`hover:text-teal-300 text-[0.8rem] md:text-base ${
                props.darkMode ? "text-white" : "text-black"
              } px-4 py-2 border-none rounded-md ml-4 md:ml-8`}
            >
              Resume Builder
            </Link>
          </li>
          <li className=" ml-4 md:ml-8 ">
            {props.darkMode ? (
              <BsFillSunFill
                onClick={() => {
                  props.setDarkMode(!props.darkMode);
                }}
                className={` cursor-pointer text-2xl  text-white hover:text-teal-500`}
              />
            ) : (
              <BsFillMoonStarsFill
                onClick={() => {
                  props.setDarkMode(!props.darkMode);
                }}
                className={`cursor-pointer ${
                  props.darkMode ? "text-white" : "text-black"
                } text-xl hover:text-teal-500`}
              />
            )}
          </li>
        </ul>
        {/* <div></div> */}
        {toggleHamburger ? (
          <VscListFlat
            data-collapse-toggle="navbar-default"
            className="flex md:hidden text-white text-3xl"
            aria-controls="navbar-default"
            aria-expanded="false"
            onClick={toggleExpanded}
          />
        ) : (
          <VscChromeClose
            data-collapse-toggle="navbar-default"
            className="flex md:hidden text-white text-3xl"
            aria-controls="navbar-default"
            aria-expanded="false"
            onClick={toggleExpanded}
          />
        )}
      </nav>
      {/* mobile nav start */}
      <div
        className={`${
          showmobileNav ? "block" : "hidden"
        } absolute z-50   h-full w-screen`}
        id="navbar-default"
      >
        <ul class="flex flex-col p-4 mt-4 h-screen rounded-lg  bg-gray-900">
          <li>
            <Link
              to={"/analysis"}
              class="block py-2 pl-3 pr-4 mb-5 text-gray-400 rounded md:bg-transparent md:p-0 "
              onClick={toggleExpanded}
            >
              Analysis
            </Link>
          </li>
          <li>
            <Link
              to={"/ask-me"}
              class="block py-2 pl-3 pr-4 mb-5 text-gray-400 rounded md:bg-transparent md:p-0 "
              onClick={toggleExpanded}
            >
              Ask Me
            </Link>
          </li>
          <li>
            <Link
              to={"/resume-builder"}
              class="block py-2 pl-3 pr-4 mb-5 text-gray-400 rounded md:bg-transparent md:p-0 "
              onClick={toggleExpanded}
            >
              Resume Builder
            </Link>
          </li>

          {/* <Link
            to={"/signin"}
            // className="  flex items-center text-[0.8rem] md:text-base text-teal-600 bg-teal-100 px-4 py-2 border-none rounded-md ml-4 md:ml-8"
            className="block py-2 pl-3 pr-4 mb-5 rounded  bg-teal-100 text-teal-600"
            onClick={toggleExpanded}
          >
            SignUp
          </Link> */}
        </ul>
      </div>
      {/* mobile nav end */}
    </>
  );
}

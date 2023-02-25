import { BsFillMoonStarsFill, BsFillSunFill } from "react-icons/bs";
import { Link } from "react-router-dom";
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
      <nav
        className={` items-center font-semibold text-black py-4 md:py-8 transition-all duration-1000 mb-3 flex justify-around sticky w-full top-0 left-0 z-20 backdrop-blur-sm `}
      >
        <h1 className={`text-xl md:text-xl lg:text-xl text-teal-600`}>
          Resume Genie
        </h1>
        <ul className="hidden md:flex items-center">
          <li>
            <Link
              to="/analysis"
              className=" text-[0.8rem] md:text-base text-white px-4 py-2 border-none rounded-md ml-4 md:ml-8"
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
              className=" text-[0.8rem] md:text-base text-white px-4 py-2 border-none rounded-md ml-4 md:ml-8"
            >
              Ask Me
            </Link>
          </li>
          <li>
            <Link
              to={"/resume-builder"}
              className=" text-[0.8rem] md:text-base text-white px-4 py-2 border-none rounded-md ml-4 md:ml-8"
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
                className=" cursor-pointer text-2xl  text-white hover:text-teal-500"
              />
            ) : (
              <BsFillMoonStarsFill
                onClick={() => {
                  props.setDarkMode(!props.darkMode);
                }}
                className=" cursor-pointer text-white text-xl hover:text-teal-500"
              />
            )}
          </li>
        </ul>
        <div>
          <Link
            to={"/resume-builder"}
            className=" hidden md:flex items-center text-[0.8rem] md:text-base text-teal-600 bg-teal-100 px-4 py-2 border-none rounded-md ml-4 md:ml-8"
          >
            SignUp
          </Link>
        </div>
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
            <Link to={"/blog"}>
              <a
                class="block py-2 pl-3 pr-4 mb-5 text-gray-400 rounded md:bg-transparent md:p-0 "
                aria-current="page"
              >
                Analysis
              </a>
            </Link>
          </li>
          <li>
            <a
              href="#"
              className="block py-2 pl-3 pr-4 mb-5 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
            >
              Ask Me
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block py-2 pl-3 pr-4 mb-5 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
            >
              Resume Builder
            </a>
          </li>

          <Link
            to={"/resume-builder"}
            // className="  flex items-center text-[0.8rem] md:text-base text-teal-600 bg-teal-100 px-4 py-2 border-none rounded-md ml-4 md:ml-8"
            className="block py-2 pl-3 pr-4 mb-5 rounded  bg-teal-100 text-teal-600"
          >
            SignUp
          </Link>
        </ul>
      </div>
      {/* mobile nav end */}
    </>
  );
}

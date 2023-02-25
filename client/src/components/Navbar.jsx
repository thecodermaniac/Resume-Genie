import { BsFillMoonStarsFill, BsFillSunFill } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function Navbar(props) {
  return (
    // For Sticky, set the classes: sticky, top-0 left-0
    <nav
      className={` items-center font-semibold text-black py-8 md:py-8 transition-all duration-1000 mb-3 flex justify-around sticky w-full top-0 left-0 z-20 backdrop-blur-sm `}
    >
      <h1 className={`text-sm md:text-xl lg:text-xl dark:text-teal-600 `}>
        Resume Genie
      </h1>
      <ul className=" flex items-center">
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
          className="  flex items-center text-[0.8rem] md:text-base text-teal-600 bg-teal-100 px-4 py-2 border-none rounded-md ml-4 md:ml-8"
        >
          SignUp
        </Link>
      </div>
    </nav>
  );
}

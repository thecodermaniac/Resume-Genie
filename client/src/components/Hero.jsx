import { useState, useEffect } from "react";

import heroImg from "../images/hero.png";
import genie from "../images/genie.png";
import GenieSVG from "../components/GenieSVG";
import Ellpise from "../images/ellipse.png";
import "../components/GenieSVG.css";
import { AiFillCaretDown } from "react-icons/ai";
import { Link, scroller } from "react-scroll";

const Hero = (props) => {
  const handleClick = () => {
    const height = window.innerHeight;
    const offset = height;
    const duration = 3000;
    const delay = 0;
    const smooth = "easeInOutQuart";

    const options = {
      offset,
      duration,
      delay,
      smooth,
    };

    scroller.scrollTo("myScrollToElement", options);
  };

  const [fix, setFix] = useState(false);
  const setFixed = () => {
    if (window.scrollY >= 30) {
      setFix(true);
      console.log(window.scrollY);
    } else setFix(false);
  };
  useEffect(() => {
    window.addEventListener("scroll", setFixed);
  });

  return (
    <>
      <div className=" w-screen absolute bottom-0 flex flex-col items-center justify-center">
        {/* <img
          src={Ellpise}
          alt=""
        //   className=" hidden md:flex absolute bottom-0 w-[100vw]"
        /> */}
        <div className=" genie">
          <div className=" flex font-bold items-center relative justify-center -translate-y-5 cursor-pointer">
            <button
              onClick={handleClick}
              className={` items-center justify-center  transition-all duration-1000 text-teal-500 ${
                fix ? "hidden" : "flex"
              }`}
            >
              <h2>Scroll Down</h2>
              <AiFillCaretDown />
            </button>
          </div>
        </div>

        {/* <p>And let AI replace your jobs!</p> */}
      </div>
      <div className="flex mx-4 md:mx-32  justify-between items-center flex-col md:flex-row h-[85vh]">
        <aside className=" flex-col justify-center text-center md:text-left items-center md:items-start flex">
          <h1 className=" mt-10 text-5xl md:text-8xl mb-5 font-semibold text-teal-500">
            <span
              className={` mb-5 text-3xl font-medium ${
                props.darkMode ? "text-white" : "text-black"
              }`}
            >
              Create or Edit
            </span>
            <br />
            Your Perfect Resume
          </h1>
          <p className=" text-sm w-2/3">
            We use AI tools to help you build and fix your resume to perfection,
            so that you can crack that dream job of yours!
          </p>
        </aside>
        <aside className=" hidden md:flex">
          {/* <img src={genie} alt="" className=" max-h-[70vh] hidden md:flex" /> */}
          <GenieSVG className="  md:max-h-[70vh] hidden md:flex" />
        </aside>
        <aside className=" flex md:hidden mt-10">
          <img
            src={heroImg}
            alt=""
            className=" max-h-[70vh] genie2 -translate-y-32"
          />
          {/* <GenieSVG className="  md:max-h-[70vh] hidden md:flex" /> */}
        </aside>
      </div>
      <div name="myScrollToElement" className="" />
      <Link to="myScrollToElement" smooth={true} className=" text-white">
        {/* <button onClick={handleClick}>Smooth Scroll</button> */}
      </Link>
    </>
  );
};

export default Hero;

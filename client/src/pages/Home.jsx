import React from "react";
import heroImg from "../images/hero.png";
import genie from "../images/genie.png";
import GenieSVG from "../components/GenieSVG";

const Home = () => {
  return (
    <div className="flex mx-4 md:mx-32  justify-between items-center flex-col md:flex-row h-[]">
      <aside className=" flex-col justify-center text-center md:text-left items-center md:items-start flex">
        <h1 className=" mt-10 text-5xl md:text-8xl mb-10 font-semibold">
          <span className=" mb-5 text-3xl font-medium">Create or Edit</span>
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
        <img src={heroImg} alt="" className=" max-h-[70vh] " />
        {/* <GenieSVG className="  md:max-h-[70vh] hidden md:flex" /> */}
      </aside>
    </div>
  );
};

export default Home;

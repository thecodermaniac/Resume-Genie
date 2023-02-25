import React from "react";
import heroImg from "../images/hero.png";
import genie from "../images/genie.png";

const Home = () => {
  return (
    <div className="flex mx-32  justify-between flex-col md:flex-row">
      <aside className=" flex-col  items-start flex">
        <h1 className=" mt-10 text-3xl mb-10">
          <span className=" text-5xl font-semibold">Create or Edit</span>
          <br />
          Your Perfect Resume
        </h1>
        <p>
          We use AI tools to help you build and fix your resume to perfection,
          so that you can crack that dream job of yours!
        </p>
      </aside>
      <aside>
        <img src={genie} alt="" className=" max-h-[80vh] hidden md:flex" />
      </aside>
    </div>
  );
};

export default Home;

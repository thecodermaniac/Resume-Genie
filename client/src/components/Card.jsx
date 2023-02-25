import React from "react";
import { Link } from "react-router-dom";
import cardImg from "../images/card1.jpg";

const Card = () => {
  return (
    // <section className=" mt-20 md:mt-32 mx-4 md:mx-32">
    //   <h1 className=" text-3xl font-semibold ">Our Services</h1>

    //   <div className="flex flex-col gap-10 py-10 border-2 border-red-500 lg:flex-row lg:flex-wrap">
    //     <div className="  relative md:max-w-[100%] maxh-[70vh] flex-1 px-10 border-2 border-red-500 py-4 rounded-xl  bg-gradient-to-b from-black to-[#1c2027]">
    //       <img src={cardImg} alt="" className=" h-80 w-full object-cover" />
    //       <h1 className=" text-xl font-semibold">Analysis</h1>
    //     </div>
    //     <div className="  relative md:max-w-[100%] maxh-[70vh] flex-1 px-10 border-2 border-red-500 py-4 rounded-xl  bg-gradient-to-b from-black to-[#1c2027]">
    //       <img src={cardImg} alt="" className=" h-80 w-full object-cover" />
    //       <h1 className=" text-xl font-semibold">Ask Me</h1>
    //     </div>
    //     <div className="  relative md:max-w-[100%] maxh-[70vh] flex-1 px-10 border-2 border-red-500 py-4 rounded-xl  bg-gradient-to-b from-black to-[#1c2027]">
    //       <img src={cardImg} alt="" className=" h-80 w-full object-cover" />
    //       <h1 className=" text-xl font-semibold">Resume Builder</h1>
    //     </div>
    //   </div>
    // </section>
    <section className="  mt-20 md:mt-32 mx-4 md:mx-32">
      <div>
        <h3 className=" text-3xl py-1 dark:text-teal-600">Skills</h3>
        <p className=" text-md py-2 leading-8 text-gray-800 dark:text-white">
          I've always been a{" "}
          <span className=" text-teal-500">tech enthusiast</span>, I have been
          learning{" "}
          <span className=" text-teal-500">MERN Stack Development</span> as my
          fortie for quite some time along with DSA. I'm quite confident,
          naturally curious, and perpetually working on improving my skills, one
          problem at a time.
        </p>
      </div>
      <div className=" lg:flex gap-10">
        {/* Cards Start*/}
        <div className="shadow-lg p-5 rounded-xl my-10 bg-teal-50 dark:bg-gray-900">
          <Link>
            <img src={cardImg} alt="" className=" mx-auto h-96 object-cover" />
            <h3 className=" text-2xl font-medium  dark:text-teal-600">
              Analysis
            </h3>
            <p className=" py-2 dark:text-white">
              AI-powered resume analysis and feedback to help you stand out in
              your job search.
            </p>
          </Link>
        </div>
        {/* Cards End */}
        {/* Cards Start*/}
        <div className="shadow-lg p-5 rounded-xl my-10 bg-teal-50 dark:bg-gray-900">
          <Link>
            <img src={cardImg} alt="" className=" mx-auto h-96 object-cover" />
            <h3 className=" text-2xl font-medium  dark:text-teal-600">
              Ask Me (Chat)
            </h3>
            <p className=" py-2 dark:text-white">
              Get Instant AI-Powered Answers to Your Questions with Our Chatbot
            </p>
          </Link>
        </div>
        {/* Cards End */}
        {/* Cards Start*/}
        <div className="shadow-lg p-5 rounded-xl my-10 bg-teal-50 dark:bg-gray-900">
          <Link>
            <img src={cardImg} alt="" className=" mx-auto h-96 object-cover" />
            <h3 className=" text-2xl font-medium  dark:text-teal-600">
              Resume Builder
            </h3>
            <p className=" py-2 dark:text-white">
              Effortlessly Create a Personalized Resume with Our AI Resume
              Builder
            </p>
          </Link>
        </div>
        {/* Cards End */}
      </div>
    </section>
  );
};

export default Card;

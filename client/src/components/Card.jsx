import React from "react";
import { Link } from "react-router-dom";
import cardImg from "../images/card1.jpeg";
import cardImg2 from "../images/card2.webp";
import cardImg3 from "../images/card3.jpeg";

const Card = (props) => {
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
        <h3
          className={`text-3xl py-1 font-semibold ${
            props.darkMode ? "text-teal-600" : "text-black"
          }`}
        >
          Features
        </h3>
        <p
          className={`text-md py-2 leading-8   ${
            props.darkMode ? " text-white" : "text-black"
          }`}
        >
          Our cutting-edge website uses{" "}
          <span className=" text-teal-500">OpenAI's API</span> to offer
          AI-powered feedback on your resume, helping you showcase your skills
          and land your dream job. Plus, our chatbot API powered by OpenAI lets
          you ask any question you can imagine and receive accurate, intelligent
          answers in real-time.
        </p>
      </div>
      <div className=" lg:flex gap-10">
        {/* Cards Start*/}
        <div
          className={`shadow-lg p-5 rounded-xl my-10 ${
            props.darkMode ? "bg-gray-900" : "bg-teal-100"
          }`}
        >
          <Link to="/analysis">
            <img src={cardImg} alt="" className=" mx-auto h-96 object-cover" />
            <h3
              className={` text-2xl font-medium  ${
                props.darkMode ? "text-teal-600" : "text-black"
              } `}
            >
              Analysis
            </h3>
            <p
              className={` py-2  ${
                props.darkMode ? "text-white" : "text-black"
              } `}
            >
              AI-powered resume analysis and feedback to help you stand out in
              your job search.
            </p>
          </Link>
        </div>
        {/* Cards End */}

        {/* Cards Start*/}
        <div
          className={`shadow-lg p-5 rounded-xl my-10 ${
            props.darkMode ? "bg-gray-900" : "bg-teal-100"
          }`}
        >
          <Link to={'/ask-me'}>
            <img src={cardImg2} alt="" className=" mx-auto h-96 object-cover" />
            <h3
              className={` text-2xl font-medium  ${
                props.darkMode ? "text-teal-600" : "text-black"
              } `}
            >
              Ask Me
            </h3>
            <p
              className={` py-2  ${
                props.darkMode ? "text-white" : "text-black"
              } `}
            >
              Experience the Power of AI with Our Chatbot - Get Instant,
              Accurate Answers to Your Questions
            </p>
          </Link>
        </div>
        {/* Cards End */}

        {/* Cards Start*/}
        <div
          className={`shadow-lg p-5 rounded-xl my-10 ${
            props.darkMode ? "bg-gray-900" : "bg-teal-100"
          }`}
        >
          <Link to={'/resume-builder'}>
            <img src={cardImg3} alt="" className=" mx-auto h-96 object-cover" />
            <h3
              className={` text-2xl font-medium  ${
                props.darkMode ? "text-teal-600" : "text-black"
              } `}
            >
              Resume Builder
            </h3>
            <p
              className={` py-2  ${
                props.darkMode ? "text-white" : "text-black"
              } `}
            >
              Create Your Dream Resume with Our Intelligent AI-Powered Resume
              Builder - Get Started Now!
            </p>
          </Link>
        </div>
        {/* Cards End */}
      </div>
    </section>
  );
};

export default Card;

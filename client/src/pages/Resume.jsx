import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const Resume = ({ result, darkMode }) => {
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `${result.fullName} Resume`,
    onAfterPrint: () => alert("Print Successful!"),
  });

  // if (JSON.stringify(result) === "{}") {
  // 	return <ErrorPage />;
  // }

  const replaceWithBr = (string) => {
    return string.replace(/\n/g, "<br />");
  };
  return (
    <div
      className={`flex flex-col items-start mx-20 ${
        darkMode ? "text-white" : "text-black"
      }`}
    >
      <h1
        className={` text-2xl font-semibold  mb-10${
          darkMode ? "text-teal-500" : "text-black"
        } `}
      >
        Your Resume:
      </h1>
      <button
        onClick={handlePrint}
        className={` mt-10 ${
          darkMode
            ? "border-b-2 border-teal-500 text-teal-500"
            : "border-b-2 border-black"
        }`}
      >
        Print Page
      </button>
      <main
        className={`flex flex-col items-center ${
          darkMode ? "text-white" : "text-black"
        }`}
        ref={componentRef}
      >
        <header
          className={`header  ${darkMode ? "bg-teal-700" : "bg-teal-200"}`}
        >
          <div>
            <h1 className=" font-semibold text-2xl">{result.fullName}</h1>
            <p className="resumeTitle headerTitle">
              {result.currentPosition} ({result.currentTechnologies})
            </p>
            <p className="resumeTitle">
              {result.currentLength}year(s) work experience
            </p>
          </div>
          <div>
            <img
              src={result.image_url}
              alt={result.fullName}
              className="resumeImage"
            />
          </div>
        </header>
        <div className={`resumeBody bg-teal-50`}>
          <div>
            <h2 className={`mb-0 font-semibold text-2xl text-black`}>
              PROFILE SUMMARY
            </h2>
            <p
              dangerouslySetInnerHTML={{
                __html: replaceWithBr(result.objective),
              }}
              className="resumeBodyContent text-black"
            />
          </div>
          <div>
            <h2 className=" font-semibold text-2xl mb-2 text-black">
              WORK HISTORY
            </h2>
            {result.workHistory.map((work) => (
              <p className="mb-10 text-black" key={work.name}>
                <span style={{ fontWeight: "bold" }} className=" text-black">
                  {work.name}
                </span>{" "}
                - {work.position}
              </p>
            ))}
          </div>
          <div>
            <h2 className=" font-semibold text-2xl text-black">JOB PROFILE</h2>
            <p
              dangerouslySetInnerHTML={{
                __html: replaceWithBr(result.jobResponsibilities),
              }}
              className=" mb-10 text-black"
            />
          </div>
          <div>
            <h2 className=" text-black text-2xl font-semibold">
              JOB RESPONSIBILITIES
            </h2>
            <p
              dangerouslySetInnerHTML={{
                __html: replaceWithBr(result.keypoints),
              }}
              className=" text-black"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Resume;

import { useRef, useState, useEffect } from "react";
import { IoSend } from "react-icons/io5";
import axios from "axios";
import "./AskMe.css";

const YOU = "you";
const AI = "ai";

const AskMe = () => {
  const chatWindowRef = useRef(null);

  const inputRef = useRef();

  const [qna, setQna] = useState([]);
  const [loading, setLoading] = useState(false);

  const updateQNA = (from, value) => {
    setQna((qna) => [...qna, { from, value }]);
  };

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [qna]);

  const handleSend = () => {
    const question = inputRef.current.value;
    updateQNA(YOU, question);

    setLoading(true);

    axios
      .post("http://localhost:3001/chat", {
        question,
      })
      .then((response) => {
        updateQNA(AI, response.data.answer);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const renderContent = (qna) => {
    const value = qna.value;

    if (Array.isArray(value)) {
      return value.map((v) => <p>{v}</p>);
    }

    return <p>{value}</p>;
  };

  return (
    <main className=" flex flex-col justify-between min-h-[85vh] ">
      <div className="p-1 flex flex-col items-center ">
        {qna.map((qna) => {
          if (qna.from === YOU) {
            return (
              <div className="bg-teal-100 self-end mx-20  flex rounded-l-lg rounded-t-lg p-4 mt-6 w-auto">
                <img
                  src="https://cdn-icons-png.flaticon.com"
                  alt=""
                  className="avatar"
                />
                <div className=" text">{renderContent(qna)}</div>
              </div>
            );
          }
          return (
            <div
              ref={chatWindowRef}
              className="bg-gray-200 self-start mx-20  flex rounded-r-lg rounded-t-lg p-4 mt-6  w-auto"
            >
              <img
                src="https://cdn-icons-png.flaticon.com"
                alt=""
                className="avatar"
              />
              <div className=" text">{renderContent(qna)}</div>
            </div>
          );
        })}
        {loading && (
          <div className="bg-gradient-to-l from-teal-300 to-cyan-300 self-start mx-20  flex rounded-r-lg rounded-t-lg p-4 mt-6  w-auto text-black">
            <img
              src="https://cdn-icons-png.flaticon.com"
              alt=""
              className="avatar"
            />
            <div>Typing...</div>
          </div>
        )}
      </div>

      <div className="flex sticky bottom-0 mx-10 md:mx-20  items-center  justify-center ">
        <div className=" flex w-full items-center justify-center">
          <input
            type="text"
            ref={inputRef}
            className=" w-full"
            placeholder="Try Something"
          />
          <button disabled={loading} className=" " onClick={handleSend}>
            <IoSend className="  text-2xl ml-4 text-teal-300" />
          </button>
        </div>
      </div>
    </main>
  );
};

export default AskMe;

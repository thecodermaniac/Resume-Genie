import { useRef, useState } from "react";
import axios from "axios";
// import "./App.css";

const YOU = "you";
const AI = "ai";

const AskMe = () => {
  const inputRef = useRef();

  const [qna, setQna] = useState([]);
  const [loading, setLoading] = useState(false);

  const updateQNA = (from, value) => {
    setQna((qna) => [...qna, { from, value }]);
  };

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
    <main className=" container">
      <div className="chats">
        {qna.map((qna) => {
          if (qna.from === YOU) {
            return (
              <div className="send chat">
                <img
                  src="https://cdn-icons-png.flaticon.com"
                  alt=""
                  className="avatar"
                />
                <div>{renderContent(qna)}</div>
              </div>
            );
          }
          return (
            <div className="recieve chat">
              <img
                src="https://cdn-icons-png.flaticon.com"
                alt=""
                className="avatar"
              />
              <div>{renderContent(qna)}</div>
            </div>
          );
        })}
        {loading && (
          <div className="recieve chat">
            <img
              src="https://cdn-icons-png.flaticon.com"
              alt=""
              className="avatar"
            />
            <div>Typing...</div>
          </div>
        )}
      </div>

      <div className="chat-input">
        <input
          type="text"
          ref={inputRef}
          className="form-control col"
          placeholder="Try Something"
        />
        <button
          disabled={loading}
          className="btn btn-success"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </main>
  );
};

export default AskMe;

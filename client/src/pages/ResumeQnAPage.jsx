import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, Upload, RefreshCcw } from "lucide-react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

const ResumeQnAPage = () => {
  const [resumeText, setResumeText] = useState("");
  const [pdfURL, setPdfURL] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [numPages, setNumPages] = useState(null);

  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);

  /* Auto Scroll */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const sanitizeText = (text) => {
  if (!text) return "";
  return text.replace(/<[^>]*>?/gm, "");
};

  /* ------------------------------
  Upload Resume
  ------------------------------ */
  const handleResumeUpload = async (file) => {
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const response = await fetch(`${API_URL}/resume/parse`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      setResumeText(data.resumeText);

      // Clean previous URL
      if (pdfURL) {
        URL.revokeObjectURL(pdfURL);
      }

      const localURL = URL.createObjectURL(file);
      setPdfURL(localURL);

      setMessages([
        {
          role: "ai",
          content:
            "Resume uploaded successfully. You can now ask questions about it.",
        },
      ]);

    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);

      // 🔥 IMPORTANT FIX
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  /* ------------------------------
  Send Question
  ------------------------------ */
  const handleSend = async () => {
    if (!input.trim() || !resumeText) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/resume/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resumeText,
          question: input,
        }),
      });

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        { role: "ai", content: data.answer },
      ]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }

  };

  /* Replace Resume */
  const handleReplaceResume = () => {
    if (pdfURL) {
      URL.revokeObjectURL(pdfURL);
    }

    setResumeText("");
    setPdfURL(null);
    setMessages([]);

    // 🔥 Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      fileInputRef.current.click();
    }
  };

  return (
    <div className="flex-1 flex gap-6 px-6 pb-6 max-w-7xl mx-auto w-full">

      {/* LEFT PANEL */}
      <div className="w-5/12 bg-white rounded-3xl shadow-sm border border-gray-200 flex flex-col">

        <div className="h-12 border-b border-gray-100 flex items-center px-4 justify-between bg-gray-50/50">
          <span className="text-xs font-semibold text-gray-400">
            {resumeText ? "RESUME.PDF" : "UPLOAD RESUME"}
          </span>

          {resumeText && (
            <button
              onClick={handleReplaceResume}
              className="flex items-center gap-1 text-xs text-emerald-600 font-medium"
            >
              <RefreshCcw size={14} />
              Replace
            </button>
          )}
        </div>

        <div className="flex-1 max-h-full overflow-y-auto bg-gray-100/50 relative">

          {/* Upload State */}
          {!resumeText && !uploading && (
            <div className="h-full flex items-center justify-center">
              <button
                onClick={() => {
                  if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                    fileInputRef.current.click();
                  }
                }}
                className="flex items-center gap-2 px-6 py-3 bg-emerald-500 text-white rounded-xl shadow hover:bg-emerald-600 transition"
              >
                <Upload size={18} />
                Upload Resume
              </button>
            </div>
          )}

          {/* Upload Loading Animation */}
          {uploading && (
            <div className="h-full flex flex-col items-center justify-center gap-4">
              <div className="w-10 h-10 border-4 border-emerald-200 border-t-emerald-500 rounded-full animate-spin"></div>
              <p className="text-sm text-gray-500">Uploading and parsing...</p>
            </div>
          )}

          {/* Render Actual PDF */}
          {resumeText && pdfURL && !uploading && (
            <div className="bg-white p-4 rounded-xl">
              <Document
                file={pdfURL}
                onLoadSuccess={onDocumentLoadSuccess}
                loading={
                  <div className="flex justify-center p-6">
                    <div className="w-8 h-8 border-4 border-emerald-200 border-t-emerald-500 rounded-full animate-spin"></div>
                  </div>
                }
              >
                {Array.from(new Array(numPages), (el, index) => (
                  <Page
                    key={`page_${index + 1}`}
                    pageNumber={index + 1}
                    width={450}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                    className="mb-6 shadow-md"
                  />
                ))}
              </Document>
            </div>
          )}

          <input
            type="file"
            accept="application/pdf"
            ref={fileInputRef}
            className="hidden"
            onChange={(e) => handleResumeUpload(e.target.files[0])}
          />
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="w-7/12 bg-white rounded-3xl shadow-sm border border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-800">Resume Q&A</h2>
          <p className="text-sm text-gray-400">
            Ask me anything about your document.
          </p>
        </div>

        <div className="flex-1 p-6 overflow-y-auto space-y-6">
          {messages.map((msg, index) =>
            msg.role === "ai" ? (
              <div key={index} className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                  <MessageSquare size={16} className="text-emerald-600" />
                </div>
                <div className="bg-gray-50 p-4 rounded-2xl rounded-tl-none max-w-md text-gray-700 text-sm leading-relaxed">
                  {sanitizeText(msg.content)
                    .split("\n")
                    .filter(Boolean)
                    .map((line, i) => (
                      <p key={i} className="mb-2">
                        {line}
                      </p>
                    ))}
                </div>
              </div>
            ) : (
              <div key={index} className="flex gap-4 flex-row-reverse">
                <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center flex-shrink-0 text-white text-xs">
                  You
                </div>
                <div className="bg-emerald-50 p-4 rounded-2xl rounded-tr-none max-w-md text-emerald-900 text-sm leading-relaxed">
                  {msg.content}
                </div>
              </div>
            )
          )}

          {loading && (
            <div className="text-sm text-gray-400">Thinking...</div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 m-4 mt-0 bg-gray-50 rounded-2xl border border-gray-100 flex items-center gap-3">
          <input
            type="text"
            placeholder={
              resumeText
                ? "Type a message..."
                : "Upload resume to start..."
            }
            value={input}
            disabled={!resumeText}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className={`bg-transparent flex-1 outline-none text-gray-700 placeholder-gray-400 ${!resumeText ? "opacity-50 cursor-not-allowed" : ""
              }`}
          />
          <button
            onClick={handleSend}
            disabled={!resumeText}
            className={`p-2 bg-white rounded-full shadow-sm ${resumeText
              ? "hover:shadow text-emerald-500"
              : "text-gray-300 cursor-not-allowed"
              }`}
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>

  );
};

export default ResumeQnAPage;
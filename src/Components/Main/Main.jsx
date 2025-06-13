import React, { useContext, useEffect, useState } from "react";
import "./Main.css";
import { assets } from "../../assets/assets.js";
import { Context } from "../../context/Context.jsx";
import { PacmanLoader } from "react-spinners";

function Main() {
  const [loading1, setLoading] = useState(false);

  // Context values
  const {
    onSet,
    recentPrompt,
    showResults,
    loading,
    resultData,
    input,
    setInput,
  } = useContext(Context);

  // Trigger `onSet` when Enter key is pressed
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        onSet(); // Call the function when Enter is pressed
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onSet]); // Dependencies to ensure correct binding

  // Loader effect for demonstration purposes
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => clearTimeout(timer); // Cleanup the timeout
  }, []);

  return (
    <div className="main">
      <div className="nav">
        <p>Mentory AI</p>
        <img src={assets.user_icon} alt="User Icon" className="user-image" />
      </div>
      <div className="main-container">
        {!showResults ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, there</span>
              </p>
              <p>How can I help you today?</p>
            </div>
            <div className="cards">
              <div className="card">
                <p>Give me the best roadmap to learn Node.js</p>
                <img src={assets.compass_icon} alt="Compass Icon" />
              </div>
              <div className="card">
                <p>Suggest the best project ideas for my final project</p>
                <img src={assets.bulb_icon} alt="Bulb Icon" />
              </div>
              <div className="card">
                <p>How can I add live chat integration to my live website?</p>
                <img src={assets.message_icon} alt="Message Icon" />
              </div>
              <div className="card">
                <p>Give me the Python code for create LLM</p>
                <img src={assets.code_icon} alt="Code Icon" />
              </div>
            </div>
          </>
        ) : (
          <div className="responseResult">
            <div className="resultTitle">
              <img src={assets.user_icon} alt="User Icon" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="Gemini Icon" />
              {loading ? (
                <div className="loader">
                  <PacmanLoader color="#1d65b6" size={18} />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="main-bottom">
        <div className="search">
          <input
            type="text"
            onChange={(e) => setInput(e.target.value)}
            value={input}
            placeholder="Ask from Mentory"
          />
          <div>
            <img src={assets.gallery_icon} alt="Gallery Icon" />
            <img src={assets.mic_icon} alt="Mic Icon" />
            <img
              onClick={() => onSet()}
              src={assets.send_icon}
              alt="Send Icon"
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
 
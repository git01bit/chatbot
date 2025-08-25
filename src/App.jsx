import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
library.add(fas, far, fab);

import "./assets/fonts/vazir/vazir.css";
import { useState } from "react";

function App() {
  const baseUrl = "https://text.pollinations.ai/";
  const [userMessage, setUserMessage] = useState({
    id: "",
    message: "",
  });
  const [messages, setMessages] = useState([]);

  // Read user input message
  function readUserMessage(e) {
    setUserMessage({
      id: "user",
      message: e.target.value,
    });
  }

  // Add user message to messages array and fetch AI answer
  function addMessages() {
    setMessages((m) => [...m, userMessage]);
    setUserMessage({
      id: "",
      message: "",
    });

    fetchAnswer();
  }

  // Fetch AI response from API and add it to messages array
  function fetchAnswer() {
    fetch(baseUrl + userMessage.message)
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        setMessages((m) => [...m, { id: "ai", message: data }]);
      });
  }

  return (
    <section className="mx-auto flex h-dvh max-w-3xl flex-col justify-between overflow-auto p-4 text-justify">
      <div className="flex flex-col gap-y-8 overflow-auto">
        {messages.map((message, index) =>
          message.id === "user" ? (
            <p
              key={index}
              className="ml-24 w-fit rounded-full bg-gray-100 px-8 py-2"
            >
              {message.message}
            </p>
          ) : (
            <p key={index} className="mr-24 self-end">
              {message.message}
            </p>
          ),
        )}
      </div>

      <div className="relative mt-4 rounded-2xl border border-gray-200 px-2 py-1">
        <textarea
          placeholder="سوال خود را مطرح کنید ..."
          className="field-sizing-content max-h-80 min-h-32 w-full resize-none p-6 text-justify outline-none"
          value={userMessage.message}
          onChange={readUserMessage}
        ></textarea>

        <button
          type="button"
          className="absolute bottom-6 left-6 h-8 w-8 cursor-pointer rounded-full bg-gray-200 text-white transition-colors duration-300 ease-in-out hover:bg-black"
          onClick={addMessages}
        >
          <FontAwesomeIcon icon="fa-solid fa-arrow-up" />
        </button>
      </div>
    </section>
  );
}

export default App;

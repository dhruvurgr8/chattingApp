// Chat.js

import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "./Chat.css";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "./signin/Config.js";

const socket = io("http://localhost:5000");

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [connectedUser, setConnectedUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
        socket.on("get-message", (message) => {
          setMessages((prevMessages) => [...prevMessages, message]);
        });

        // Handle the "connected-to-random-user" event
        socket.on("connected-to-random-user", (randomUser) => {
          console.log(`Connected to random user:`, randomUser);
          setConnectedUser(randomUser);
        });
      }
    });

    return () => {
      unsubscribe();
      socket.off("get-message");
      socket.off("connected-to-random-user");
    };
  }, []);

  const handleClick = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Sign In Error:", error.message);
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();

    if (!currentUser) {
      alert("Please sign in to send messages.");
      return;
    }

    const data = {
      text: inputMessage,
      user: {
        name: currentUser.displayName,
        photoURL: currentUser.photoURL,
      },
    };

    if (inputMessage.trim() !== "") {
      socket.emit("send-data", data);
    } else {
      alert("Write a message");
    }

    setInputMessage("");
  };

  return (
    <div className="container">
      {currentUser ? (
        <>
          <div className="user-info">
            {currentUser.photoURL && (
              <img
                src={currentUser.photoURL}
                alt="User Profile"
                className="profile-pic"
              />
            )}
            <p>Welcome, {currentUser.displayName}!</p>
          </div>
          {connectedUser ? (
            <div>
              <p>Connected to: {connectedUser.name}</p>
            </div>
          ) : (
            <div>
              <button onClick={() => socket.emit("connect-to-random-user")}>
                Connect to Random User
              </button>
            </div>
          )}
          <div className="showMessages">
            <div className="messageDiv">
              {messages.map((data, index) => (
                <div
                  key={`${data.user.name}-${index}`}
                  className={
                    data.user.name === currentUser.displayName
                      ? "userMessage"
                      : "otherUserMessage"
                  }
                >
                  <div>
                    {data.user.photoURL && (
                      <img
                        src={data.user.photoURL}
                        alt="User Profile"
                        className="profile-pic"
                      />
                    )}
                    <strong>{data.user.name}:</strong>
                    <span>{data.text}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <form onSubmit={sendMessage}>
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
              />
              <button type="submit">Send</button>
            </form>
          </div>
        </>
      ) : (
        <div className="sign-in-container">
          <p>Please sign in to start chatting.</p>
          <button onClick={handleClick}>Sign in with Google</button>
        </div>
      )}
    </div>
  );
};

export default Chat;

// This is the main code

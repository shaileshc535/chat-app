import React, { useState, useRef, useEffect } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";

const ChatroomPage = ({ match, socket }) => {
  const appointmentId = match.params.id;
  const [messages, setMessages] = useState([]);
  const [chatRoom, setChatroom] = useState([]);
  const messageRef = useRef();
  const [userId, setUserId] = useState("");

  const getChatroom = () => {
    axios
      .get(`http://localhost:8000/chatroom/get-chatroom/${match.params.id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("CC_Token"),
        },
      })
      .then((response) => {
        setChatroom(response.data);
      })
      .catch((err) => {
        setTimeout(getChatroom, 3000);
      });
  };

  const sendMessage = () => {
    if (socket) {
      socket.emit("chatroomMessage", {
        appointmentId,
        message: messageRef.current.value,
      });

      messageRef.current.value = "";
    }
  };

  React.useEffect(() => {
    const token = localStorage.getItem("CC_Token");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      console.log("payload", payload);
      setUserId(payload.id);
    }
    if (socket) {
      socket.on("newMessage", (message) => {
        const newMessages = [...messages, message];
        setMessages(newMessages);
      });
    }
  }, [messages]);

  useEffect(() => {
    getChatroom();

    if (socket) {
      socket.emit("joinRoom", {
        appointmentId,
      });
    }

    return () => {
      if (socket) {
        socket.emit("leaveRoom", {
          appointmentId,
        });
      }
    };
  }, []);

  return (
    <div className="chatroomPage">
      <div className="chatroomSection">
        <div className="cardHeader">
          {chatRoom.length > 0 ? <>{chatRoom[0].name}</> : <>Chatroom Name</>}
        </div>
        <div className="chatroomContent">
          {messages.map((message, i) => (
            <div key={i} className="message">
              <span
                className={
                  userId === message.userId ? "ownMessage" : "otherMessage"
                }
              >
                {message.name}:
              </span>
              {message.message}
            </div>
          ))}
        </div>
        <div className="chatroomActions">
          <div>
            <input
              type="text"
              name="message"
              placeholder="Say something!"
              ref={messageRef}
            />
          </div>
          <div>
            <button className="join" onClick={sendMessage}>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(ChatroomPage);

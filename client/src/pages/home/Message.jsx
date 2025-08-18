import React from "react";
import { useSelector } from "react-redux";

const Message = ({ message }) => {

  const { selectedUser, userProfile } = useSelector((state) => state.user);
  const isMine = message.senderId === userProfile?._id;
  const avatar = isMine ? userProfile?.avatar : selectedUser?.avatar;
  const formattedTime = new Date(message.createdAt).toLocaleTimeString([], {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  const messageRef = React.useRef(null);
  React.useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
      <div
        ref={messageRef}
        className={`chat ${isMine ? "chat-end" : "chat-start"}`}
      >
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src={avatar}
            />
          </div>
        </div>
        <div className="chat-header">
          <time className="text-xs opacity-50">{formattedTime}</time>
        </div>
        <div className="chat-bubble">{message.message}</div>
      </div>
  );
};

export default Message;

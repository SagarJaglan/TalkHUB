import React, { useEffect, useRef } from "react";
import Message from "./Message";
import User from "./User";
import { useSelector, useDispatch } from "react-redux";
import { getMessageThunk } from "../../store/slice/message/message.thunk";
import SendMessage from "./SendMessage";

const MessageContainer = () => {
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((state) => state.user);
  const { messages } = useSelector((state) => state.message);
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    dispatch(getMessageThunk({ recieverId: selectedUser?._id }));
  }, [selectedUser]);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  },[messages]);




  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-base-200">
      {!selectedUser ? (
        <div className="w-full h-full flex flex-col justify-center items-center ">
          <div className="flex items-center justify-start h-14 p-4 ">
            <span className="text-4xl">
              Talk<span className="text-[#F89A28]">HUB</span>
            </span>
          </div>
          <div className="flex justify-items-center items-center">
            Please, select a user to start chat!
          </div>
        </div>
      ) : (
        <div className="w-full h-screen flex flex-col gap-2 p-5 bg-base-200">
          <div className=" bg-gray-500 p-1 rounded-[20px]">
            <User user={selectedUser} />
          </div>
          <div
            className="flex flex-col m-2 p-2 overflow-auto h-full"
            ref={messagesContainerRef}
          >
            {messages?.map((message) => (
              <Message key={message?._id} message={message} />
            ))}
          </div>
          <SendMessage />
        </div>
      )}
    </div>
  );
};

export default MessageContainer;

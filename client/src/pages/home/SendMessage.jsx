import React, { use } from "react";
import { IoMdSend } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { sendMessageThunk } from "../../store/slice/message/message.thunk";
import { useEffect } from "react";

const SendMessage = () => {
  const [message, setMessage] = React.useState("");
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((state) => state.user);

  const handleSendMessage = () => {
    dispatch(
      sendMessageThunk({
        receiverId: selectedUser?._id,
        message,
      })
    );
    setMessage("");
  };

  useEffect(() => {
    setMessage("");
  }, [selectedUser]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div>
      <div className="flex items-center gap-2 w-full  p-[1px]  bg-[#475569] rounded-3xl">
        <input
          type="text"
          placeholder="Enter message here..."
          className="input input-bordered w-full p-6 rounded-3xl focus:outline-none focus:ring-0 focus:border-gray-300"
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          value={message}
        />
        <button
          onClick={handleSendMessage}
          className="btn btn-circle btn-outline h-12 w-16 bg-base-100 hover:bg-base-200"
        >
          <IoMdSend className="text-2xl text-[#F89A28]" />
        </button>
      </div>
    </div>
  );
};

export default SendMessage;

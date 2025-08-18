import React from "react";
import UserSidebar from "./UserSidebar";
import MessageContainer from "./MessageContainer";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { initializeSocket } from "../../store/slice/socket/socket.slice";
import { setOnlineUsers } from "../../store/slice/socket/socket.slice";
import { setNewMessages } from "../../store/slice/message/message.slice";

const Home = () => {
  const { isAuthenticate, userProfile } = useSelector((state) => state.user);
  const { socket } = useSelector((state) => state.socket);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAuthenticate) {
      return;
    }
    dispatch(initializeSocket(userProfile?._id));
  }, [isAuthenticate]);

  useEffect(() => {
    if (!socket) return;

    const handleOnlineUsers = (onlineUsers) => {
      dispatch(setOnlineUsers(onlineUsers));
    };

    const handleNewMessage = (newMessage) => {
      dispatch(setNewMessages(newMessage));
    };

    // register listeners
    socket.on("onlineUsers", handleOnlineUsers);
    socket.on("newMessage", handleNewMessage);

    // cleanup (removes listeners, but does NOT close socket)
    return () => {
      socket.off("onlineUsers", handleOnlineUsers);
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket, dispatch]);

  return (
    <div className="flex h-screen w-yfull overflow-clip">
      <UserSidebar />
      <MessageContainer />
    </div>
  );
};

export default Home;

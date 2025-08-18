import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../../store/slice/user/user.slice";
import { getMessageThunk } from "../../store/slice/message/message.thunk";
import { resetMessages } from "../../store/slice/message/message.slice";

const User = ({ user }) => {
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((state) => state.user);
  const { onlineUsers } = useSelector((state) => state.socket);

  // Check if the user is online
  const isOnline = onlineUsers?.includes(user?._id);

  const handleClick = () => {
    // Dispatch the selected user to the store
    dispatch(setSelectedUser(user));
    dispatch(getMessageThunk({ recieverId: user._id }));
    dispatch(resetMessages());
  };
  return (
    <div
      onClick={handleClick}
      className={`flex justify-items-center w-full gap-3 p-2 rounded-2xl cursor-pointer ${
        user?._id !== selectedUser?._id && "hover:bg-base-200 "
      } ${user?._id === selectedUser?._id && "bg-base-300"}`}
    >
      <div className="relative">
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <img
            src={
              user?.avatar ||
              `https://api.dicebear.com/5.x/initials/svg?seed=${
                user?.fullName || "NA"
              }`
            }
            alt={user?.fullName || "N/A"}
            className="w-full h-full object-cover"
          />
        </div>

        {/* ✅ Green dot appears if user is online */}
        {isOnline && (
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full shadow-md"></span>
        )}
      </div>
      <div>
        <h1 className="line-clamp-1">{user?.fullName}</h1>
        <h1 className="text-xs">{user?.username}</h1>
      </div>
    </div>
  );
};

export default User;

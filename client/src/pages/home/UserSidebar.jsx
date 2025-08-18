import React from "react";
import User from "./User";
import { useDispatch, useSelector } from "react-redux";
import {
  getOtherUsersThunk,
  logoutUserThunk,
  searchedUsersThunk,
} from "../../store/slice/user/user.thunk";
import { useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { useEffect } from "react";
const UserSidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [search, setSearch] = React.useState("");

  // Get other users and user profile from the Redux store
  const { otherUsers, userProfile } = useSelector((state) => state.user);

  useEffect(() => {
    (async () => {
      dispatch(getOtherUsersThunk());
    })();
  }, [getOtherUsersThunk]);

  const handleLogout = async () => {
    const response = await dispatch(logoutUserThunk());
    if (response.payload.success) {
      navigate("/login");
    }
  };

  //  Function to handle search input change
  const handleSearch = (e) => {
    setSearch(e.target.value);
    // if (search === "") {
    //   dispatch(getOtherUsersThunk());
    //   return;
    // }
    // dispatch(searchedUsersThunk(search));
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (search.trim() === "") {
        dispatch(getOtherUsersThunk());
      } else {
        dispatch(searchedUsersThunk(search));
      }
    }, 200); // wait 300ms after user stops typing

    return () => clearTimeout(delayDebounce); // cleanup on new keystroke
  }, [search, dispatch]);

  return (
    <div className="w-1/3 border-r-[1px] p-2 flex flex-col item-start justify-between overflow-auto">
      <div className="flex items-center justify-start h-14 p-4 mb-4">
        <span className="text-4xl">
          Talk<span className="text-[#F89A28]">HUB</span>
        </span>
      </div>
      <div className="flex items-center justify-center w-full mb-4">
        <label
          className="input input-bordered flex items-center gap-2 rounded-3xl h-12
                  focus-within:outline-none focus-within:ring-0 focus-within:border-gray-300"
        >
          <input
            type="text"
            className="grow outline-none border-none focus:outline-none focus:ring-0 focus:border-gray-300"
            placeholder="Search users..."
            onChange={handleSearch}
          />
          <IoSearch />
        </label>
      </div>
      <div className="flex flex-col items-start gap-3 h-full overflow-y-scroll w-full">
        {otherUsers?.length === 0 ? (
          <div className="w-full h-full flex justify-center items-center">
            No users found!
          </div>
        ) : (
          otherUsers?.map((user) => <User key={user._id} user={user} />)
        )}
      </div>
      <div className="flex items-center place-content-between gap-2 py-1 px-6 bg-base-300 rounded-2xl mt-2">
        <div className="avatar overflow-auto">
          <div className="ring-primary ring-offset-base-100 w-12 m-3 rounded-full ring ring-offset-2">
            <img src={userProfile?.avatar} />
          </div>
        </div>
        <div className="flex flex-col items-start justify-center">
          <h1 className="line-clamp-1 text-xl">{userProfile?.fullName}</h1>
          <h1 className="text-xs">{userProfile?.username}</h1>
        </div>
        <button className="btn btn-active btn-primary" onClick={handleLogout}>
          Log out
        </button>
      </div>
    </div>
  );
};

export default UserSidebar;

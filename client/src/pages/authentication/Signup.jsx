import React from "react";
import { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoKeyOutline } from "react-icons/io5";
import { RiUserAddLine } from "react-icons/ri";
import { TbPasswordFingerprint } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { registerUserThunk } from "../../store/slice/user/user.thunk";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const dispatch = useDispatch();
  const {buttonLoading, isAuthenticate} = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [signupData, setSignupData] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  console.log(isAuthenticate);

  useEffect(() => {
    if (isAuthenticate) {
      navigate("/");
    }
  }, [isAuthenticate], [navigate]);
  
  // Handle input changes

  const handleChange = (e) => {
    setSignupData({
      ...signupData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    // Handle signup logic here
    if (signupData.password !== signupData.confirmPassword) {
      return toast.error("Passwords do not match!");
    }
    const response = await dispatch(registerUserThunk(signupData));
    // console.log(response);
    if (response.payload.success) {
      navigate("/");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-2xl">
        <span className="text-4xl">
          Talk<span className="text-[#F89A28]">HUB</span>
        </span>
      </h1>
      <label className="input input-bordered flex items-center gap-2 focus-within:outline-none focus-within:ring-0 focus-within:border-gray-300">
        <RiUserAddLine className="text-gray-500" />
        <input
          type="text"
          name="fullName"
          className="grow"
          placeholder="Enter Full Name"
          onChange={handleChange}
        />
      </label>
      <label className="input input-bordered flex items-center gap-2 focus-within:outline-none focus-within:ring-0 focus-within:border-gray-300">
        <FaUserCircle className="text-gray-500" />
        <input
          type="text"
          name="username"
          className="grow"
          placeholder="Username"
          onChange={handleChange}
        />
      </label>
      <label className="input input-bordered flex items-center gap-2 focus-within:outline-none focus-within:ring-0 focus-within:border-gray-300">
        <IoKeyOutline className="text-gray-500" />
        <input
          type="password"
          name="password"
          className="grow"
          placeholder="Enter Password"
          onChange={handleChange}
        />
      </label>
      <label className="input input-bordered flex items-center gap-2 focus-within:outline-none focus-within:ring-0 focus-within:border-gray-300">
        <TbPasswordFingerprint className="text-gray-500" />
        <input
          type="password"
          name="confirmPassword"
          className="grow"
          placeholder="Confirm Password"
          onChange={handleChange}
        />
      </label>
      <button
        className="btn btn-primary"
        disabled={buttonLoading}
        onClick={handleSignup}
      >
        Sign Up
      </button>
      <p>
        Already have an account,{" "}
        <Link to={"/login"} className="text-blue-600 decoration-1">
          log in?
        </Link>
      </p>
    </div>
  );
};

export default Signup;

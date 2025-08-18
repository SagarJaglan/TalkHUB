import React from "react";
import { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoKeyOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { loginUserThunk } from "../../store/slice/user/user.thunk";
const Login = () => {

  const {buttonLoading, isAuthenticate} = useSelector((state) => state.user);
  const navigate = useNavigate();
  
  // State to hold login data
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    if (isAuthenticate) {
      navigate("/");
    }
  }, [isAuthenticate, navigate]);

  const dispatch = useDispatch();

  // Handle input changes
  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async(e) => {
    e.preventDefault();
    // Handle login logic here
    const response = await dispatch(loginUserThunk(loginData));
    if (response.payload.success) {
      navigate("/");
    }
  }
  
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <h1 className="text-2xl">
          <span className="text-4xl">
            Talk<span className="text-[#F89A28]">HUB</span>
          </span>
          , login to chat!
        </h1>
        <label className="input input-bordered flex items-center gap-2 focus-within:outline-none focus-within:ring-0 focus-within:border-gray-300">
          <FaUserCircle className="text-gray-500" />
          <input
            type="text"
            name="username"
            required
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
            required
            className="grow"
            placeholder="Password"
            onChange={handleChange}
          />
        </label>
        <button className="btn btn-primary " disabled = {buttonLoading} onClick={handleLogin}>Login</button>
        <p>
          Don't have an account,{" "}
          <Link to={"/signup"} className="text-blue-600 decoration-1">
            sign up?
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

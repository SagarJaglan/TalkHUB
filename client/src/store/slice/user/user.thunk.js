import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../components/axios/axiosInstance";
import toast from "react-hot-toast";

export const loginUserThunk = createAsyncThunk(
  "user/login",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/user/login", {
        username,
        password,
      });
      if (response.data.success) {
        return response.data;
      }
    } catch (error) {
      console.error("Error during login:", error);
      const errorMessage = error.response?.data?.errMessage;
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const registerUserThunk = createAsyncThunk(
  "user/signup",
  async ({ fullName, username, password, confirmPassword }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/user/register", {
        fullName,
        username,
        password,
        confirmPassword,
      });
      
      console.log(response);
      if (response.data.success) {
        return response.data;
      }
    } catch (error) {
      console.error("Error during login:", error);
      const errorMessage = error.response?.data?.errMessage;
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const logoutUserThunk = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/user/logout", );
      
    //   console.log(response);
      if (response.data.success) {
        toast.success("Logout successful!");
        return response.data;
      }
    } catch (error) {
      console.error("Error during login:", error);
      const errorMessage = error.response?.data?.errMessage;
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const getProfileThunk = createAsyncThunk(
  "user/getProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/user/get-profile",);
      
      // console.log(response);
      if (response.data.success) {
        return response.data;
      }
    } catch (error) {
      console.error("Error during login:", error);
      const errorMessage = error.response?.data?.errMessage;
    //   toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const getOtherUsersThunk = createAsyncThunk(
  "user/getOtherUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/user/other-users",);
      
    //   console.log(response);
      if (response.data.success) {
        return response.data;
      }
    } catch (error) {
      console.error("Error during login:", error);
      const errorMessage = error.response?.data?.errMessage;
    //   toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const searchedUsersThunk = createAsyncThunk(
  "user/searchUsers",
  async (searchTerm, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/user/search?query=${encodeURIComponent(searchTerm)}`);

      if (response.data.success) {
        return response.data;
      }
    } catch (error) {
      // console.error("Error during login:", error);
      const errorMessage = error.response?.data?.errMessage;
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);
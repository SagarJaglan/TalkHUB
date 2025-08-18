import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../components/axios/axiosInstance";
import toast from "react-hot-toast";

export const sendMessageThunk = createAsyncThunk(
  "message/send",
  async ({ receiverId , message }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/messages/send/${receiverId }`, {
        message,
      });
      // console.log(response);
      if (response.data.success) {
        return response.data;
      }
    } catch (error) {
      console.error("Error sending messages:", error);
      const errorMessage = error.response?.data?.errMessage;
      return rejectWithValue(errorMessage);
    }
  }
);

export const getMessageThunk = createAsyncThunk(
  "message/get",
  async ({ recieverId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/messages/get-message/${recieverId}`);
      if (response.data.success) {
        return response.data.data.message;
      }
    } catch (error) {
      // console.error("Error message fetching:", error);
      const errorMessage = error.response?.data?.errMessage;
      return rejectWithValue(errorMessage);
    }
  }
);

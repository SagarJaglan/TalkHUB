import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { getMessageThunk, sendMessageThunk } from "./message.thunk";

const initialState = {
  messages: null,
  buttonLoading: false,
  screenLoading: false,
};

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    resetMessages: (state) => {
      state.messages = null;
    },
    setNewMessages: (state, action) => {
      const oldMessages = state.messages || [];
      state.messages = [...oldMessages , action.payload];
    }
    
  },
  extraReducers: (builder) => {
    builder
      // Handle send message thunk
      .addCase(sendMessageThunk.pending, (state) => {
        state.screenLoading = true;
        state.buttonLoading = true;
      })
      .addCase(sendMessageThunk.fulfilled, (state, action) => {
        // console.log(action.payload.user)
        state.screenLoading = false;
        state.messages = [ ...state.messages, action.payload.data ];
        state.buttonLoading = false;
      })
      .addCase(sendMessageThunk.rejected, (state, action) => {
        state.buttonLoading = false;
      })


        // Handle get message thunk
      .addCase(getMessageThunk.pending, (state) => {
        state.screenLoading = true;
        state.buttonLoading = true;
      })
      .addCase(getMessageThunk.fulfilled, (state, action) => {
        // console.log(action.payload.user)
        state.screenLoading = false;
        state.messages = action.payload;
        // console.log(action.payload);
        state.buttonLoading = false;
      })
      .addCase(getMessageThunk.rejected, (state, action) => {
        state.buttonLoading = false;
      });

  },
});

export const {resetMessages, setNewMessages} = messageSlice.actions;

export default messageSlice.reducer;

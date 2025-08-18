import { createSlice } from "@reduxjs/toolkit";
import { getOtherUsersThunk, getProfileThunk, loginUserThunk, logoutUserThunk, registerUserThunk, searchedUsersThunk } from "./user.thunk";
import toast from "react-hot-toast";

const initialState = {
  isAuthenticate: false,
  screenLoading: true,
  userProfile: null,
  selectedUser: JSON.parse(localStorage.getItem("selectedUser")) || null,
  buttonLoading: false,
  otherUsers: [],
  searchedUsers: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setSelectedUser: (state, action) => {
      localStorage.setItem("selectedUser", JSON.stringify(action.payload));
      state.selectedUser = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Handle login user thunk
      .addCase(loginUserThunk.pending, (state) => {
        state.screenLoading = true;
        state.buttonLoading = true;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        // console.log(action.payload.user)
        state.isAuthenticate = true;
        state.screenLoading = false;
        state.userProfile = action.payload.user;
        state.buttonLoading = false;
        toast.success("Login successful!");
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.buttonLoading = false;
      })

      // Handle register user thunk
      .addCase(registerUserThunk.pending, (state) => {
        state.screenLoading = true;
        state.buttonLoading = true;
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        // console.log(action.payload.user)
        state.isAuthenticate = true;
        state.screenLoading = false;
        state.userProfile = action.payload.user;
        state.buttonLoading = false;
        toast.success("Registration successful!");
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.buttonLoading = false;
      })

       // Handle logout user thunk
      .addCase(logoutUserThunk.pending, (state) => {
        state.screenLoading = true;
        state.buttonLoading = true;
      })
      .addCase(logoutUserThunk.fulfilled, (state, action) => {
        // console.log(action.payload.user)
        state.isAuthenticate = false;
        state.screenLoading = false;
        state.userProfile = null;
        state.selectedUser = null;
        state.buttonLoading = false;
        state.otherUsers = [];
        localStorage.removeItem("selectedUser");
      })
      .addCase(logoutUserThunk.rejected, (state, action) => {
        state.buttonLoading = false;
      })

      // Handle get-profile user thunk
      .addCase(getProfileThunk.pending, (state) => {
        state.buttonLoading = true;
      })
      .addCase(getProfileThunk.fulfilled, (state, action) => {
        // console.log(action.payload.user)
        state.isAuthenticate = true;
        state.screenLoading = false;
        state.userProfile = action.payload.user;
        state.buttonLoading = false; 
      })
      .addCase(getProfileThunk.rejected, (state, action) => {
        state.buttonLoading = false;
      })
      
      // Handle get-Other Users user thunk
      .addCase(getOtherUsersThunk.pending, (state) => {
        state.buttonLoading = true;
      })
      .addCase(getOtherUsersThunk.fulfilled, (state, action) => {
        // console.log(action.payload.user)
        state.screenLoading = false;
        state.otherUsers = action.payload.responseData;
        // console.log(action.payload.responseData);
        state.buttonLoading = false; 
      })
      .addCase(getOtherUsersThunk.rejected, (state, action) => {
        state.buttonLoading = false;
      })
      
       // Handle searchedUsers user thunk
      .addCase(searchedUsersThunk.pending, (state) => {
        state.buttonLoading = true;
      })
      .addCase(searchedUsersThunk.fulfilled, (state, action) => {
        // console.log(action.payload.user)
        state.screenLoading = false;
        state.searchedUsers = action.payload.responseData;
        state.otherUsers = state.searchedUsers;
        // console.log(action.payload.responseData);
        state.buttonLoading = false; 
      })
      .addCase(searchedUsersThunk.rejected, (state, action) => {
        state.buttonLoading = false;
      });
  },
});

export const {setSelectedUser} = userSlice.actions;

export default userSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    SignInStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    SignInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    SignInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    UpdateStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    UpdateSucess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    UpdateFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteUserStart: (state) =>{
      state.loading = true;
      state.error = null;
    },
    deleteUserSucess: (state) =>{
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    deleteUserFailure: (state, action) =>{
      state.loading = false;
      state.error = action.payload;
    },
    SignOutSucess : (state) =>{
      state.currentUser = null;
      state.error = null;
      state.loading = false;
    }
  },
});

export const {
  SignInStart,
  SignInSuccess,
  SignInFailure,
  UpdateStart,
  UpdateSucess,
  UpdateFailure,
  deleteUserStart,
  deleteUserSucess,
  deleteUserFailure,
  SignOutSucess
} = userSlice.actions;

export default userSlice.reducer;

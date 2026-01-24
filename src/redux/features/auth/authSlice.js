import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  bonusToken: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      const { user, token, bonusToken } = payload;
      ((state.user = user),
        (state.token = token),
        (state.bonusToken = bonusToken));
    },
    logout: (state) => {
      const nonRemovalKey = ["closePopupForForever", "build_version"];
      Object.keys(localStorage).forEach((key) => {
        if (!nonRemovalKey.includes(key)) {
          localStorage.removeItem(key);
        }
      });
      state.user = null;
      state.token = null;
      state.bonusToken = null;
    },
  },
});

export const { logout, setUser } = authSlice.actions;
export default authSlice.reducer;
export const userToken = (state) => state.auth.token;
export const currentUser = (state) => state.auth.user;

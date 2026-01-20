import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  group: null,
  showLoginModal: false,
  showRegisterModal: false,
  showLeftSidebar: false,
  showRightSidebar: false,
  showForgetModal: false,
  showNotification: false,
  showBanner: false,
  showAppPopUp: false,
  showAPKModal: false,
  windowWidth: window.innerWidth,
};

const globalSlice = createSlice({
  name: "state",
  initialState,
  reducers: {
    setGroupType: (state, action) => {
      state.group = action.payload;
    },
    setSiteLogo: (state, action) => {
      state.siteLogo = action.payload;
    },
    setShowRegisterModal: (state, action) => {
      state.showRegisterModal = action.payload;
      state.showLoginModal = false;
    },
    setShowLoginModal: (state, action) => {
      state.showLoginModal = action.payload;
      state.showRegisterModal = false;
    },
    setShowLeftSidebar: (state, action) => {
      state.showLeftSidebar = action.payload;
    },
    setShowRightSidebar: (state, action) => {
      state.showRightSidebar = action.payload;
    },
    setShowForgetModal: (state, action) => {
      state.showForgetModal = action.payload;
    },
    setShowNotification: (state, action) => {
      state.showNotification = action.payload;
    },
    setShowBanner: (state, action) => {
      state.showBanner = action.payload;
    },
    setShowAppPopUp: (state, action) => {
      state.showAppPopUp = action.payload;
    },
    setShowAPKModal: (state, action) => {
      state.showAPKModal = action.payload;
    },
    setWindowWidth: (state, action) => {
      state.windowWidth = action.payload;
    },
  },
});

export const {
  setGroupType,
  setSiteLogo,
  setShowLoginModal,
  setShowRegisterModal,
  setShowLeftSidebar,
  setShowRightSidebar,
  setShowForgetModal,
  setShowAPKModal,
  setShowAppPopUp,
  setShowBanner,
  setShowNotification,
  setWindowWidth,
} = globalSlice.actions;

export default globalSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  placeBetValues: null,
  showBetSlip: false,
  price: null,
  stake: null,
  predictOdd: [],
  runnerId: null,
};

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    setShowBetSlip: (state, action) => {
      state.showBetSlip = action.payload;
    },
    setPosition: (state, action) => {
      state.position = action.payload;
    },
    setPlaceBetValues: (state, action) => {
      state.placeBetValues = action.payload;
    },
    setPrice: (state, action) => {
      state.price = action.payload;
    },
    setStake: (state, action) => {
      state.stake = action.payload;
    },

    setPredictOdd: (state, action) => {
      state.predictOdd = action.payload;
    },
    setRunnerId: (state, action) => {
      state.runnerId = action.payload;
    },
  },
});

export const {
  setShowBetSlip,
  setPosition,
  setPlaceBetValues,
  setPrice,
  setStake,
  setPredictOdd,
  setRunnerId,
} = eventSlice.actions;

export default eventSlice.reducer;

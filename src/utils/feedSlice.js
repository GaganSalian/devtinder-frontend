import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState:null,
  reducers: {
    addFeed: (state, action) => {
      return action.payload;
    },
    removeUserFromFeed:(state, action) => {
      const newFeed = state.filter((user) => user._id !== action.payload);
      return newFeed;
    },
  },
});

export const { addFeed, removeUserFromFeed } = feedSlice.actions;
export default feedSlice.reducer;
// import { createSlice } from "@reduxjs/toolkit";

// const feedSlice = createSlice({
//   name: "feed",
//   initialState: [], // ✅ use array not null
//   reducers: {
//     addFeed: (state, action) => {
//       return action.payload; // assumes action.payload is an array
//     },
//     removeUserFromFeed: (state, action) => {
//       return state.filter((user) => user._id !== action.payload); // safe now
//     },
//   },
// });

// export const { addFeed, removeUserFromFeed } = feedSlice.actions;
// export default feedSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    messages: [],
    sessionId: null,
  },
  reducers: {
    allChats: (state, action) => {
      state.messages = action.payload;
    },
    addChat: (state, action) => {
      state.messages.push(action.payload);
    },
    addId: (state, action) => {
      state.sessionId = action.payload;
    },
  },
});

export default chatSlice;
export const { addChat, addId, allChats } = chatSlice.actions;

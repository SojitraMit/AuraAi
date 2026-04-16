import axiosInstance from "../utils/axios";

const chat = {
  chat: async (data) => {
    const response = await axiosInstance.post("/chat", data);
    return response.data;
  },
  allSessions: async () => {
    const response = await axiosInstance.get("/chat/sessions");
    return response.data;
  },
  newSession: async (data) => {
    const responce = await axiosInstance.post("/chat/sessions", data);
    return responce.data;
  },
  chatHistory: async (session_id) => {
    const response = await axiosInstance.get(`/chat/history/${session_id}`);
    return response.data;
  },
};

export default chat;

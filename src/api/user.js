import axiosInstance from "../utils/axios";

const user = {
  login: async (data) => {
    const response = await axiosInstance.post("/auth/login", data);

    return response.data;
  },
  signUp: async (data) => {
    const response = await axiosInstance.post("/auth/register", data);
    return response.data;
  },
  fetchUser: async () => {
    const response = await axiosInstance.get("/auth/me");
    return response.data;
  },
};

export default user;

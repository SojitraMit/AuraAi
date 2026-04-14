import axiosInstance from "../utils/axios";

const user = {
  login: async (email, password) => {
    const response = await axiosInstance.post("/auth/login", {
      email,
      password,
    });

    return response.data;
  },
  signUp: async (email, password) => {
    const response = await axiosInstance.post("/auth/signup", {
      email,
      password,
    });
    return response.data;
  },
  fetchUser: async () => {
    const response = await axiosInstance.get("/auth/me");
    return response.data;
  },
};

export default user;

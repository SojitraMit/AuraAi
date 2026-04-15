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
    const token = localStorage.getItem("token"); // wherever you store it
    const response = await axiosInstance.get("/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
};

export default user;

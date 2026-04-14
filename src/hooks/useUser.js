import { useMutation, useQuery } from "@tanstack/react-query";
import user from "../api/user";

export const useLogin = () => {
  const result = useMutation({
    mutationKey: ["login"],
    mutationFn: user.login,
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });

  return result;
};

export const useSignUp = () => {
  const result = useMutation({
    mutationKey: ["signup"],
    mutationFn: user.signUp,
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });

  return result;
};

export const useFetchUser = () => {
  const result = useQuery({
    queryKey: ["fetchUser"],
    queryFn: user.fetchUser,
    onError: (error) => {
      console.error("Fetch user failed:", error);
    },
  });
  return result;
};

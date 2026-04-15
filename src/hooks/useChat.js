import { useMutation, useQuery } from "@tanstack/react-query";
import chat from "../api/chat";

export const useAllSessions = () => {
  const result = useQuery({
    queryKey: ["allSessions"],
    queryFn: chat.allSessions,
    onError: (error) => {
      console.error("Fetch sessions failed:", error);
    },
  });
  return result;
};

export const useNewSession = () => {
  const result = useMutation({
    mutationKey: ["newSession"],
    mutationFn: chat.newSession,
    onError: (error) => {
      console.error("Create session failed:", error);
    },
  });

  return result;
};

export const useChatHistory = (session_id) => {
  const result = useQuery({
    queryKey: ["chatHistory", session_id],
    queryFn: () => chat.chatHistory(session_id),
    onError: (error) => {
      console.error("Fetch chat history failed:", error);
    },
  });

  return result;
};

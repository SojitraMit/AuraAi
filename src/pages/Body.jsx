import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useFetchUser } from "../hooks/useUser";
import { addUser } from "../utils/userSlice";
import { v4 as uuidv4 } from "uuid";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useAllSessions, useNewSession } from "../hooks/useChat";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { data, isLoading, error } = useFetchUser();
  const { data: sessionData, isLoading: sessionLoading } = useAllSessions();

  const hasNavigated = useRef(false);
  const newSessionMutation = useNewSession();

  // ✅ 1. Save user
  useEffect(() => {
    if (data) {
      dispatch(addUser(data));
    }
  }, [data, dispatch]);

  // ✅ 2. If no token / 401 → go to login immediately
  useEffect(() => {
    if (!isLoading && error && location.pathname !== "/") {
      navigate("/");
    }
  }, [isLoading, error, location.pathname, navigate]);

  // ✅ 3. Handle session navigation
  useEffect(() => {
    if (location.pathname.startsWith("/chat")) return;
    if (!isLoading && !sessionLoading && data && !hasNavigated.current) {
      hasNavigated.current = true;

      const sessions = sessionData?.sessions || [];

      if (sessions.length > 0) {
        navigate(`/chat/${sessions[0].session_id}`);
      } else {
        const session_id = `session-${uuidv4()}`;
        newSessionMutation.mutate(
          { name: "New Chat", session_id },
          {
            onSuccess: (newSession) => {
              navigate(`/chat/${newSession.session_id}`);
            },
          },
        );
      }
    }
  }, [isLoading, sessionLoading, data, sessionData]);

  // ✅ 4. Show loading only while fetching (not on error)
  if (isLoading || newSessionMutation.isLoading) {
    return (
      <div className="flex min-h-screen  items-center justify-center  bg-[#12121d]">
        <DotLottieReact
          src="https://lottie.host/12991057-9077-404d-816c-e93f2787a942/sHUbqllBWt.lottie"
          loop
          autoplay
          className="w-40 h-40"
        />
      </div>
    );
  }

  // ✅ 5. Allow login page to render when the user is unauthenticated
  if (error && location.pathname !== "/") return null;

  return <Outlet />;
};

export default Body;

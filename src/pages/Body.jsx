import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { useFetchUser } from "../hooks/useUser";
import { addUser } from "../utils/userSlice";
import { v4 as uuidv4 } from "uuid";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useAllSessions, useNewSession } from "../hooks/useChat";
import { useRef } from "react";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data, isLoading, error } = useFetchUser();
  const { data: sessionData, isLoading: sessionLoading } = useAllSessions();

  const hasNavigated = useRef(false);

  const newSessionMutation = useNewSession();

  const userData = useSelector((store) => store.user);

  // ✅ 1. Save user
  useEffect(() => {
    if (data) {
      dispatch(addUser(data));
    }
  }, [data, dispatch]);

  // ✅ 2. Handle session + navigation (MAIN LOGIC)

  useEffect(() => {
    if (!isLoading && !sessionLoading && data && !hasNavigated.current) {
      hasNavigated.current = true;

      if (sessionData && sessionData.length > 0) {
        navigate(`/chat/${sessionData[0].session_id}`);
      }

      // ✅ ONLY create if sessionData is EMPTY (not undefined)
      else if (sessionData && sessionData.length === 0) {
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
  // ✅ 3. Handle auth failure
  useEffect(() => {
    if (!isLoading && error) {
      navigate("/");
    }
  }, [isLoading, error, navigate]);

  // ✅ 4. Loading UI
  if (isLoading || sessionLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#12121d]">
        <DotLottieReact
          src="https://lottie.host/12991057-9077-404d-816c-e93f2787a942/sHUbqllBWt.lottie"
          loop
          autoplay
          className="w-40 h-40"
        />
      </div>
    );
  }

  return <Outlet />;
};

export default Body;

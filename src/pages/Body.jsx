/* eslint-disable no-unused-vars */
import React, { use, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { useFetchUser } from "../hooks/useUser";
import { addUser } from "../utils/userSlice";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data, isLoading, error } = useFetchUser();

  // Dispatch user data when it arrives
  useEffect(() => {
    if (data) {
      dispatch(addUser(data));
    }
  }, [data, dispatch]);

  const userData = useSelector((store) => store.user);

  // Navigate to login if no user data after loading
  useEffect(() => {
    if (!isLoading && !userData && error) {
      console.log(error);
      navigate("/login");
    }
  }, [isLoading, userData, error, navigate]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#12121d]">
        <DotLottieReact
          src="https://lottie.host/12991057-9077-404d-816c-e93f2787a942/sHUbqllBWt.lottie"
          loop
          autoplay
          className="w-40 h-40"
        />{" "}
      </div>
    );
  }

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Body;

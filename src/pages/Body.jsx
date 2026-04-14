/* eslint-disable no-unused-vars */
import React, { use, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { useFetchUser } from "../hooks/useUser";
import { addUser } from "../utils/userSlice";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  const { data, isLoading, error } = useFetchUser();
  dispatch(addUser(data));

  useEffect(() => {
    if (userData == null) return navigate("/login");
  }, []);
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Body;

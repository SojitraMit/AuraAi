/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  const fetchUser = async () => {
    try {
      // const user = await axios.get(
      //   BASE_URL + "/profile/view",
      //   {
      //     withCredentials: true,
      //   },
      // );
      // dispatch(addUser(user.data));
      //navigate("/feed");
      // if (userData === null) {
      //   return navigate("/login");
      // }
    } catch (err) {
      // console.error(err);
      // if (err.status === 401) {
      //   return navigate("/login");
      // }
    }
  };

  useEffect(() => {
    //if (!userData) {
    fetchUser();

    //}
  }, []);
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Body;

import React from "react";
import { useSelector } from "react-redux";

export const UserData = async () => {
  const data = await useSelector((state) => state.response);
  return data;
};

export const Url = () => {
  return useSelector((state) => state?.url);
};

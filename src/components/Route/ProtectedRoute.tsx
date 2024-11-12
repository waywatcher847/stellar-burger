import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getCookie } from "../../utils/cookie";

type Props = {
  checkLoggedIn?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({ checkLoggedIn, children }: Props) => {
  const accessToken = getCookie("accessToken");
  const location = useLocation();
  const from = location.state?.from || { pathname: "/" };
  // не пускать если зареган
  if (!checkLoggedIn && accessToken) {
    return <Navigate replace to={from} />;
  }
  // не пускать если не зареган
  if (checkLoggedIn && !accessToken) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};

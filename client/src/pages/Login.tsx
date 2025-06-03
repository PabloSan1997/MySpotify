import React from "react";
import { useAppSelector } from "../hooks";
import { Navigate } from "react-router-dom";
import { routesname } from "../routes/routesname";
import { LoginHeader } from "../components/LoginHeader";
import '../styles/login.scss';

export function Login({children}:React.PropsWithChildren) {
  const state = useAppSelector(state => state.user);

  if (state.jwt.trim())
    return <Navigate to={routesname.home} />
  return (
    <>
      <LoginHeader/>
      {children}
    </>
  );
}

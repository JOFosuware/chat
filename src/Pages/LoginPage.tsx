import React from 'react';
import Login from "../Components/Login";

export default function LoginPage() {
  return (
    <div className="h-[100vh] flex justify-center items-center p-10">
        <Login />
        <div className="w-full h-full bg-gradient-to-r from-myBlue to-myPink opacity-70 absolute top-0 -z-10" />
        <div className="h-full w-full absolute bg-pattern -z-20 top-0" />
    </div>
  );
}
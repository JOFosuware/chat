import React from "react";
// @ts-ignore
import logo from "../Assets/logo.png";
import Button from "./Button"; // Assuming the logo is a PNG file

export default function Header() {
    return (
        <div className="flex flex-wrap sm:flex-row gap-5 items-center justify-between drop-shadow-md bg-gradient-to-r from-myBlue to-myPink px-5 py-5 md:py-2 text-white">
            <img className="w-[70px] drop-shadow-md" src={logo} alt="logo" />
            <div className="flex">
                <Button text="Add New ListBoard" secondary />
            </div>
        </div>
    );
}
"use client";

import React from "react";
import Link from "next/link";
import CustomButton from "./CustomButton";
import { BsSpeedometer } from "react-icons/bs";
import SignInButton from "./SignInButton";
import { useSession } from "next-auth/react";

const NavBar = () => {
  const { data: session } = useSession();
  return (
    <header className="w-full absolute z-10">
      <nav className="max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4">
        <Link href="/" className="flex justify-center items-center">
          <h1 className=" text-slate-100 italic text-4xl">CARZ</h1>
          <BsSpeedometer className="text-2xl text-primary-orange" />
        </Link>

        <SignInButton />
      </nav>
    </header>
  );
};

export default NavBar;

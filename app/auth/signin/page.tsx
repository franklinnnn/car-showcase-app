"use client";

import { signIn } from "next-auth/react";
import React, { useRef } from "react";
import { BsSpeedometer } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";

const page = () => {
  const username = useRef("");
  const password = useRef("");

  const handleSubmit = async () => {
    const result = await signIn("credentials", {
      username: username.current,
      passowrd: password.current,
      redirect: true,
      callbackUrl: "/",
    });
  };

  return (
    <div className="aboslute top-0 left-0 w-full h-screen flex justify-center items-center bg-zinc-900 z-100">
      <div className="flex flex-col gap-4 items-center w-[420px] p-4 bg-black rounded-md">
        <div className="flex items-center">
          <h1 className=" text-slate-100 italic text-4xl">CARZ</h1>
          <BsSpeedometer className="text-2xl text-primary-orange" />
        </div>
        {/* <form className="flex flex-col justify-center items-center gap-2 w-full">
          <input
            type="text"
            name="model"
            onChange={(e) => (username.current = e.target.value)}
            placeholder="Username"
            className="searchbar__input border-[1px] border-transparent bg-zinc-900 text-slate-100 focus:border-primary-orange"
          />
          <input
            type="text"
            name="model"
            onChange={(e) => (password.current = e.target.value)}
            placeholder="Password"
            className="searchbar__input border-[1px] border-transparent bg-zinc-900 text-slate-100 focus:border-primary-orange"
          />
          <button
            type="submit"
            className="bg-primary-orange text-slate-100 text-xl font-bold uppercase italic w-full p-2 mt-4 rounded-md"
            onClick={handleSubmit}
          >
            sign in
          </button>
        </form> */}

        <div className="w-full py-4 border-t border-zinc-800">
          <button
            onClick={() => signIn("google")}
            className="w-full flex items-center justify-center gap-2 bg-slate-200 p-2 rounded-md"
          >
            <FcGoogle /> Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;

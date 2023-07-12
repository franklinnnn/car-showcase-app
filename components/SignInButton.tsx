"use client";

import React, { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { FaUser } from "react-icons/fa";

const SignInButton = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { data: session } = useSession();

  // const popupCenter = (url: string, title: string) => {
  //   const dualScreenLeft = window.screenLeft ?? window.screenX;
  //   const dualScreenTop = window.screenTop ?? window.screenY;

  //   const width =
  //     window.innerWidth ?? document.documentElement.clientWidth ?? screen.width;

  //   const height =
  //     window.innerHeight ??
  //     document.documentElement.clientHeight ??
  //     screen.height;

  //   const systemZoom = width / window.screen.availWidth;

  //   const left = (width - 500) / 2 / systemZoom + dualScreenLeft;
  //   const top = (height - 550) / 2 / systemZoom + dualScreenTop;

  //   const newWindow = window.open(
  //     url,
  //     title,
  //     `width=${500 / systemZoom},height=${
  //       550 / systemZoom
  //     },top=${top},left=${left}`
  //   );

  //   newWindow?.focus();
  // };

  if (session && session.user) {
    return (
      <div className="relative flex items-center gap-4">
        <div>
          {/* <Image src={session.user?.image} alt="profile image" width={20} height={20} className="object-contain"/> */}
          <p className="text-slate-100 font-bold italic text-2xl">
            {session.user.name}
          </p>
        </div>

        {/* <button
          onClick={() => signOut()}
          className="text-slate-100 uppercase italic font-bold rounded-md py-3 bg-black min-w-[130px] hover:bg-primary-orange"
        >
          Sign Out
        </button> */}

        <button
          className="bg-black rounded-full  hover:bg-primary-orange"
          onClick={() => setShowUserMenu(!showUserMenu)}
        >
          {session.user.image ? (
            <img
              src={session.user.image}
              alt="user image"
              className="w-10 h-10 rounded-full"
            />
          ) : (
            <FaUser className="text-slate-100 w-10 h-10 p-4" />
          )}
        </button>
        {showUserMenu && (
          <div className="absolute top-14 right-0 flex flex-col items-end  bg-black text-slate-100 rounded-md ">
            <Link
              href="/dashboard"
              className="text-xl italic font-bold hover:bg-primary-orange w-full py-2 px-4 rounded-t-md"
            >
              Profile
            </Link>
            <button
              onClick={() => signOut()}
              className="text-xl italic font-bold hover:bg-primary-orange w-full py-2 px-4 rounded-b-md"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    );
  } else {
    return (
      <button
        onClick={() => signIn()}
        // onClick={() => popupCenter("/auth/signin", "Sample Sign In")}
        className="text-slate-100 uppercase italic font-bold rounded-md py-3 bg-black min-w-[130px] hover:bg-primary-orange"
      >
        Sign In
      </button>
    );
  }
};

export default SignInButton;

"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { useSession } from "next-auth/react";

const page = () => {
  const { data: session } = useSession();
  // const [users, loading, error] = useCollection(query(collection(db, "users")));

  const userImg = session?.user?.image as string;
  console.log(userImg);

  return (
    <div className="w-full h-screen flex justify-center bg-zinc-900 text-slate-100">
      <div className="w-full max-w-[900px] mt-20 p-6">
        <h2 className="text-xl italic">Hello, User</h2>
        <div className="flex justify-start items-end gap-4 p-4 bg-black rounded-md">
          <div className="flex items-center justify-center rounded-full bg-red-400">
            <Image
              src={session?.user?.image as string}
              alt="user"
              width={140}
              height={140}
              className="object-cover rounded-full"
            />
          </div>
          <div>
            <p>Profile</p>
            <h1 className="text-4xl italic font-bold">{session?.user?.name}</h1>
            <p className="text-2xl italic font-bold">{session?.user?.email}</p>
          </div>
        </div>

        <div className="mt-12 p-4 bg-black rounded-md">
          <h1 className="text-3xl italic font-bold">Saved cars</h1>
          <div className="home__cars-wrapper">
            {/* {savedCars?.map((car) => (
                <CarCard car={car} />
              ))} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;

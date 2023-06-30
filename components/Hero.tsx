"use client";
import React, { useRef } from "react";
import Image from "next/image";
import CustomButton from "./CustomButton";

const Hero = () => {
  const scrollRef = useRef(null);
  const handleScroll = () => {
    window.scrollTo({ left: 0, top: 1100, behavior: "smooth" });
  };
  return (
    <div className="flex xl:flex-row flex-col gap-5 relative z-0 max-w-[1440px] mx-auto">
      <div className="flex-1 pt-36 padding-x">
        <h1 className="2xl:text-[72px] sm:text-[64px] text-[50px] font-extrabold italic text-slate-100">
          Find and rent a car quickly and easily!
        </h1>
        <p className="text-[24px] text-slate-200 mt-4">
          Streamline your car rental experience with our effortless booking
          process.
        </p>

        <CustomButton
          title="Explore Cars"
          containerStyles="bg-primary-orange text-slate-100 uppercase font-bold text-xl italic rounded-md mt-10"
          handleClick={handleScroll}
        />
      </div>
      <div
        className="xl:flex-[1.5] flex justify-end items-end w-full xl:h-screen"
        ref={scrollRef}
      >
        <div className="relative xl:w-full w-[90%] xl:h-full h-[590px] z-0">
          <Image
            src="/hero.png"
            alt="hero"
            loading="eager"
            fill
            className="object-contain"
          />
        </div>
        <div className="absolute xl:-top-24 xl:-right-1/2 -right-1/4 bg-hero-bg bg-repeat-round -z-10 w-full xl:h-screen h-[590px] overflow-hidden" />
      </div>
    </div>
  );
};

export default Hero;

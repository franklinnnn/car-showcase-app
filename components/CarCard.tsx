"use client";

import React, { useState } from "react";
import Image from "next/image";
import { CarProps } from "@/types";
import CustomButton from "./CustomButton";
import { calculateCarRent, generateCarImageUrl } from "@/utils";
import CarDetails from "./CarDetails";
import { RiSteering2Fill } from "react-icons/ri";
import { GiCarWheel } from "react-icons/gi";
import { BsFuelPumpFill } from "react-icons/bs";

interface CarCardProps {
  car: CarProps;
}

const CarCard = ({ car }: CarCardProps) => {
  const { city_mpg, make, model, year, transmission, drive } = car;
  const [isOpen, setIsOpen] = useState(false);

  const carRent = calculateCarRent(city_mpg, year);
  return (
    <div className="bg-zinc-950 p-4 rounded-md group text-slate-100">
      <div className="relative w-full h-40 my-3 object-contain">
        <Image
          src={generateCarImageUrl(car)}
          alt="Car Model"
          fill
          priority
          className="object-contain"
        />
      </div>

      <div className="w-full flex flex-col justify-between items-start gap-2">
        <h2 className="text-[32px] leading-[26px] font-bold uppercase italic">
          {make} {model}
        </h2>
      </div>
      {/* <p className="flex mt-6 text-[32px] font-extrabold">
        <span className="self-start text-[14px] font-semibold">$</span>
        {carRent}
        <span className="self-end text-[14px] font-medium">/day</span>
      </p> */}

      <div className="relative flex w-full mt-4">
        <div className="flex group-hover:invisible w-full h-12 px-4 justify-between text-gray">
          <div className="flex flex-col justify-center items-center gap-2">
            <RiSteering2Fill className="w-[20px] h-[20px] text-blue-600" />
            <p className="text-[14px]">
              {transmission === "a" ? "Automatic" : "Manual"}
            </p>
          </div>

          <div className="flex flex-col justify-center items-center gap-2">
            <GiCarWheel className="w-[20px] h-[20px] text-orange-600" />
            <p className="text-[14px]">{drive.toUpperCase()}</p>
          </div>

          <div className="flex flex-col justify-center items-center gap-2">
            <BsFuelPumpFill className="w-[20px] h-[20px] text-green-600" />
            <p className="text-[14px]">{city_mpg} MPG</p>
          </div>
        </div>
        <div className="hidden group-hover:flex absolute bottom-0 w-full h-12 z-10">
          <CustomButton
            title="View more"
            containerStyles="w-full py-[16px] rounded-md bg-primary-orange"
            textStyles="text-white text-[18px] leading-[17px] font-bold uppercase italic"
            handleClick={() => setIsOpen(true)}
          />
        </div>
      </div>

      <CarDetails
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        car={car}
      />
    </div>
  );
};

export default CarCard;

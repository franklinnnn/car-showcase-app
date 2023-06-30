"use client";
import React from "react";
import { ShowMoreProps } from "@/types";
import { updateSearchParams } from "@/utils";
import { useRouter } from "next/navigation";
import CustomButton from "./CustomButton";

const ShowMore = ({ pageNumber, isNext }: ShowMoreProps) => {
  const router = useRouter();
  const handleNavigation = () => {
    const newLimit = (pageNumber + 1) * 10;
    const newPathname = updateSearchParams("limit", `${newLimit}`);
    router.push(newPathname);
  };
  return (
    <div className="W-full flex-center gap-5 mt-10">
      {!isNext && (
        <CustomButton
          title="Show More"
          btnType="button"
          containerStyles="bg-primary-orange rounded-md text-white"
          handleClick={handleNavigation}
        />
      )}
    </div>
  );
};

export default ShowMore;

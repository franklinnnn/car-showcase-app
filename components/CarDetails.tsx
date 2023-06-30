"use client";

import { CarProps } from "@/types";
import { Fragment } from "react";
import Image from "next/image";
import { Dialog, Transition } from "@headlessui/react";
import { generateCarImageUrl } from "@/utils";
import { IoClose } from "react-icons/io5";
import CustomButton from "./CustomButton";
import { useSession } from "next-auth/react";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@/utils/firebase";

interface CarDetailsProps {
  isOpen: boolean;
  closeModal: () => void;
  car: CarProps;
}

const CarDetails = ({ isOpen, closeModal, car }: CarDetailsProps) => {
  // const { data: session } = useSession();

  // const handleSaveCar = async () => {
  //   const user = session?.user?.email;
  //   const res = await getDoc(doc(db, "userSavedCars", user));

  //   if (!res.exists()) {
  //     await setDoc(doc(db, "userSavedCars", user), {});
  //     console.log(`created new collection for user ${user}`);
  //   }
  //   await updateDoc(doc(db, "userSavedCars", user), {
  //     car: {
  //       city_mpg: car.city_mpg,
  //       class: car.class,
  //       combination_mpg: car.combination_mpg,
  //       cylinders: car.cylinders,
  //       displacement: car.displacement,
  //       drive: car.drive,
  //       fuel_type: car.fuel_type,
  //       highway_mpg: car.highway_mpg,
  //       make: car.make,
  //       model: car.model,
  //       transmission: car.transmission,
  //       year: car.year,
  //     },
  //   });
  // };
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto transform rounded-2xl bg-zinc-900 text-slate-100 p-6 text-left shadow-xl tansition-all flex flex-col gap-5">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="absolute top-2 right-2 z-10 w-fit p-2 bg-black hover:bg-primary-orange rounded-full"
                  >
                    <IoClose className="w-6 h-6 text-slate-100" />
                  </button>

                  <div className="flex-1 flex flex-col gap-3">
                    <div className="relative w-full h-40 bg-pattern bg-cover bg-center rounded-lg">
                      <Image
                        src={generateCarImageUrl(car)}
                        alt="Car Model"
                        fill
                        priority
                        className="object-contain"
                      />
                    </div>
                    <div className="flex gap-3">
                      <div className="flex-1 relative w-full h-24 bg-black rounded-lg">
                        {" "}
                        <Image
                          src={generateCarImageUrl(car, "29")}
                          alt="Car Model"
                          fill
                          priority
                          className="object-contain"
                        />
                      </div>
                      <div className="flex-1 relative w-full h-24 bg-black rounded-lg">
                        {" "}
                        <Image
                          src={generateCarImageUrl(car, "33")}
                          alt="Car Model"
                          fill
                          priority
                          className="object-contain"
                        />
                      </div>
                      <div className="flex-1 relative w-full h-24 bg-black rounded-lg">
                        {" "}
                        <Image
                          src={generateCarImageUrl(car, "13")}
                          alt="Car Model"
                          fill
                          priority
                          className="object-contain"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col gap-2">
                    <h2 className="font-semibold italic text-4xl uppercase">
                      {car.make} {car.model}
                    </h2>
                    <div className="mt-3 flex flex-wrap gap-4">
                      {Object.entries(car).map(([key, value]) => (
                        <div
                          className="flex justify-between gap-5 px-2 rounded-md w-full text-right uppercase hover:bg-black"
                          key={key}
                        >
                          <h4 className="text-slate-200">
                            {key.split("_").join(" ")}
                          </h4>
                          <p className="text-slate-100 font-semibold text-xl">
                            {value}
                          </p>
                        </div>
                      ))}
                    </div>
                    {/* <div className="flex justify-between items-center mt-6">
                      <CustomButton
                        title="save"
                        btnType="button"
                        containerStyles="text-slate-100 uppercase italic font-bold rounded-md bg-black min-w-[130px] hover:bg-primary-orange"
                      />
                      <CustomButton
                        title="book"
                        btnType="button"
                        containerStyles="text-slate-100 uppercase italic font-bold rounded-md bg-primary-orange min-w-[130px] hover:bg-primary-orange"
                      />
                    </div> */}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default CarDetails;

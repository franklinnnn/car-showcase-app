"use client";

import { CarProps } from "@/types";
import { Fragment, useState, useEffect } from "react";
import Image from "next/image";
import { Dialog, Transition } from "@headlessui/react";
import { fetchVideos, generateCarImageUrl } from "@/utils";
import { IoClose } from "react-icons/io5";
import CustomButton from "./CustomButton";

interface CarDetailsProps {
  isOpen: boolean;
  closeModal: () => void;
  car: CarProps;
}

interface CarVideosSearch {
  year: number;
  make: string;
  model: string;
}

const CarDetails = ({ isOpen, closeModal, car }: CarDetailsProps) => {
  const [showVideos, setShowVideos] = useState(false);
  const [carVideos, setCarVideos] = useState<any[]>([]);

  const getCarVideos = async () => {
    setCarVideos([]);
    const search = `${car.year} ${car.make} ${car.model}`;
    const result = await fetchVideos(search);
    setCarVideos(result);
    setShowVideos(true);
  };

  useEffect(() => {
    setCarVideos([]);
    setShowVideos(false);
  }, []);

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

                  <div className="relative flex-1 flex flex-col gap-2 min-h-[36rem] ">
                    <h2 className="font-semibold italic text-4xl pl-1 uppercase truncate">
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

                    <div
                      className={`absolute top-0 left-0 bg-black h-full w-full rounded-md p-1 ${
                        showVideos ? "block" : "hidden"
                      }`}
                    >
                      <h2 className="text-3xl italic uppercase pl-2">videos</h2>
                      <div className="mt-4 px-2">
                        {carVideos?.slice(0, 5).map((item, index) => (
                          <a
                            href={`https://www.youtube.com/watch?v=${item?.video.videoId}`}
                            key={index}
                            className="grid grid-cols-2 justify-start gap-2 p-1 my-2 hover:bg-zinc-800 rounded-md"
                            target="_blank"
                          >
                            <div className="relative h-20 sm:w-full rounded-sm">
                              <span className="absolute left-2 bottom-2 px-1 text-sm rounded-sm bg-zinc-900/60 z-10">
                                {item?.video.lengthText}
                              </span>
                              <Image
                                src={item?.video.thumbnails[0].url}
                                alt={item?.video.title}
                                fill
                                className="object-cover rounded-sm "
                              />
                            </div>
                            <div className="sm:w-full">
                              <p className="text-xl uppercase italic truncate">
                                {item?.video.title}
                              </p>
                              <p className="text-md truncate">
                                {item?.video.channelName}
                              </p>
                              <p className="text-sm">
                                {item?.video.viewCountText}
                              </p>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center mt-2 w-full">
                    {carVideos.length < 1 ? (
                      <button
                        onClick={() => getCarVideos()}
                        className="p-2 bg-primary-orange italic uppercase font-semibold rounded-md"
                      >
                        Show videos
                      </button>
                    ) : (
                      <button
                        onClick={() => setShowVideos(!showVideos)}
                        className="p-2 bg-primary-orange italic uppercase font-semibold rounded-md"
                      >
                        {showVideos ? "Show Details" : "Show Videos"}
                      </button>
                    )}
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

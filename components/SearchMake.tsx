"use client";
import React, { useState, Fragment } from "react";
import { SearchMakeProps } from "@/types";
import { Combobox, Transition } from "@headlessui/react";
import { manufacturers } from "@/constants";
import { BiSolidFactory } from "react-icons/bi";

const SearchMake = ({ make, setMake }: SearchMakeProps) => {
  const [query, setQuery] = useState("");

  const filteredMakes =
    query === ""
      ? manufacturers
      : manufacturers.filter((item) =>
          item
            .toLocaleLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLocaleLowerCase().replace(/\s+/g, ""))
        );

  return (
    <div className="flex-1 max-sm:w-full flex justify-start items-center">
      <Combobox value={make} onChange={setMake}>
        <div className="relative w-full">
          <Combobox.Button className="absolute top-[14px]">
            <BiSolidFactory className="w-[20px] h-[20px] ml-4 text-slate-300/60" />
          </Combobox.Button>

          <Combobox.Input
            className="w-full h-[48px] pl-12 p-4 rounded-md max-sm:rounded-full outline-none cursor-pointer text-sm border-[1px] border-transparent bg-black text-slate-100  focus:border-primary-orange"
            placeholder="Make"
            displayValue={(manufacturer: string) => manufacturer}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="bg-black">
              {filteredMakes.map((item) => (
                <Combobox.Option
                  key={item}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-primary-orange text-white" : "text-slate-200"
                    }`
                  }
                  value={item}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {item}
                      </span>

                      {selected ? (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                            active ? "text-white" : "text-teal-600"
                          }`}
                        ></span>
                      ) : null}
                    </>
                  )}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};

export default SearchMake;

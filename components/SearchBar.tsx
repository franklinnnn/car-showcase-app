"use client";
import React, { useState } from "react";
import { SearchMake } from "./";
import { useRouter } from "next/navigation";
import { FaCar, FaSearch } from "react-icons/fa";

const SearchButton = ({ otherClasses }: { otherClasses: string }) => (
  <button type="submit" className={`z-10 ${otherClasses}`}>
    <FaSearch className="w-6 h-6 text-primary-orange" />
  </button>
);

const SearchBar = () => {
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");

  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (make.trim() === "" && model.trim() === "") {
      return alert("fill in search form");
    }
    updateSearchParams(model.toLowerCase(), make.toLowerCase());
  };

  const updateSearchParams = (model: string, make: string) => {
    const searchParams = new URLSearchParams(window.location.search);

    if (make) {
      searchParams.set("make", make);
    } else {
      searchParams.delete("make");
    }

    if (model) {
      searchParams.set("model", model);
    } else {
      searchParams.delete("model");
    }

    const newPathname = `${
      window.location.pathname
    }?${searchParams.toString()}`;
    router.push(newPathname);
  };

  return (
    <form
      className="flex items-center justify-start gap-2 max-sm:flex-col w-full relative max-sm:gap-4 max-w-3xl"
      onSubmit={handleSearch}
    >
      <div className="flex-1 max-sm:w-full flex justify-start items-center relative">
        <SearchMake make={make} setMake={setMake} />
        <SearchButton otherClasses="sm:hidden" />
      </div>

      <div className="flex-1 max-sm:w-full flex justify-start items-center relative">
        <FaCar className="absolute w-[20px] h-[20px] ml-4 text-slate-300/60" />
        <input
          type="text"
          name="model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          placeholder="Model"
          className="w-full h-[48px] pl-12 p-4 rounded-md max-sm:rounded-full outline-none cursor-pointer text-sm border-[1px] border-transparent bg-black text-slate-100 focus:border-primary-orange"
        />
        <SearchButton otherClasses="sm:hidden" />
      </div>
      <SearchButton otherClasses="max-sm:hidden" />
    </form>
  );
};

export default SearchBar;

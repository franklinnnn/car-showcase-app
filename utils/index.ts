import { CarProps, FilterProps } from "@/types";

export const fetchCars = async (filters: FilterProps) => {
  const { make, model, year, limit, fuel } = filters;
  const headers = {
    "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY2 || "",
    "X-RapidAPI-Host": "cars-by-api-ninjas.p.rapidapi.com",
  };
  const response = await fetch(
    `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${make}&model=${model}&year=${year}&limit=${limit}&fuel_type=${fuel}`,
    { headers: headers }
  );

  const result = await response.json();

  return result;
};

export const calculateCarRent = (city_mpg: number, year: number) => {
  const basePricePerDay = 50; // Base rental price per day in dollars
  const mileageFactor = 0.1; // Additional rate per mile driven
  const ageFactor = 0.05; // Additional rate per year of vehicle age

  // Calculate additional rate based on mileage and age
  const mileageRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  // Calculate total rental rate per day
  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

  return rentalRatePerDay.toFixed(0);
};

export const generateCarImageUrl = (car: CarProps, angle?: string) => {
  const url = new URL("https://cdn.imagin.studio/getimage/");
  const { make, year, model } = car;
  url.searchParams.append(
    "customer",
    process.env.NEXT_PUBLIC_IMAGIN_API_KEY || ""
  );
  url.searchParams.append("make", make);
  url.searchParams.append("modelFamily", model.split(" ")[0]);
  url.searchParams.append("zoomType", "fullscreen");
  url.searchParams.append("modelYear", `${year}`);
  url.searchParams.append("angle", `${angle}`);

  return `${url}`;
};

export const updateSearchParams = (type: string, value: string) => {
  const searchParams = new URLSearchParams(window.location.search);
  searchParams.set(type, value);

  const newPathname = `${window.location.pathname}?${searchParams.toString()}`;

  return newPathname;
};

// export const fetchVideos = async (car: CarProps) => {
//   const { make, year, model } = car;
//   const headers = {
//     "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY || "",
//     "X-RapidAPI-Host": "youtube-search-and-download.p.rapidapi.com",
//   };
//   const response = await fetch(
//     `https://youtube-search-and-download.p.rapidapi.com/search?query=${year} ${make} ${model}`,
//     { headers: headers }
//   );
//   const data = await response.json();
//   return data;
// };

export const fetchVideos = async (car: string) => {
  const headers = {
    "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY2 || "",
    "X-RapidAPI-Host": "youtube-search-and-download.p.rapidapi.com",
  };
  const response = await fetch(
    `https://youtube-search-and-download.p.rapidapi.com/search?query=${car}&type=v`,
    { headers: headers }
  );
  const result = await response.json();

  return result.contents;
};

import { CarCard, CustomFilter, Hero, SearchBar, ShowMore } from "@/components";
import { fuels, yearsOfProduction } from "@/constants";
import { HomeProps } from "@/types";
import { fetchCars } from "@/utils";

export default async function Home({ searchParams }: HomeProps) {
  const allCars = await fetchCars({
    make: searchParams.make || "",
    model: searchParams.model || "",
    year: searchParams.year || 2022,
    fuel: searchParams.fuel || "",
    limit: searchParams.limit || 10,
  });

  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;

  return (
    <main className="overflow-hidden bg-zinc-900">
      <Hero />
      <div
        className="mt-12 sm:px-16 px-6 py-4 max-w-[1440px] mx-auto"
        id="discover"
      >
        <div className="flex items-center justify-start gap-x-4">
          <h1 className="text-4xl font-extrabold italic text-slate-100">
            Car Catalogue
          </h1>
          <span className="text-slate-300">
            Explore our wide inventory of cars
          </span>
        </div>
        <div className="mt-12 w-full flex-between items-center flex-wrap gap-4">
          <SearchBar />

          <div className="flex justify-start flex-wrap items-center gap-2">
            <CustomFilter title="fuel" options={fuels} />
            <CustomFilter title="year" options={yearsOfProduction} />
          </div>
        </div>

        {!isDataEmpty ? (
          <section>
            <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-8 pt-14">
              {allCars?.map((car) => (
                <CarCard car={car} />
              ))}
            </div>

            <ShowMore
              pageNumber={(searchParams.limit || 10) / 10}
              isNext={(searchParams.limit || 10) > allCars.length}
            />
          </section>
        ) : (
          <div className="mt-16 flex justify-center items-center flex-col gap-2">
            <h2 className="text-slate-100 text-4xl font-bold ">
              <span className="italic">Looks like we don't have it.</span> 😕
            </h2>
            <p>{allCars?.message}</p>
          </div>
        )}
      </div>
    </main>
  );
}

"use client";
import React, { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import { scaleSequentialSqrt, interpolateYlOrRd } from "d3";
import { CountryCollection, Feature } from "@/types";
import VisitedCountriesTable from "@/components/VisitedCountriesTable";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SearchItem from "@/components/SearchItem";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

const Globe = dynamic(
  () => {
    return import("react-globe.gl");
  },
  { ssr: false }
);

const GlobeContainer = () => {
  const [countries, setCountries] = useState<CountryCollection>({
    features: [],
  });
  const [hoverD, setHoverD] = useState<null | object>();
  const [visitedCountries, setVisitedCountries] = useState<Feature[]>([]);
  const [visitedContintents, setVisitedContintents] = useState<string[]>([]);
  const [searchedCountries, setSearchedCountries] = useState<Feature[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const getCountriesData = async () => {
    const response = await fetch("/api/countries", {
      cache: "force-cache",
    });
    const data = await response.json();
    setCountries(data);
  };

  const searchCountries = async () => {
    try {
      if (searchTerm) {
        const res = await fetch(`/api/countries?country=${searchTerm}`);
        const data = await res.json();
        setSearchedCountries(data.features);
      } else {
        setSearchedCountries([]);
      }
    } catch (error) {
      console.error("Error searching countries", error);
    }
  };

  useEffect(() => {
    getCountriesData();
  }, []);

  useEffect(() => {
    searchCountries();
  }, [searchTerm]);

  const colorScale = scaleSequentialSqrt(interpolateYlOrRd);

  const handleVisitedCountries = (country: Feature | any) => {
    //remove __id from country
    delete country.__id;

    //check if country ADMIN is already in visited countries ADMIN
    let visitedName = visitedCountries.map((c) => c.properties.ADMIN);

    //If country is already in visited countries, remove it
    if (visitedName.includes(country.properties.ADMIN)) {
      onCountryRemoval(country);
      return;
    }

    //Find the country in the countries data by ADMIN
    let foundCountry = countries.features.find(
      (c) => c.properties.ADMIN === country.properties.ADMIN
    );

    //Set the visited countries
    setVisitedCountries((prevCountries) => [
      ...prevCountries,
      foundCountry || country,
    ]);
  };

  const onCountryRemoval = (country: Feature) => {
    setVisitedCountries((prev) =>
      prev.filter((c) => c.properties.ADMIN !== country.properties.ADMIN)
    );
  };

  const onScrollDownArrow = () => {
    const searchTable = document.getElementById("countryInfoSection");

    typeof window !== "undefined" &&
      searchTable?.scrollIntoView({ behavior: "smooth" });
  };

  const closeDialogAndEmptySearchedList = () => {
    setOpenDialog(false);
    setSearchedCountries([]);
    setSearchTerm("");
  };

  return (
    <div className="text-white flex flex-col items-center p-6 *:my-3 ">
      <section className="relative flex flex-col items-center">
        <ChevronDownIcon
          className="absolute bottom-[100px] z-10"
          width={50}
          height={50}
          cursor={"pointer"}
          onClick={onScrollDownArrow}
        />
        <Globe
          // width={800}
          //   globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
          backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
          animateIn={true}
          lineHoverPrecision={0}
          polygonsData={countries.features.filter(
            (d) => d.properties.ISO_A2 !== "AQ"
          )}
          polygonAltitude={(d) => (d === hoverD ? 0.07 : 0.06)}
          polygonCapColor={(d: any) => {
            if (visitedCountries.includes(d)) {
              return "#98e866";
            }

            return d === hoverD ? "steelblue" : "#969399";
          }}
          polygonSideColor={() => "rgba(0, 100, 0, 0.15)"}
          polygonStrokeColor={(d) => "#111"}
          polygonLabel={({ properties: d }: any) => `
        <b>${d.ADMIN} (${d.ISO_A2}):</b> <br />
        `}
          onPolygonHover={setHoverD}
          polygonsTransitionDuration={300}
          onPolygonClick={handleVisitedCountries}
        />
      </section>

      <section id="countryInfoSection" className="w-full">
        <Dialog open={openDialog}>
          <DialogTrigger asChild>
            <Button
              variant={"secondary"}
              className="my-8"
              onClick={() => setOpenDialog(true)}
            >
              Search Countries
            </Button>
          </DialogTrigger>
          <DialogContent onInteractOutside={closeDialogAndEmptySearchedList}>
            <DialogHeader>
              <DialogTitle>Country Search</DialogTitle>
              <DialogDescription>Search for countries</DialogDescription>
            </DialogHeader>
            <div>
              <Input
                placeholder="Search for a country"
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-8"
              />
              {searchTerm && (
                <ScrollArea className="h-80">
                  {searchedCountries.map((country, i) => (
                    <SearchItem
                      key={i}
                      country={country}
                      visitedCountries={visitedCountries}
                      handleVisitedCountries={handleVisitedCountries}
                      onCountryRemoval={onCountryRemoval}
                    />
                  ))}
                </ScrollArea>
              )}
            </div>
            <DialogFooter>
              <Button onClick={closeDialogAndEmptySearchedList}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {visitedCountries.length > 0 && (
          <VisitedCountriesTable
            visitedCountries={visitedCountries}
            setVisitedCountries={setVisitedCountries}
          />
        )}
      </section>
    </div>
  );
};

export default GlobeContainer;

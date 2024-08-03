import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";
import { CountryCollection } from "@/types";

export async function GET(req: NextRequest) {
  const country = req.nextUrl.searchParams.get("country");

  // Define the path to the file
  const filePath = path.join(
    process.cwd(),
    "data",
    "ne_110m_admin_0_countries.geojson"
  );

  // Read the file
  const fileContents = await fs.readFile(filePath, "utf8");

  // Parse the file contents as JSON
  let data: CountryCollection = JSON.parse(fileContents);

  const countries = data.features;

  if (country) {
    const filteredCountries = countries.filter((c) =>
      c.properties.ADMIN.toLowerCase().includes(country.toLowerCase().trim())
    );

    data.features = filteredCountries;
  }

  return NextResponse.json(data);
}

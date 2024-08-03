import { Button } from "@/components/ui/button";
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Feature } from "@/types";

interface VisitedCountriesTableProps {
  visitedCountries: Feature[];
  setVisitedCountries: (countries: Feature[]) => void;
}

const VisitedCountriesTable = ({
  visitedCountries,
  setVisitedCountries,
}: VisitedCountriesTableProps) => {
  const handleRemoveOneCountry = (country: Feature) => {
    const newVisitedCountries = visitedCountries.filter(
      (c) => c.properties.ISO_A2 !== country.properties.ISO_A2
    );
    setVisitedCountries(newVisitedCountries);
  };
  return (
    <div>
      <div className="w-full flex items-center *:mr-3">
        <h1 className="font-black ">
          Visited Countries {`(${visitedCountries.length})`}
        </h1>
        <Button variant={"ghost"} onClick={() => setVisitedCountries([])}>
          Clear countries
        </Button>
      </div>

      <Table>
        <TableCaption>Visited Countries data</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="font-black ">Name</TableHead>
            <TableHead className="font-black ">Continent</TableHead>
            <TableHead className="font-black ">Population</TableHead>
            <TableHead className="font-black ">GDP</TableHead>
            <TableHead className="font-black ">Remove</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {visitedCountries.map((country) => (
            <TableRow key={country.properties.ISO_A2}>
              <TableCell>{country.properties.ADMIN}</TableCell>
              <TableCell>{country.properties.CONTINENT}</TableCell>
              <TableCell>{country.properties.POP_EST}</TableCell>
              <TableCell>{country.properties.GDP_MD_EST}</TableCell>
              <TableCell>
                <Button
                  variant={"destructive"}
                  onClick={() => handleRemoveOneCountry(country)}
                >
                  Remove
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default VisitedCountriesTable;

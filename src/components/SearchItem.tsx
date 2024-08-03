import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Feature } from "@/types";

interface SearchItemProps {
  country: Feature;
  visitedCountries: Feature[];
  handleVisitedCountries: (country: Feature) => void;
  onCountryRemoval: (country: Feature) => void;
}

const SearchItem = ({
  country,
  visitedCountries,
  handleVisitedCountries,
  onCountryRemoval,
}: SearchItemProps) => {
  return (
    <Card className="flex flex-wrap justify-between items-center my-2">
      <CardHeader>
        <CardTitle>{country.properties.ADMIN}</CardTitle>
        <CardDescription>{country.properties.CONTINENT}</CardDescription>
      </CardHeader>

      <CardFooter className="flex justify-between pt-6">
        {!visitedCountries
          .map((c) => c.properties.ADMIN)
          .includes(country.properties.ADMIN) ? (
          <Button onClick={() => handleVisitedCountries(country)}>
            Add country
          </Button>
        ) : (
          <Button onClick={() => onCountryRemoval(country)}>
            Remove country
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default SearchItem;

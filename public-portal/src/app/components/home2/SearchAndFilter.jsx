"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

export function SearchAndFilter({
  searchTerm,
  onSearch,
  filters,
  onFilterChange,
  cities,
  states,
  countries,
  onReset,
}) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="space-y-4">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
          <Input
            placeholder="Search mosques by name..."
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="city-filter">City</Label>
            <Select
              value={filters.city}
              onValueChange={(value) =>
                onFilterChange({ ...filters, city: value })
              }
            >
              <SelectTrigger id="city-filter">
                <SelectValue placeholder="Select city" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-cities">All Cities</SelectItem>
                {cities.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="state-filter">State</Label>
            <Select
              value={filters.state}
              onValueChange={(value) =>
                onFilterChange({ ...filters, state: value })
              }
            >
              <SelectTrigger id="state-filter">
                <SelectValue placeholder="Select state" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-states">All States</SelectItem>
                {states.map((state) => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="country-filter">Country</Label>
            <Select
              value={filters.country}
              onValueChange={(value) =>
                onFilterChange({ ...filters, country: value })
              }
            >
              <SelectTrigger id="country-filter">
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-countries">All Countries</SelectItem>
                {countries.map((country) => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            variant="outline"
            onClick={onReset}
            className="flex items-center gap-2"
          >
            <X size={16} />
            Reset Filters
          </Button>
        </div>
      </div>
    </div>
  );
}

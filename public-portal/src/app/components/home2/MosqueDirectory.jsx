"use client";

import { useState } from "react";
import { MosqueList } from "../home2/MosqueList";
import { SearchAndFilter } from "../home2/SearchAndFilter";

export function MosqueDirectory({ mosqueData = [] }) {
  const [mosques, setMosques] = useState(mosqueData);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    city: "",
    state: "",
    country: "",
  });

  // Get unique cities, states, and countries for filter dropdowns
  const cities = [...new Set(mosqueData.map((mosque) => mosque.address.city))];
  const states = [...new Set(mosqueData.map((mosque) => mosque.address.state))];
  const countries = [
    ...new Set(mosqueData.map((mosque) => mosque.address.country)),
  ];

  const handleSearch = (term) => {
    setSearchTerm(term);
    filterMosques(term, filters);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    filterMosques(searchTerm, newFilters);
  };

  const filterMosques = (term, filterValues) => {
    let filtered = mosqueData;

    // Apply search filter
    if (term) {
      filtered = filtered.filter((mosque) =>
        mosque.name.toLowerCase().includes(term.toLowerCase())
      );
    }

    // Apply location filters
    if (filterValues.city && filterValues.city !== "all") {
      filtered = filtered.filter(
        (mosque) =>
          mosque.address.city.toLowerCase() === filterValues.city.toLowerCase()
      );
    }

    if (filterValues.state && filterValues.state !== "all") {
      filtered = filtered.filter(
        (mosque) =>
          mosque.address.state.toLowerCase() ===
          filterValues.state.toLowerCase()
      );
    }

    if (filterValues.country && filterValues.country !== "all") {
      filtered = filtered.filter(
        (mosque) =>
          mosque.address.country.toLowerCase() ===
          filterValues.country.toLowerCase()
      );
    }

    setMosques(filtered);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setFilters({
      city: "",
      state: "",
      country: "",
    });
    setMosques(mosqueData);
  };

  return (
    <div className="space-y-6">
      <SearchAndFilter
        searchTerm={searchTerm}
        onSearch={handleSearch}
        filters={filters}
        onFilterChange={handleFilterChange}
        cities={cities}
        states={states}
        countries={countries}
        onReset={resetFilters}
      />
      <MosqueList mosques={mosques} />
    </div>
  );
}

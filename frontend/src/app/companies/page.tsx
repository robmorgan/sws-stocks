"use client";

import { useState, useEffect } from "react";
import CompanyList from "../../components/CompanyList";
import FilterControls from "../../components/FilterControls";
import { fetchCompanies } from "../../lib/api";
import { Company, Filters } from "../../interfaces";

export default function CompaniesPage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [filters, setFilters] = useState<Filters>({});
  const [sort, setSort] = useState<string>("");

  useEffect(() => {
    loadCompanies();
  }, [filters, sort]);

  const loadCompanies = async () => {
    try {
      const data = await fetchCompanies(filters, sort);
      setCompanies(data);
    } catch (error) {
      console.error("Failed to fetch companies:", error);
    }
  };

  return (
    <div>
      <FilterControls onFilterChange={setFilters} onSortChange={setSort} />
      <CompanyList companies={companies} />
    </div>
  );
}

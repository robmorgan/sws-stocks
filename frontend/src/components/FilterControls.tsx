import React, { useState } from "react";
import { Filters } from "../interfaces";

interface FilterControlsProps {
  onFilterChange: (updater: (prevFilters: Filters) => Filters) => void;
  onSortChange: (sort: string) => void;
}

export default function FilterControls({
  onFilterChange,
  onSortChange,
}: FilterControlsProps) {
  const [exchangeSymbol, setExchangeSymbol] = useState("");
  const [minScore, setMinScore] = useState("");
  const [sortBy, setSortBy] = useState("score");

  const handleExchangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setExchangeSymbol(e.target.value);
    onFilterChange((prev) => ({ ...prev, exchange_symbol: e.target.value }));
  };

  const handleScoreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinScore(e.target.value);
    onFilterChange((prev) => ({ ...prev, min_score: e.target.value }));
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
    onSortChange(e.target.value);
  };

  const handleReset = () => {
    setExchangeSymbol("");
    setMinScore("");
    setSortBy("score");
    onFilterChange(() => ({
      exchange_symbol: "",
      min_score: "",
    }));
    onSortChange("score");
  };

  return (
    <div className="mb-4 flex flex-wrap gap-4">
      <select
        className="select select-bordered w-full max-w-xs"
        defaultValue=""
        onChange={handleExchangeChange}
      >
        <option disabled>Select Exchange</option>
        <option value="">All Exchanges</option>
        <option value="ASX">ASX</option>
        <option value="NYSE">NYSE</option>
        <option value="NasdaqGS">NASDAQ</option>
      </select>

      <input
        type="number"
        placeholder="Minimum Score"
        className="input input-bordered w-full max-w-xs"
        onChange={handleScoreChange}
      />

      <select
        className="select select-bordered w-full max-w-xs"
        defaultValue="score"
        onChange={handleSortChange}
      >
        <option disabled>Sort by</option>
        <option value="score">Score</option>
        <option value="volatility">Volatility</option>
      </select>

      <button className="btn btn-primary" onClick={handleReset}>
        Reset Filters
      </button>
    </div>
  );
}

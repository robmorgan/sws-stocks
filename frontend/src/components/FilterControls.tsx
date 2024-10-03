import { Filters } from "../types";

interface FilterControlsProps {
  onFilterChange: (filters: Filters) => void;
  onSortChange: (sort: string) => void;
}

export default function FilterControls({
  onFilterChange,
  onSortChange,
}: FilterControlsProps) {
  const handleExchangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange((prev) => ({ ...prev, exchange_symbol: e.target.value }));
  };

  const handleScoreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange((prev) => ({ ...prev, min_score: e.target.value }));
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSortChange(e.target.value);
  };

  return (
    <div className="mb-4 flex flex-wrap gap-4">
      <select
        className="select select-bordered w-full max-w-xs"
        onChange={handleExchangeChange}
      >
        <option disabled selected>
          Select Exchange
        </option>
        <option value="">All Exchanges</option>
        <option value="ASX">ASX</option>
        <option value="NYSE">NYSE</option>
        <option value="NASDAQ">NASDAQ</option>
      </select>

      <input
        type="number"
        placeholder="Minimum Score"
        className="input input-bordered w-full max-w-xs"
        onChange={handleScoreChange}
      />

      <select
        className="select select-bordered w-full max-w-xs"
        onChange={handleSortChange}
      >
        <option disabled selected>
          Sort by
        </option>
        <option value="">Default</option>
        <option value="score">Score</option>
        <option value="volatility">Volatility</option>
      </select>

      <button
        className="btn btn-primary"
        onClick={() => {
          /* Implement reset functionality */
        }}
      >
        Reset Filters
      </button>
    </div>
  );
}

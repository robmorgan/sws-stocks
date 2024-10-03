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
      <select onChange={handleExchangeChange} className="border rounded p-2">
        <option value="">All Exchanges</option>
        <option value="NYSE">NYSE</option>
        <option value="NASDAQ">NASDAQ</option>
      </select>
      <input
        type="number"
        placeholder="Minimum Score"
        onChange={handleScoreChange}
        className="border rounded p-2"
      />
      <select onChange={handleSortChange} className="border rounded p-2">
        <option value="">Sort by</option>
        <option value="score">Score</option>
        <option value="volatility">Volatility</option>
      </select>
    </div>
  );
}

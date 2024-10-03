import { Company } from "../types";

interface CompanyCardProps {
  company: Company;
}

export default function CompanyCard({ company }: CompanyCardProps) {
  return (
    <div className="border rounded-lg p-4 shadow-md">
      <h2 className="text-xl font-semibold">{company.name}</h2>
      <p>Symbol: {company.unique_symbol}</p>
      <p>Last Price: ${company.last_price.toFixed(2)}</p>
      <p>Score: {company.score}</p>
    </div>
  );
}

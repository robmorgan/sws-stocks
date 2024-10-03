import { Company } from "../interfaces";

interface CompanyCardProps {
  company: Company;
}

export default function CompanyCard({ company }: CompanyCardProps) {
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{company.name}</h2>
        <p>Symbol: {company.unique_symbol}</p>
        <p>Last Price: ${company.last_price.toFixed(2)}</p>
        <p>Score: {company.score}</p>
      </div>
    </div>
  );
}

import { Company } from "../interfaces";
import MiniChart from "./MiniChart";

interface CompanyCardProps {
  company: Company;
}

export default function CompanyCard({ company }: CompanyCardProps) {
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body p-4">
        <div className="flex justify-between items-center">
          <div className="flex-grow">
            <h2 className="card-title text-lg mb-2">{company.name}</h2>
            <p className="text-sm">Symbol: {company.unique_symbol}</p>
            <p className="text-sm">
              Last Price: ${company.last_price.toFixed(2)}
            </p>
            <p className="text-sm">Score: {company.score}</p>
          </div>
          <div className="w-1/3 h-24 ml-4">
            <MiniChart data={company.prices} />
          </div>
        </div>
      </div>
    </div>
  );
}

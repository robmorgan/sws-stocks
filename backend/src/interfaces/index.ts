export interface Company {
  id: string;
  name: string;
  ticker_symbol: string | null;
  exchange_symbol: string | null;
  unique_symbol: string | null;
  score: number | null;
  last_price: number | null;
  prices: { date: string; price: number }[];
}

// TODO - remove this if we use the `prices` field in the Company interface
export interface CompanyPrice {
  date: string;
  price: number;
}

export interface Filters {
  exchange_symbol?: string;
  min_score?: number;
}

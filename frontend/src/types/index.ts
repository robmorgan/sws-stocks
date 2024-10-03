export interface Company {
  id: string;
  name: string;
  ticker_symbol: string;
  exchange_symbol: string;
  unique_symbol: string;
  score: number;
  last_price: number;
}

export interface Filters {
  exchange_symbol?: string;
  min_score?: string;
}

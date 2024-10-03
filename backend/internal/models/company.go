package models

type Company struct {
	ID             string  `json:"id"`
	Name           string  `json:"name"`
	TickerSymbol   string  `json:"ticker_symbol"`
	ExchangeSymbol string  `json:"exchange_symbol"`
	UniqueSymbol   string  `json:"unique_symbol"`
	Score          int     `json:"score"`
	LastPrice      float64 `json:"last_price"`
}

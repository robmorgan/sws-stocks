package services

import (
	"database/sql"
	"fmt"

	"github.com/robmorgan/sws-stocks/backend/internal/models"
)

type CompanyService struct {
	DB *sql.DB
}

func NewCompanyService(db *sql.DB) *CompanyService {
	return &CompanyService{DB: db}
}

func (s *CompanyService) GetCompanies(sort string, filter map[string]string, includePrices bool) ([]models.Company, error) {
	// Set up the SQL query based on the provided sort and filter parameters. Not I'm skipping an ORM here
	// for simplicity, preferring to write the SQL queries directly.
	query := `
		SELECT c.id, c.name, c.ticker_symbol, c.exchange_symbol, c.unique_symbol, s.total as score,
		(SELECT price FROM swsCompanyPriceClose WHERE company_id = c.id ORDER BY date DESC LIMIT 1) as last_price
		FROM swsCompany c
		LEFT JOIN swsCompanyScore s ON c.score_id = s.id
	`

	whereClause := ""
	args := []interface{}{}

	if exchangeSymbol, ok := filter["exchange_symbol"]; ok {
		whereClause += " WHERE c.exchange_symbol = ?"
		args = append(args, exchangeSymbol)
	}

	if minScore, ok := filter["min_score"]; ok {
		if whereClause == "" {
			whereClause += " WHERE"
		} else {
			whereClause += " AND"
		}
		whereClause += " s.total >= ?"
		args = append(args, minScore)
	}

	query += whereClause

	if sort == "score" {
		query += " ORDER BY s.total DESC"
	} else if sort == "volatility" {
		// TODO - triple check this is working correctly with sqlite3.
		query += `
			ORDER BY (
				SELECT MAX(price) - MIN(price)
				FROM swsCompanyPriceClose
				WHERE company_id = c.id AND date >= date('now', '-90 days')
			) DESC
		`
	}

	rows, err := s.DB.Query(query, args...)
	if err != nil {
		return nil, fmt.Errorf("error querying companies: %v", err)
	}
	defer rows.Close()

	var companies []models.Company
	for rows.Next() {
		var c models.Company
		err := rows.Scan(&c.ID, &c.Name, &c.TickerSymbol, &c.ExchangeSymbol, &c.UniqueSymbol, &c.Score, &c.LastPrice)
		if err != nil {
			return nil, fmt.Errorf("error scanning company row: %v", err)
		}

		// Gather the price history for the company
		if includePrices {
			prices, err := s.GetCompanyPrices(c.ID)
			if err != nil {
				return nil, fmt.Errorf("error getting company prices: %v", err)
			}
			c.Prices = prices
		}

		companies = append(companies, c)
	}

	return companies, nil
}

func (s *CompanyService) GetCompanyPrices(companyID string) ([]models.Price, error) {
	query := `
        SELECT date, price 
        FROM swsCompanyPriceClose 
        WHERE company_id = ? 
        ORDER BY date DESC 
        LIMIT 90
    `

	rows, err := s.DB.Query(query, companyID)
	if err != nil {
		return nil, fmt.Errorf("error querying company prices: %v", err)
	}
	defer rows.Close()

	var prices []models.Price
	for rows.Next() {
		var p models.Price
		err := rows.Scan(&p.Date, &p.Price)
		if err != nil {
			return nil, fmt.Errorf("error scanning price row: %v", err)
		}
		prices = append(prices, p)
	}

	return prices, nil
}

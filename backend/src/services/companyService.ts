import db from "../db/connection";
import { Company, CompanyPrice, Filters } from "../interfaces";

export class CompanyService {
  getCompanies(
    filters: Filters = {},
    sort: string = "",
    includePrices: boolean
  ): Company[] {
    // Set up the SQL query based on the provided sort and filter parameters. Note: I'm skipping an ORM here
    // for simplicity, preferring to write the SQL queries directly.
    let query = `
      SELECT 
        c.id, c.name, c.ticker_symbol, c.exchange_symbol, c.unique_symbol, s.total as score,
        (SELECT price FROM swsCompanyPriceClose WHERE company_id = c.id ORDER BY date DESC LIMIT 1) as last_price
      FROM swsCompany c
      LEFT JOIN swsCompanyScore s ON c.score_id = s.id
    `;

    let whereClause = ``;
    const params: any[] = [];

    if (filters.exchange_symbol) {
      whereClause += ` WHERE c.exchange_symbol = ?`;
      params.push(filters.exchange_symbol);
    }

    if (filters.min_score) {
      if (whereClause !== "") {
        whereClause += ` AND s.total >= ?`;
      } else {
        whereClause += ` WHERE s.total >= ?`;
      }
      params.push(filters.min_score);
    }

    query += whereClause;

    if (sort === "score") {
      query += ` ORDER BY s.total DESC`;
    } else if (sort === "volatility") {
      query += `
        ORDER BY (
          SELECT MAX(price) - MIN(price)
          FROM swsCompanyPriceClose
          WHERE company_id = c.id AND date >= date('now', '-90 days')
        ) DESC
      `;
    }

    const stmt = db.prepare(query);
    let companies = stmt.all(...params) as Company[];

    // Fetch prices for each company
    if (includePrices) {
      for (const company of companies) {
        company.prices = this.getCompanyPrices(company.id);
      }
    }

    return companies;
  }

  getCompanyPrices(companyId: string, limit: number = 90): CompanyPrice[] {
    const query = `
      SELECT date, price
      FROM swsCompanyPriceClose
      WHERE company_id = ?
      ORDER BY date DESC
      LIMIT ?
    `;
    const stmt = db.prepare(query);
    return stmt.all(companyId, limit) as CompanyPrice[];
  }
}

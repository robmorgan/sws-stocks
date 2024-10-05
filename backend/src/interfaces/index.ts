/**
 * @swagger
 * components:
 *   schemas:
 *     Company:
 *       type: object
 *       required:
 *         - id
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the company
 *         name:
 *           type: string
 *           description: The company name
 *         ticker_symbol:
 *           type: string
 *           description: The company's ticker symbol
 *         exchange_symbol:
 *           type: string
 *           description: The exchange symbol
 *         unique_symbol:
 *           type: string
 *           description: The unique symbol
 *         score:
 *           type: number
 *           description: The company's score
 *         last_price:
 *           type: number
 *           description: The last known price of the company's stock
 *         prices:
 *           type: array
 *           description: The company's stock price history
 *           items:
 *              $ref: '#/components/schemas/CompanyPrice'
 *     CompanyPrice:
 *       type: object
 *       required:
 *         - date
 *         - price
 *       properties:
 *         date:
 *           type: string
 *           format: date
 *           description: The date of the price
 *         price:
 *           type: number
 *           description: The stock price
 */

export interface Company {
  id: string;
  name: string;
  ticker_symbol: string | null;
  exchange_symbol: string | null;
  unique_symbol: string | null;
  score: number | null;
  last_price: number | null;
  prices: CompanyPrice[];
}

export interface CompanyPrice {
  date: string;
  price: number;
}

export interface Filters {
  exchange_symbol?: string;
  min_score?: number;
}

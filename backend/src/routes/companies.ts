import express from "express";
import { CompanyController } from "../controllers/companyController";

const router = express.Router();
const companyController = new CompanyController();

/**
 * @swagger
 * /api/companies:
 *   get:
 *     summary: Retrieve a list of companies
 *     description: Retrieve a list of companies. Can be filtered by exchange symbol and minimum score.
 *     parameters:
 *       - in: query
 *         name: exchange_symbol
 *         schema:
 *           type: string
 *         description: Filter by exchange symbol
 *       - in: query
 *         name: min_score
 *         schema:
 *           type: number
 *         description: Filter by minimum score
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [score, volatility]
 *         description: Sort companies by score or volatility
 *     responses:
 *       200:
 *         description: A list of companies.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Company'
 */
router.get("/v1/companies", companyController.getCompanies);

export default router;

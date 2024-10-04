import { Request, Response } from "express";
import { CompanyService } from "../services/companyService";
import logger from "../utils/logger";

const companyService = new CompanyService();

export class CompanyController {
  getCompanies(req: Request, res: Response) {
    try {
      const { exchange_symbol, min_score, sort, includePrices } = req.query;
      const filters = {
        exchange_symbol: exchange_symbol as string | undefined,
        min_score: min_score ? Number(min_score) : undefined,
      };

      const companies = companyService.getCompanies(
        filters,
        sort as string,
        includePrices === "true"
      );
      logger.info("Companies fetched successfully", {
        count: companies.length,
      });
      res.json(companies);
    } catch (error) {
      logger.error("Error fetching companies", { error });
      res
        .status(500)
        .json({ error: "An error occurred while fetching companies" });
    }
  }
}

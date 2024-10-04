import { Request, Response } from "express";
import { CompanyService } from "../services/companyService";
import logger from "../utils/logger";

const companyService = new CompanyService();

export class CompanyController {
  getCompanies(req: Request, res: Response) {
    try {
      const { exchange_symbol, min_score, sort } = req.query;
      const filters = {
        exchange_symbol: exchange_symbol as string | undefined,
        min_score: min_score ? Number(min_score) : undefined,
      };
      const companies = companyService.getCompanies(filters, sort as string);
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

  getCompany(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const company = companyService.getCompanyById(id);
      if (company) {
        const prices = companyService.getCompanyPrices(id);
        logger.info("Company fetched successfully", { id });
        res.json({ ...company, prices });
      } else {
        logger.warn("Company not found", { id });
        res.status(404).json({ error: "Company not found" });
      }
    } catch (error) {
      logger.error("Error fetching company", { error, id: req.params.id });
      res
        .status(500)
        .json({ error: "An error occurred while fetching the company" });
    }
  }
}

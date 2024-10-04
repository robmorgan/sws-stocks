import express from "express";
import cors from "cors";
import helmet from "helmet";
import { CompanyController } from "./controllers/companyController";
import logger from "./utils/logger";

// Initialize express app
const app = express();

// Apply middleware
app.use(helmet()); // Helps secure your app by setting various HTTP headers
app.use(cors()); // Enable All CORS Requests
app.use(express.json()); // Parse JSON bodies

// Logging middleware
app.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    logger.info(`${req.method} ${req.url}`, {
      ip: req.ip,
      userAgent: req.get("User-Agent"),
    });
    next();
  }
);

// Initialize controllers
const companyController = new CompanyController();

// Define routes
app.get("/", (req: express.Request, res: express.Response) => {
  res.json({ message: "Welcome to sws-stocks API" });
});
app.get("/v1/companies", companyController.getCompanies);
app.get("/v1/companies/:id", companyController.getCompany);

// Error handling middleware
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    logger.error("Unhandled error", {
      error: err.message,
      stack: err.stack,
      url: req.url,
      method: req.method,
    });
    res.status(500).send("Something broke!");
  }
);

// 404 route
app.use((req: express.Request, res: express.Response) => {
  logger.warn("404 Not Found", { url: req.url, method: req.method });
  res.status(404).send("Sorry, that route does not exist.");
});

export default app;

import express from "express";
import cors from "cors";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import logger from "./utils/logger";
import swaggerSpec from "./config/swagger";
import companiesRouter from "./routes/companies";

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

// Serve Swagger API documentation. Note: If the data from this API is meant to be private, then we'd avoid doing this
// in production.
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    swaggerOptions: {
      url: "http://api.traefik.me/swagger.json",
    },
  })
);

// Define routes
app.use("/", companiesRouter);
app.get("/", (req: express.Request, res: express.Response) => {
  res.json({ message: "Welcome to sws-stocks API" });
});

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

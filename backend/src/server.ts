import app from "./app";
import db from "./db/connection";
import logger from "./utils/logger";

const PORT = process.env.PORT || 8080;

// Ensure database connection is established
db.prepare("SELECT 1").run();
logger.info("Database connection established");

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});

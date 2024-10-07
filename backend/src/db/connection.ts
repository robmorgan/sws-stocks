import Database from "better-sqlite3";
import path from "path";

const db = new Database(path.join(__dirname, "../../database/sws.sqlite3"), {
  readonly: true,
});

// Enable foreign key constraints
db.pragma("foreign_keys = ON");

export default db;

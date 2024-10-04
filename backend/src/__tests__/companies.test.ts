import Database from "better-sqlite3";
import path from "path";
import fs from "fs";
import request from "supertest";
import app from "../app";

const TEST_DB_PATH = "../../../database/testdb.sqlite3";

describe("Company API", () => {
  let db: Database.Database;

  beforeAll(async () => {
    // Copy your existing database to a test database
    fs.copyFileSync("../../../database/sws.sqlite3", TEST_DB_PATH);

    db = new Database(TEST_DB_PATH, { readonly: false }); // TODO - turn read-only on?
    db.pragma("foreign_keys = ON");

    // Replace the database connection in your app
    jest.mock("../db/connection", () => ({
      __esModule: true,
      default: db,
    }));
  });

  afterAll(async () => {
    // close the database connection and remove the test database
    db.close();
    fs.unlinkSync(TEST_DB_PATH);
  });

  it("GET /api/companies should return all companies", async () => {
    const response = await request(app).get("/api/companies");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });
});

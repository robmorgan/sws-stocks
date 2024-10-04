import request from "supertest";
import { createConnection, getConnection } from "typeorm"; // TODO - don't use these deprecated classes
import { Company, CompanyScore, CompanyPriceClose } from "../entities/Company";
import app from "../app"; // Import the Express app
import fs from "fs";

const TEST_DB = "./test.sqlite";

describe("Company API", () => {
  beforeAll(async () => {
    // Copy your existing database to a test database
    fs.copyFileSync("./path/to/your/existing/database.sqlite", TEST_DB);

    // Create a test database connection
    await createConnection({
      type: "sqlite",
      database: TEST_DB,
      entities: [Company, CompanyScore, CompanyPriceClose],
      synchronize: false,
      logging: false,
    });
  });
});

afterAll(async () => {
  // Close the test database connection
  const conn = getConnection();
  await conn.close();

  // Optionally, remove the test database
  fs.unlinkSync(TEST_DB);
});

it("GET /api/companies should return all companies", async () => {
  const response = await request(app).get("/api/companies");
  expect(response.status).toBe(200);
  expect(Array.isArray(response.body)).toBeTruthy();
});

it("GET /api/companies?minScore=80 should return companies with score >= 80", async () => {
  const response = await request(app).get("/api/companies?minScore=80");
  expect(response.status).toBe(200);
  expect(Array.isArray(response.body)).toBeTruthy();
  response.body.forEach((company: any) => {
    expect(company.score).toBeGreaterThanOrEqual(80);
  });
});

it("GET /api/companies/:id should return a specific company", async () => {
  // Assume we know an existing company ID
  const companyId = "some-known-id";
  const response = await request(app).get(`/api/companies/${companyId}`);
  expect(response.status).toBe(200);
  expect(response.body.id).toBe(companyId);
});

it("POST /api/companies should create a new company", async () => {
  const newCompany = {
    name: "Test Company",
    ticker_symbol: "TEST",
    exchange_symbol: "NYSE",
    unique_symbol: "NYSE:TEST",
    score: 75,
  };
  const response = await request(app).post("/api/companies").send(newCompany);
  expect(response.status).toBe(201);
  expect(response.body.name).toBe(newCompany.name);
});

import request from "supertest";
import app from "../app";
import db from "../db/connection";

describe("Company API", () => {
  afterAll(async () => {
    // close the database connection
    db.close();
  });

  it("GET /v1/companies should return all companies", async () => {
    const response = await request(app).get("/v1/companies");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    // There are 12 companies in total in the database
    expect(response.body.length).toBe(12);
  });

  it("GET /v1/companies?min_score=13 should return companies with a score of 13 or higher", async () => {
    const response = await request(app).get("/v1/companies?min_score=13");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toBe(5);
  });

  it("GET /v1/companies?includePrices=true should return companies with prices", async () => {
    const response = await request(app).get("/v1/companies?includePrices=true");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body[0].prices).toBeDefined();
    // check for at least 40 data points
    expect(response.body[0].prices.length).toBeGreaterThan(40);
  });

  it("GET /v1/companies?exchange_symbol=ASX should only return companies from the ASX exchange", async () => {
    const response = await request(app).get(
      "/v1/companies?exchange_symbol=ASX"
    );
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toBe(3);
  });

  it("GET /v1/companies?exchange_symbol=NasdaqGS&min_score=13 should return companies with a score of 13 or higher from the NasdaqGS exchange", async () => {
    const response = await request(app).get(
      "/v1/companies?exchange_symbol=NasdaqGS&min_score=13"
    );
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toBe(2);
  });
});

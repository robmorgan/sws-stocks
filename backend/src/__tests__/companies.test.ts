import request from "supertest";
import app from "../app";
import db from "../db/connection";

describe("Company API", () => {
  beforeAll(async () => {
    // Replace the database connection in your app
    // jest.mock("../db/connection", () => ({
    //   __esModule: true,
    //   default: db,
    // }));
  });

  afterAll(async () => {
    // close the database connection
    db.close();
  });

  it("GET /v1/companies should return all companies", async () => {
    const response = await request(app).get("/v1/companies");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });
});

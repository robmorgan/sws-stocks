import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "SWS Stocks API",
      version: "1.0.0",
      description: "Provides financial data on various companies.",
    },
    servers: [
      {
        url: "http://localhost:8080",
        description: "Development server",
      },
      {
        url: "http://api.traefik.me",
        description: "Production server",
      },
    ],
  },
  apis: ["./src/routes/*.ts", "./src/interfaces/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;

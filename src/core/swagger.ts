import Swagger from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description: "API documentation for the Express server",
    },
    servers: [
      {
        url: `http://localhost:${process.env.API_PORT || 8080}`,
      },
    ],
  },
  apis: ["./src/modules/**/*.routes.ts"],
};

const swaggerDocs = Swagger(swaggerOptions);
export default swaggerDocs;

import postgres from "postgres";

export const sql = postgres({
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  database: process.env.POSTGRES_NAME,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

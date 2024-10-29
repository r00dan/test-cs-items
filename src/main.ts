import "reflect-metadata";
import dotenv from "dotenv";

import { App } from "./app";

dotenv.config();
const DEFAULT_PORT = 3000;
const app = new App();

app.start(Number(process.env.API_PORT) || DEFAULT_PORT);

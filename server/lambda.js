import serverlessExpress from "@vendia/serverless-express";
import { app } from "./index.js";

// Wrap the Express app once at cold-start time (not per invocation)
export const handler = serverlessExpress({ app });

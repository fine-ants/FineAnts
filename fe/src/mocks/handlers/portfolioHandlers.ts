import { HTTPSTATUS } from "@api/types";
import {
  successfulPortfolioData,
  successfulPortfolioDetailsData,
} from "mocks/data/portfolioData";
import { rest } from "msw";

export default [
  // List of portfolios
  rest.get("/api/portfolios", async (_, res, ctx) => {
    return res(
      ctx.status(HTTPSTATUS.success),
      ctx.json(successfulPortfolioData)
    );
  }),

  // Portfolio details
  rest.get("/api/portfolio/:portfolioId/holdings", async (_, res, ctx) => {
    return res(
      ctx.status(HTTPSTATUS.success),
      ctx.json(successfulPortfolioDetailsData)
    );
  }),
];

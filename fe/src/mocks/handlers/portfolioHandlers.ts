import { HTTPSTATUS } from "@api/types";
import { successfulPortfolioData } from "mocks/data/portfolioData";
import { rest } from "msw";

export default [
  rest.get("/api/portfolios", async (_, res, ctx) => {
    return res(
      ctx.status(HTTPSTATUS.success),
      ctx.json(successfulPortfolioData)
    );
  }),
];

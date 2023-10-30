import { HTTPSTATUS } from "@api/types";
import {
  portfolioHoldings,
  successfulGetPortfolioDetailsResponse,
  successfulGetPortfolioResponse,
  successfulPortfolioHoldingPurchaseDeleteResponse,
} from "mocks/data/portfolioData";
import { rest } from "msw";

export default [
  // List of portfolios
  rest.get("/api/portfolios", async (_, res, ctx) => {
    return res(
      ctx.status(HTTPSTATUS.success),
      ctx.json(successfulGetPortfolioResponse)
    );
  }),

  // Portfolio details
  rest.get("/api/portfolio/:portfolioId/holdings", async (_, res, ctx) => {
    return res(
      ctx.status(HTTPSTATUS.success),
      ctx.json(successfulGetPortfolioDetailsResponse)
    );
  }),

  // Delete portfolio holding purchase history
  rest.delete(
    "/api/portfolio/:portfolioId/holdings/:portfolioHoldingId/purchaseHistory/:purchaseHistoryId",
    async (req, res, ctx) => {
      const { portfolioHoldingId, purchaseHistoryId } = req.params;

      // Mutate portfolio holding purchase history data
      const targetPortfolioHolding = portfolioHoldings.find(
        (holding) => holding.portfolioHoldingId === Number(portfolioHoldingId)
      );
      const targetPurchaseHistoryIndex =
        targetPortfolioHolding?.purchaseHistory.findIndex(
          (purchase) => purchase.purchaseHistoryId === Number(purchaseHistoryId)
        );
      targetPortfolioHolding?.purchaseHistory.splice(
        targetPurchaseHistoryIndex!,
        1
      );

      return res(
        ctx.status(HTTPSTATUS.success),
        ctx.json(successfulPortfolioHoldingPurchaseDeleteResponse)
      );
    }
  ),
];

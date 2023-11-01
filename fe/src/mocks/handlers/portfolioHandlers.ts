import { HTTPSTATUS } from "@api/types";
import { calculateRate } from "@utils/calculations";
import {
  portfolioHoldings,
  successfulGetPortfolioDetailsResponse,
  successfulGetPortfolioResponse,
  successfulPortfolioAddData,
  successfulPortfolioDeleteData,
  successfulPortfolioEditData,
  successfulPortfolioHoldingPurchaseAddResponse,
  successfulPortfolioHoldingPurchaseDeleteResponse,
} from "mocks/data/portfolioData";
import { portfolioDetails } from "mocks/data/portfolioDetailsData";
import { rest } from "msw";

const portfolioDetailsData = portfolioDetails;

type EditPortfolioReq = {
  name: string;
  securitiesFirm: string;
  budget: number;
  targetGain: number;
  maximumLoss: number;
};

export default [
  // List of portfolios
  rest.get("/api/portfolios", async (_, res, ctx) => {
    return res(
      ctx.status(HTTPSTATUS.success),
      ctx.json(successfulGetPortfolioResponse)
    );
  }),

  // Portfolio details
  rest.get("/api/portfolio/:portfolioId/holdings", async (req, res, ctx) => {
    const portfolioId = req.params.portfolioId;

    const resPortfolioDetailsData = {
      ...successfulGetPortfolioDetailsResponse,
    };
    resPortfolioDetailsData.data.portfolioDetails =
      portfolioDetailsData[Number(portfolioId) - 1];

    return res(
      ctx.status(HTTPSTATUS.success),
      ctx.json(resPortfolioDetailsData)
    );
  }),

  // Add Portfolio
  rest.post("/api/portfolios", async (req, res, ctx) => {
    const { name, securitiesFirm, budget, targetGain, maximumLoss } =
      req.body as EditPortfolioReq;

    const targetReturnRate = calculateRate(targetGain, budget);
    const maximumLossRate = ((budget - maximumLoss) / budget) * 100;

    const data = {
      id: portfolioDetails.length + 1,
      securitiesFirm: securitiesFirm,
      name: name,
      budget: budget,
      targetGain: targetGain,
      targetReturnRate: targetReturnRate,
      maximumLoss: maximumLoss,
      maximumLossRate: maximumLossRate,
      currentValuation: 0,
      investedAmount: 0,
      totalGain: 0,
      totalGainRate: 0,
      dailyGain: 0,
      dailyGainRate: 0,
      balance: 0,
      totalAnnualDividend: 0,
      totalAnnualDividendYield: 0,
      annualInvestmentDividendYield: 0,
      provisionalLossBalance: 0,
    };

    portfolioDetailsData.push(data);

    return res(
      ctx.status(HTTPSTATUS.success),
      ctx.json({
        ...successfulPortfolioAddData,
        data: {
          portfolioId: portfolioDetailsData.length,
        },
      })
    );
  }),

  // Edit Portfolio
  rest.put("/api/portfolios/:portfolioId", async (req, res, ctx) => {
    const portfolioId = Number(req.params.portfolioId);
    const { budget, targetGain, maximumLoss } = req.body as EditPortfolioReq;

    const targetReturnRate = calculateRate(targetGain, budget);
    const maximumLossRate = ((budget - maximumLoss) / budget) * 100;

    portfolioDetailsData[portfolioId - 1] = {
      ...portfolioDetailsData[portfolioId - 1],
      ...{
        ...(req.body as EditPortfolioReq),
        targetReturnRate: targetReturnRate,
        maximumLossRate: maximumLossRate,
      },
    };

    return res(
      ctx.status(HTTPSTATUS.success),
      ctx.json(successfulPortfolioEditData)
    );
  }),

  // Delete Portfolio
  rest.delete("/api/portfolios/:portfolioId", async (req, res, ctx) => {
    const portfolioId = Number(req.params.portfolioId);
    portfolioDetailsData.splice(portfolioId - 1, 1);

    return res(
      ctx.status(HTTPSTATUS.success),
      ctx.json(successfulPortfolioDeleteData)
    );
  }),

  // Add portfolio holding purchase history
  rest.post(
    "/api/portfolio/:portfolioId/holdings/:portfolioHoldingId/purchaseHistory",
    async (req, res, ctx) => {
      const { portfolioHoldingId } = req.params;
      const body = await req.json();

      const targetPortfolioHolding = portfolioHoldings.find(
        (holding) => holding.portfolioHoldingId === Number(portfolioHoldingId)
      );
      targetPortfolioHolding?.purchaseHistory.push({
        purchaseHistoryId: Math.random(),
        ...body,
      });

      return res(
        ctx.status(HTTPSTATUS.success),
        ctx.json(successfulPortfolioHoldingPurchaseAddResponse)
      );
    }
  ),

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

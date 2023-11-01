import { HTTPSTATUS } from "@api/types";
import { calculateRate } from "@utils/calculate";
import {
  successfulPortfolioAddData,
  successfulPortfolioData,
  successfulPortfolioDeleteData,
  successfulPortfolioDetailsData,
  successfulPortfolioEditData,
} from "mocks/data/portfolioData";
import { portfolioDetails } from "mocks/data/portfolioDetailsData";
import { rest } from "msw";

let portfolioDetailsData = portfolioDetails;

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
      ctx.json(successfulPortfolioData)
    );
  }),

  // Portfolio details
  rest.get("/api/portfolio/:portfolioId/holdings", async (req, res, ctx) => {
    const portfolioId = req.params.portfolioId;

    const resPortfolioDetailsData = {
      ...successfulPortfolioDetailsData,
      data: portfolioDetailsData[Number(portfolioId) - 1],
    };

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
      portfolioDetails: {
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
      },
      portfolioHoldings: [],
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

    portfolioDetailsData[portfolioId - 1].portfolioDetails = {
      ...portfolioDetailsData[portfolioId - 1].portfolioDetails,
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
];

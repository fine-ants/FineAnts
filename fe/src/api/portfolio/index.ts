import { fetcher } from "@api/fetcher";
import { Response } from "@api/types";

export type PieChartType = {
  name: string;
  value: number;
  fill: string;
};

export type Portfolio = {
  portfolioDetails: PortfolioDetails;
  portfolioHoldings: PortfolioHolding[];
};

export type PortfolioDetails = {
  id: number;
  name: string;
  budget: number;
  targetGain: number;
  targetReturnRate: number;
  maximumLoss: number;
  maximumLossRate: number;
  investedAmount: number;
  totalGain: number;
  totalGainRate: number;
  dailyGain: number;
  dailyGainRate: number;
  balance: number;
  totalAnnualDividend: number;
  totalAnnualDividendYield: number;
  annualInvestmentDividendYield: number;
  provisionalLossBalance: number;
};

export type PortfolioHolding = {
  companyName: string;
  tickerSymbol: string;
  portfolioHoldingId: number;
  currentValuation: number;
  currentPrice: number;
  averageCostPerShare: number;
  numShares: number;
  dailyChange: number;
  dailyChangeRate: number;
  totalGain: number;
  totalReturnRate: number;
  annualDividend: number;
  annualDividendYield: number;
  tradeHistories: TradeHistory[];
};

export type TradeHistory = {
  id: number;
  purchaseDate: string;
  numShares: number;
  purchasePricePerShare: number;
  memo: string;
};

export const getPortfolioChart = async () => {
  const res = await fetcher.get<Response<PieChartType[]>>("/portfolios");
  return res.data;
};

export const getPortfolioDetails = async (portfolioId: number) => {
  const res = await fetcher.get<Response<Portfolio>>(
    `/portfolio/${portfolioId}/holdings`
  );
  return res.data;
};

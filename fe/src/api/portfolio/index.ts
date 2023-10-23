import { fetcher } from "@api/fetcher";
import { Response } from "@api/types";

export type PieChartType = {
  name: string;
  value: number;
  fill: string;
};

export const getPortfolioChart = async () => {
  const res = await fetcher.get<Response<PieChartType[]>>("/portfolios");
  return res.data;
};

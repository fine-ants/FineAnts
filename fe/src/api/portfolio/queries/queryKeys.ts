import { createQueryKeys } from "@lukemorales/query-key-factory";
import { getPortfolioChart } from "..";

export const portfolioKeys = createQueryKeys("portfolio", {
  chart: () => ({
    queryKey: ["portfolioChart"],
    queryFn: getPortfolioChart,
  }),
});

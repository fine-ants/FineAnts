import { useQuery } from "@tanstack/react-query";
import { portfolioKeys } from "./queryKeys";
import { getPortfolioChart } from "..";

export default function usePortfolioChartQuery() {
  return useQuery({
    queryKey: portfolioKeys.chart().queryKey,
    queryFn: getPortfolioChart,
    retry: false,
    select: (res) => res.data,
    meta: {
      errorMessage: "포트폴리오 차트를 불러오는데 실패했습니다",
    },
  });
}

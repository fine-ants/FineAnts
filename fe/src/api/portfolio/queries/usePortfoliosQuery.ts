import { useQuery } from "@tanstack/react-query";
import { getPortfolios } from "..";
import { portfolioKeys } from "./queryKeys";

export default function usePortfoliosQuery() {
  return useQuery({
    queryKey: portfolioKeys.chart().queryKey,
    queryFn: getPortfolios,
    retry: false,
    select: (res) => res.data,
    meta: {
      errorMessage: "포트폴리오 차트를 불러오는데 실패했습니다",
    },
  });
}

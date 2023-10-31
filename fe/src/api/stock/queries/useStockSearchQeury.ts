import { useQuery } from "@tanstack/react-query";
import { postStockSearch } from "..";
import { stockKeys } from "./queryKeys";

export default function useStockSearchQuery(query: string) {
  return useQuery({
    queryKey: stockKeys.search(query).queryKey,
    queryFn: () => postStockSearch(query),
    retry: false,
    enabled: query !== "",
    select: (res) => res.data,
    meta: {
      errorMessage: "주식 검색을 불러오는데 실패했습니다",
    },
  });
}

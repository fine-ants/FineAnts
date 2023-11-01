import { useMutation } from "@tanstack/react-query";
import { deletePortfolioHolding } from "..";
import { portfolioKeys } from "./queryKeys";

export default function usePortfolioHoldingAddMutation(portfolioId: number) {
  return useMutation({
    mutationKey: portfolioKeys.deleteHolding(portfolioId).queryKey,
    mutationFn: deletePortfolioHolding,
    onSuccess: () => {
      // TODO: toast, 포트폴리오 목록 query invalidate
    },
  });
}

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postPortfolioHoldingPurchase } from "..";
import { portfolioKeys } from "./queryKeys";

export default function usePortfolioHoldingPurchaseAddMutation(filters: {
  portfolioId: number;
  portfolioHoldingId: number;
}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: portfolioKeys.addHoldingPurchase().queryKey,
    mutationFn: postPortfolioHoldingPurchase,
    onSuccess: () => {
      // TODO: toast
      queryClient.invalidateQueries(
        portfolioKeys.details(filters.portfolioId).queryKey
      );
    },
  });
}

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { putPortfolioHoldingPurchase } from "..";
import { portfolioKeys } from "./queryKeys";

export default function usePortfolioHoldingPurchaseEditMutation(
  portfolioId: number
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: portfolioKeys.editHoldingPurchase().queryKey,
    mutationFn: putPortfolioHoldingPurchase,
    onSuccess: () => {
      // TODO: toast
      queryClient.invalidateQueries(
        portfolioKeys.details(portfolioId).queryKey
      );
    },
  });
}

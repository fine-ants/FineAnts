import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePortfolioHolding } from "..";
import { portfolioKeys } from "./queryKeys";

export default function usePortfolioHoldingAddMutation(portfolioId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: portfolioKeys.deleteHolding(portfolioId).queryKey,
    mutationFn: deletePortfolioHolding,
    onSuccess: () => {
      // TODO: toast
      queryClient.invalidateQueries(
        portfolioKeys.details(portfolioId).queryKey
      );
    },
  });
}

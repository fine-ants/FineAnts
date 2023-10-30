import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePortfolio } from "..";
import { portfolioKeys } from "./queryKeys";

export default function usePortfolioDeleteMutation(portfolioId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: portfolioKeys.details(portfolioId).queryKey,
    mutationFn: deletePortfolio,
    onSuccess: () => {
      // TODO: toast
      queryClient.invalidateQueries(
        portfolioKeys.details(portfolioId).queryKey
      );
    },
  });
}

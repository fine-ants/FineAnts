import { useMutation } from "@tanstack/react-query";
import { postPortfolio } from "..";
import { portfolioKeys } from "./queryKeys";

export default function usePortfolioAddMutation() {
  return useMutation({
    mutationKey: portfolioKeys.addPortfolio().queryKey,
    mutationFn: postPortfolio,
    onSuccess: () => {
      // TODO : Toast
    },
  });
}

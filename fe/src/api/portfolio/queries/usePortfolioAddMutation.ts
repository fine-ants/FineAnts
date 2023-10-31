import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { postPortfolio } from "..";
import { portfolioKeys } from "./queryKeys";

export default function usePortfolioAddMutation() {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: portfolioKeys.addPortfolio().queryKey,
    mutationFn: postPortfolio,
    onSuccess: (data) => {
      navigate(`/portfolio/${data.data.portfolioId}`);
    },
  });
}

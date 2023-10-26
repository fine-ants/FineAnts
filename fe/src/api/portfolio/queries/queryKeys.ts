import { createQueryKeys } from "@lukemorales/query-key-factory";

export const portfolioKeys = createQueryKeys("portfolio", {
  details: (portfolioId: number) => ({
    queryKey: [portfolioId],
  }),
  chart: () => ({
    queryKey: ["portfolioChart"],
  }),
});

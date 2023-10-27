import { createQueryKeys } from "@lukemorales/query-key-factory";

export const portfolioKeys = createQueryKeys("portfolio", {
  details: (portfolioId: number) => ({
    queryKey: [portfolioId],
  }),
  chart: () => ({
    queryKey: ["portfolioChart"],
  }),
  addHoldingPurchase: () => ({
    queryKey: ["addHoldingPurchase"],
  }),
  editHoldingPurchase: (filters: {
    portfolioId: number;
    portfolioHoldingId: number;
    purchaseHistoryId: number;
  }) => ({
    queryKey: [filters],
  }),
  deleteHoldingPurchase: (filters: {
    portfolioId: number;
    portfolioHoldingId: number;
    purchaseHistoryId: number;
  }) => ({
    queryKey: [filters],
  }),
});

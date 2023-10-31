import { successfulStockData } from "mocks/data/stockData";
import { rest } from "msw";

export default [
  rest.get("api/stock/search/:query", (req, res, ctx) => {
    const query = req.params.query as string;

    console.log(query);
    const filteredStocks = successfulStockData.data.filter(
      (stock) =>
        stock.tickerSymbol.includes(query) || stock.companyName.includes(query)
    );

    return res(
      ctx.status(200),
      ctx.json({
        ...successfulStockData,
        data: filteredStocks,
      })
    );
  }),
];

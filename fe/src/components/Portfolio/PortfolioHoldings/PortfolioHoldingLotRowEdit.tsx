import { Input, TableCell, TableRow } from "@mui/material";
import { formatDate } from "@utils/date";
import { useState } from "react";

type Props = {
  purchaseDate: string;
  purchasePricePerShare: number;
  numShares: number;
  memo: string;
};

export default function PortfolioHoldingLotRowEdit({
  purchaseDate,
  purchasePricePerShare,
  numShares,
  memo,
}: Props) {
  const [newPurchaseDate, setNewPurchaseDate] = useState(
    formatDate(purchaseDate)
  );
  const [newPurchasePricePerShare, setNewPurchasePricePerShare] = useState(
    purchasePricePerShare.toString()
  );
  const [newNumShares, setNewNumShares] = useState(numShares.toString());
  const [newMemo, setNewMemo] = useState(memo ?? "");

  return (
    <TableRow>
      <TableCell component="th" scope="row">
        <Input
          type="date"
          value={newPurchaseDate}
          onChange={(e) => setNewPurchaseDate(e.target.value)}
        />
      </TableCell>
      <TableCell>
        <Input
          type="number"
          slotProps={{
            input: {
              min: 0,
            },
          }}
          value={newPurchasePricePerShare}
          onChange={(e) => setNewPurchasePricePerShare(e.target.value.trim())}
        />
      </TableCell>
      <TableCell align="right">
        <Input
          type="number"
          slotProps={{
            input: {
              min: 0,
            },
          }}
          value={newNumShares}
          onChange={(e) => setNewNumShares(e.target.value.trim())}
        />
      </TableCell>
      <TableCell align="right">
        <Input
          value={newMemo}
          onChange={(e) => setNewMemo(e.target.value.trim())}
        />
      </TableCell>
    </TableRow>
  );
}

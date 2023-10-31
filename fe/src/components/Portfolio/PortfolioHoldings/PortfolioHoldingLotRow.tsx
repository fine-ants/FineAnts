import { Button, Input, TableCell, TableRow } from "@mui/material";
import { formatDate } from "@utils/date";
import { useState } from "react";

type Props = {
  purchaseDate: string;
  purchasePricePerShare: number;
  numShares: number;
  memo: string | null;
};

export default function PortfolioHoldingLotRow({
  purchaseDate,
  purchasePricePerShare,
  numShares,
  memo,
}: Props) {
  const [isEditing, setIsEditing] = useState(false);

  const [newPurchaseDate, setNewPurchaseDate] = useState(
    formatDate(purchaseDate)
  );
  const [newPurchasePricePerShare, setNewPurchasePricePerShare] = useState(
    purchasePricePerShare.toString()
  );
  const [newNumShares, setNewNumShares] = useState(numShares.toString());
  const [newMemo, setNewMemo] = useState(memo ?? "");

  const onEditClick = () => {
    setIsEditing(true);
  };

  const onSaveClick = () => {
    // TODO: Send request to save changes
    setIsEditing(false);
  };

  const onDeleteClick = () => {
    // TODO: open confirmation dialog
  };

  return (
    <TableRow>
      {isEditing ? (
        <>
          <TableCell component="th" scope="row">
            <Input
              type="date"
              value={newPurchaseDate}
              onChange={(e) => setNewPurchaseDate(e.target.value)}
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
              value={newPurchasePricePerShare}
              onChange={(e) =>
                setNewPurchasePricePerShare(e.target.value.trim())
              }
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
          <TableCell align="right" sx={{ width: "160px" }}>
            <Button onClick={onSaveClick}>저장</Button>
          </TableCell>
        </>
      ) : (
        <>
          <TableCell component="th" scope="row">
            {formatDate(purchaseDate)}
          </TableCell>
          <TableCell align="right">{purchasePricePerShare}</TableCell>
          <TableCell align="right">{numShares}</TableCell>
          <TableCell align="right">{memo}</TableCell>
          <TableCell align="right" sx={{ width: "160px" }}>
            <Button onClick={onEditClick}>수정</Button>
            <Button onClick={onDeleteClick}>삭제</Button>
          </TableCell>
        </>
      )}
    </TableRow>
  );
}

import { StockItem } from "@pages/WatchlistPage";
import { Identifier, XYCoord } from "dnd-core";
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import styled from "styled-components";

type Props = {
  id: string;
  item: StockItem;
  index: number;
  moveStock: (dragIndex: number, hoverIndex: number) => void;
};

interface DragStock {
  index: number;
  id: string;
  type: string;
}

export function WatchlistItem({ id, item, index, moveStock }: Props) {
  const plusOrMinus = item.change.isUp ? "+" : "-";

  const ref = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop<
    DragStock,
    void,
    { handlerId: Identifier | null }
  >({
    accept: "STOCK",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragStock, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      moveStock(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "STOCK",
    item: () => {
      return { id, index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <StyledWatchlistItem
      ref={ref}
      data-handler-id={handlerId}
      $isDragging={isDragging}>
      <Name>{item.name}</Name>
      <GreenText>₩ {item.currentPrice}</GreenText>
      <Change $isUp={item.change.isUp}>
        {plusOrMinus} {item.change.value}%
      </Change>
      <GreenText>{item.dividends}%</GreenText>
      <GreenText>{item.sector}</GreenText>
    </StyledWatchlistItem>
  );
}

const StyledWatchlistItem = styled.div<{ $isDragging: boolean }>`
  height: 50px;
  padding: 0 80px;
  display: flex;
  gap: 158px;
  align-items: center;
  justify-content: flex-start;
  background-color: #f0f7f8;
  opacity: ${({ $isDragging }) => ($isDragging ? 0.5 : 1)};
`;

const Item = styled.div`
  width: 150px;
  text-align: center;
`;

const Name = styled(Item)`
  color: #00b1fd;
`;

const GreenText = styled(Item)`
  color: #43b95d;
`;

const Change = styled(Item)<{ $isUp: boolean }>`
  color: ${({ $isUp }) => ($isUp ? "#43B95D" : "#FF0000")};
`;

import styled from "styled-components";

type Props = {
  color: string;
  title: string;
};

export default function LegendItem({ color, title }: Props) {
  return (
    <StyledLegendItem>
      <Square $color={color} />
      {title}
    </StyledLegendItem>
  );
}

const StyledLegendItem = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
  align-items: center;
  font-size: 12px;
`;

const Square = styled.div<{ $color: string }>`
  display: flex;
  top: -1px;
  position: relative;
  justify-content: center;
  align-items: center;

  width: 10px;
  height: 10px;
  border-radius: 4px;
  background-color: ${({ $color }) => $color};
`;

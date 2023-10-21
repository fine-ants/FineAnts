import styled from "styled-components";

export default function LegendItem({
  color,
  title,
}: {
  color: string;
  title: string;
}) {
  return (
    <StyledLegendItem>
      <Circle $color={color} />
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

const Circle = styled.div<{ $color: string }>`
  display: flex;
  top: -1px;
  position: relative;
  justify-content: center;
  align-items: center;

  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ $color }) => $color};
`;

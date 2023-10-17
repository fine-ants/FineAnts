import styled from "styled-components";

export default function UserControls() {
  return (
    <StyledUserControls>
      <ControlButton>알</ControlButton>
      <ControlButton>환</ControlButton>
      <ControlButton>프</ControlButton>
    </StyledUserControls>
  );
}

const StyledUserControls = styled.div`
  width: 144px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f2f2f2;
  margin-left: auto;
`;

const ControlButton = styled.button`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

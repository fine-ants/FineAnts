import { Button } from "@mui/material";
import styled from "styled-components";
import BaseModal from "./BaseModal";

type Props = {
  isOpen: boolean;
  title: string;
  content: string;
  onClose: () => void;
  onConfirm: () => void;
};

export default function Confirm(props: Props) {
  const { onConfirm, title, content, ...rest } = props;
  const { onClose } = props;

  const onConfirmClose = () => {
    onConfirm();
    onClose();
  };

  return (
    <BaseModal style={ConfirmStyle} {...rest}>
      <Wrapper>
        <Title>{title}</Title>
        <Body>{content}</Body>
        <ButtonWrapper>
          <CancelButton onClick={onClose}>취소</CancelButton>
          <Button onClick={onConfirmClose}>확인</Button>
        </ButtonWrapper>
      </Wrapper>
    </BaseModal>
  );
}

const ConfirmStyle = {
  width: "400px",
  height: "180px",
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Title = styled.div`
  width: 100%;
  text-align: left;
  font-size: 16px;
  font-weight: bold;
`;

const Body = styled.div`
  width: 100%;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  text-align: right;
`;

const CancelButton = styled(Button)`
  color: red;
`;

import { ReactNode } from "react";
import styled from "styled-components";

type Props = {
  children: ReactNode;
};

export default function BasePage({ children }: Props) {
  return <StyledBasePage>{children}</StyledBasePage>;
}

const StyledBasePage = styled.div`
  width: 100%;
  min-height: inherit;
`;

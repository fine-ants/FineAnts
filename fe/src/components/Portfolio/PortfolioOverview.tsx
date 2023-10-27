import { PortfolioDetails } from "@api/portfolio";
import Confirm from "@components/Confirm";
import PortfolioModal from "@components/Portfolio/PortfolioModal";
import ToggleSwitch from "@components/ToggleSwitch";
import { Button } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

type Props = {
  data: PortfolioDetails;
};

export default function PortfolioOverview({ data }: Props) {
  const { id } = useParams();

  const [isTargetSwitchChecked, setIsTargetSwitchChecked] = useState(true);
  const [isLossSwitchChecked, setIsLossSwitchChecked] = useState(false);
  const [isModalOpen, setIsModalOPen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const onPortfolioEdit = () => {
    // TODO : 수정 api 추가
    setIsModalOPen(true);
  };

  const onPortfolioRemove = () => {
    // TODO : 삭제 api 추가
    setIsConfirmOpen(true);
  };

  const onTargetSwitchToggle = () => {
    setIsTargetSwitchChecked((prev) => !prev);
  };

  const onLossSwitchToggle = () => {
    setIsLossSwitchChecked((prev) => !prev);
  };

  return (
    <StyledPortfolioOverview>
      {isModalOpen && (
        <PortfolioModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOPen(false);
          }}
          portfolioDetails={data}
        />
      )}
      {isConfirmOpen && (
        <Confirm
          isOpen={isConfirmOpen}
          title="포트폴리오 삭제"
          content="포트폴리오를 삭제 하시겠습니까?"
          onClose={() => setIsConfirmOpen(false)}
          onConfirm={() => console.log("삭제")}
        />
      )}
      <Header>
        <FirmImage
          src={
            "https://framerusercontent.com/images/y7135TGP0TiQ7gtLbQ0IrWOzww.jpg"
          }
        />
        <Title>{data.name}</Title>
        <ButtonWrapper>
          <Button onClick={onPortfolioEdit}>수정</Button>
          <Button onClick={onPortfolioRemove}>삭제</Button>
        </ButtonWrapper>
      </Header>
      <Body>
        <LeftPanel>
          <div>예산 : {data.budget} KRW</div>
          <div>투자 금액 : {data.investedAmount} KRW</div>
          <div>잔고 : {data.balance} KRW</div>
          <div>잠정 손실잔고 : {data.provisionalLossBalance} KRW</div>
        </LeftPanel>
        <RightPanel>
          <OverviewWrapper>
            <div>
              <span>목표 수익률 :</span>
              <span>{data.targetGain} KRW</span>
              <span>{data.targetReturnRate}%</span>
              <ToggleSwitch
                isChecked={isTargetSwitchChecked}
                onToggle={onTargetSwitchToggle}
              />
            </div>
            <div>
              <span>최대 손실율 : </span>
              <span>{data.maximumLoss} KRW</span>
              <span>{data.maximumLossRate} %</span>
              <ToggleSwitch
                isChecked={isLossSwitchChecked}
                onToggle={onLossSwitchToggle}
              />
            </div>
          </OverviewWrapper>
          <OverviewWrapper>
            <div>
              <span>총 손익 :</span>
              <span>{data.totalGain} KRW</span>
              <span> {data.totalGainRate} %</span>
            </div>
            <div>
              <span>당일 손익 : </span>
              <span>{data.dailyGain} KRW</span>
              <span>{data.dailyGainRate} %</span>
            </div>
          </OverviewWrapper>
          <OverviewWrapper>
            <div>
              <span>총 연배당금 :</span>
              <span>{data.totalAnnualDividend} KRW</span>
              <span>{data.totalAnnualDividendYield} %</span>
            </div>
            <div>
              <span>투자 연배당률 :</span>
              <span>{data.annualInvestmentDividendYield} %</span>
            </div>
          </OverviewWrapper>
        </RightPanel>
      </Body>
    </StyledPortfolioOverview>
  );
}

const StyledPortfolioOverview = styled.div`
  height: 100%;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
`;

const FirmImage = styled.img`
  width: 30px;
  height: 30px;
`;

const Title = styled.span`
  font-size: 16px;
`;

const ButtonWrapper = styled.div`
  flex: 1;
  text-align: right;

  button {
    margin: 0px 8px;
  }
`;

const Body = styled.div`
  width: 100%;
  display: flex;
`;

const LeftPanel = styled.div`
  width: 35%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: center;
  border: 1px solid black;
  margin: 10px;
`;

const RightPanel = styled.div`
  width: 65%;
  display: flex;
  flex-direction: column;
`;

const OverviewWrapper = styled.div`
  display: flex;
  gap: 16px;
  border: 1px solid black;
  margin: 10px;

  div {
    width: 50%;
    display: flex;
    align-items: center;
    gap: 16px;
  }
`;

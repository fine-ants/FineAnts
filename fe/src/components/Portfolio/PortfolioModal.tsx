import { PortfolioDetails } from "@api/portfolio";
import BaseModal from "@components/BaseModal";
import useText from "@hooks/useText";
import {
  Button,
  FormControl,
  Input,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";
import styled from "styled-components";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  portfolioDetails?: PortfolioDetails;
};

export default function PortfolioModal({
  isOpen,
  onClose,
  portfolioDetails,
}: Props) {
  const [securitiesFirm, setSecuritiesFirm] = useState(
    portfolioDetails ? portfolioDetails.securitiesFirm : "fineAnts"
  );

  const { value: name, onChange: onNameChange } = useText({
    initialValue: portfolioDetails?.name,
  });
  const { value: budget, onChange: onBudgetChange } = useText({
    initialValue: portfolioDetails?.budget.toString(),
  });
  const { value: targetGain, onChange: onTargetGainChange } = useText({
    initialValue: portfolioDetails?.targetGain.toString(),
  });
  const { value: targetReturnRate, onChange: onTargetReturnRateChange } =
    useText({
      initialValue: portfolioDetails?.targetReturnRate.toString(),
    });
  const { value: maximumLoss, onChange: onMaximumLossChange } = useText({
    initialValue: portfolioDetails?.maximumLoss.toString(),
  });
  const { value: maximumLossRate, onChange: onMaximumLossRateChange } = useText(
    {
      initialValue: portfolioDetails?.maximumLossRate.toString(),
    }
  );

  const isEditMode = !!portfolioDetails;
  const isBudgetEmpty = budget === "0" || budget === "";

  const onBudgetInputChange = (newVal: string) => {
    onBudgetChange(newVal);

    const isNewEmpty = newVal === "0" || newVal === "";

    if (isNewEmpty) {
      onTargetGainChange("");
      onTargetReturnRateChange("");
      onMaximumLossChange("");
      onMaximumLossRateChange("");
    } else {
      onTargetGainHandler(targetGain);
      onMaximumLossHandler(maximumLoss);
    }
  };

  const onTargetGainHandler = (value: string) => {
    const valueNumber = Number(value);
    const budgetNumber = Number(budget);

    onTargetGainChange(value);
    onTargetReturnRateChange(
      (((valueNumber - budgetNumber) / budgetNumber) * 100).toString()
    );
  };

  const onTargetReturnRateHandler = (value: string) => {
    const valueNumber = Number(value);
    const budgetNumber = Number(budget);

    const calculatedGain = (valueNumber / 100) * budgetNumber;
    const gainDisplay =
      Math.floor(calculatedGain) === calculatedGain
        ? calculatedGain.toString()
        : calculatedGain.toFixed(2);

    onTargetReturnRateChange(value);
    onTargetGainChange(gainDisplay);
  };

  const onMaximumLossHandler = (value: string) => {
    const valueNumber = Number(value);
    const budgetNumber = Number(budget);

    onMaximumLossChange(value);
    onMaximumLossRateChange(
      (((budgetNumber - valueNumber) / budgetNumber) * 100).toString()
    );
  };
  const maximumLossRateHandler = (value: string) => {
    const valueNumber = Number(value);
    const budgetNumber = Number(budget);

    const calculatedLoss = budgetNumber - (valueNumber / 100) * budgetNumber;
    const lossDisplay =
      Math.floor(calculatedLoss) === calculatedLoss
        ? calculatedLoss.toString()
        : calculatedLoss.toFixed(2);

    onMaximumLossRateChange(value);
    onMaximumLossChange(lossDisplay);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setSecuritiesFirm(event.target.value);
  };

  const onSubmit = () => {
    if (isEditMode) {
      // TODO : 포트폴리오 수정
    } else {
      // TODO : 포트폴리오 추가
    }
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <Wrapper>
        <main />
        <Header>포트폴리오 {isEditMode ? `수정` : `추가`}</Header>
        <CloseButton onClick={onClose}>close</CloseButton>
        <Body>
          <Row>
            <StyledSpan>증권사</StyledSpan>
            <FormControl fullWidth>
              <Select
                value={securitiesFirm}
                onChange={handleChange}
                inputProps={{ "aria-label": "Without label" }}>
                <MenuItem value={"fineAnts"}>없음</MenuItem>
                <MenuItem value={"kb"}>KB증권</MenuItem>
                <MenuItem value={"toss"}>토스증권</MenuItem>
              </Select>
            </FormControl>
          </Row>
          <Row>
            <StyledSpan>이름</StyledSpan>
            <StyledInput
              placeholder="포트폴리오 제목을 입력해 주세요"
              value={name}
              onChange={(e) => onNameChange(e.target.value.trim())}
            />
          </Row>
          <Row>
            <StyledSpan>예산</StyledSpan>
            <StyledInput
              placeholder="예산을 입력해 주세요"
              value={budget}
              onChange={(e) => onBudgetInputChange(e.target.value.trim())}
            />
            <span>KRW</span>
          </Row>
          <Row>
            <StyledSpan>목표 수익</StyledSpan>
            <InputWrapper>
              <StyledInput
                disabled={isBudgetEmpty}
                placeholder="목표 수익을 입력해 주세요"
                value={targetGain}
                onChange={(e) => onTargetGainHandler(e.target.value.trim())}
              />
              <span>KRW</span>
              <StyledInput
                disabled={isBudgetEmpty}
                placeholder="목표 수익률을 입력해 주세요"
                value={targetReturnRate}
                onChange={(e) =>
                  onTargetReturnRateHandler(e.target.value.trim())
                }
              />
              <span>%</span>
            </InputWrapper>
          </Row>
          <Row>
            <StyledSpan>최대 손실</StyledSpan>
            <InputWrapper>
              <StyledInput
                disabled={isBudgetEmpty}
                placeholder="최대 손실을 입력해 주세요"
                value={maximumLoss}
                onChange={(e) => onMaximumLossHandler(e.target.value.trim())}
              />
              <span>KRW</span>
              <StyledInput
                disabled={isBudgetEmpty}
                placeholder="최대 손실율을 입력해 주세요"
                value={maximumLossRate}
                onChange={(e) => maximumLossRateHandler(e.target.value.trim())}
              />
              <span>%</span>
            </InputWrapper>
          </Row>
        </Body>
        {/* TODO : submitButton disabled 조건식 추가 */}
        <ButtonWrapper>
          <SubmitButton onClick={onSubmit}>저장</SubmitButton>
        </ButtonWrapper>
      </Wrapper>
    </BaseModal>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Header = styled.div`
  width: 100%;
  font-size: 20px;
  font-weight: bold;
`;

const StyledInput = styled(Input)`
  min-width: auto;
  width: 100%;
`;

const StyledSpan = styled.span`
  width: 95px;
  text-align: center;
`;

const CloseButton = styled(Button)`
  position: absolute;
  top: 0;
  right: 0;
`;

const Body = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
`;

const SubmitButton = styled(Button)`
  width: 70px;
  height: 30px;
`;

const Row = styled.div`
  width: auto;
  display: flex;
  gap: 8px;
`;

const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 8px;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  text-align: right;
`;

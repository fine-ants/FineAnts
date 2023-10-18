import styled from "styled-components";

export default function SearchBar() {
  return (
    <StyledSearch>
      <Input type="text" placeholder="종목 또는 지수 검색" />
    </StyledSearch>
  );
}

const StyledSearch = styled.div`
  width: 300px;
  height: 36px;
  padding: 10px 20px;
  background-color: #f2f2f2;
  margin-left: auto;
`;

const Input = styled.input`
  width: 100%;
  height: 16px;
`;

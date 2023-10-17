import styled from "styled-components";

export default function Search() {
  return (
    <StyledSearch>
      <Input type="text" placeholder="검색창" />
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

import useStockSearchQuery from "@api/stock/queries/useStockSearchQuery";
import { useState } from "react";
import styled from "styled-components";

export default function SearchBar() {
  const [value, setValue] = useState("");

  const { data: searchResults } = useStockSearchQuery(value);

  const onSearchBarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const isQuerySearched = value && searchResults;

  return (
    <StyledSearchBar>
      <InputContainer>
        <Input
          type="text"
          value={value}
          placeholder="종목 또는 지수 검색"
          onChange={onSearchBarChange}
        />
      </InputContainer>

      {isQuerySearched && (
        <SearchList>
          {searchResults.map((result) => (
            <SearchItem key={result.stockCode}>{result.companyName}</SearchItem>
          ))}
        </SearchList>
      )}
    </StyledSearchBar>
  );
}

const StyledSearchBar = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

const InputContainer = styled.div`
  width: 360px;
  height: 56px;
  padding: 8px 24px;
  border-radius: 12px;
  background-color: #f2f2f2;
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  width: 100%;
  height: 16px;
`;

const SearchList = styled.div`
  position: absolute;
  width: 300px;
  height: 500px;
  top: 62px;
  background-color: white;
  border-radius: 10px;
  border: 1px solid #e5e5e5;

  overflow: scroll;

  > :first-child {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }

  > :last-child {
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
`;

const SearchItem = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 50px;
  padding: 10px 20px;
  background-color: white;
  font-weight: 400;

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 16px;
    right: 16px;
    height: 1.5px;
    background-color: #e5e5e5;
  }
`;

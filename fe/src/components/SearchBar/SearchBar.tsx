import { StockSearchResponse } from "@api/stock";
import useStockSearchQuery from "@api/stock/queries/useStockSearchQuery";
import { createContext, useContext, useState } from "react";
import styled from "styled-components";

interface SearchBarContextProps {
  value: string;
  searchResults: StockSearchResponse[];
  isQuerySearched: boolean;
  onSearchBarChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBarContext = createContext<SearchBarContextProps>({
  value: "",
  searchResults: [],
  isQuerySearched: false,
  onSearchBarChange: () => {},
});

export default function SearchBar({ children }: { children: React.ReactNode }) {
  const [value, setValue] = useState("");

  const { data: searchResults = [] } = useStockSearchQuery(value);

  const onSearchBarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  // const isQuerySearched = value && searchResults;
  const isQuerySearched = !!value && searchResults.length > 0;

  return (
    <SearchBarContext.Provider
      value={{ value, searchResults, isQuerySearched, onSearchBarChange }}>
      <StyledSearchBar>{children}</StyledSearchBar>
    </SearchBarContext.Provider>
  );

  // return (
  //   <StyledSearchBar>
  //     <InputContainer>
  //       <Input
  //         type="text"
  //         value={value}
  //         placeholder="종목 또는 지수 검색"
  //         onChange={onSearchBarChange}
  //       />
  //     </InputContainer>

  //     {isQuerySearched && (
  //       <SearchList>
  //         {searchResults.map((result) => (
  //           <SearchItem key={result.stockCode} searchResult={result} />
  //         ))}
  //       </SearchList>
  //     )}
  //   </StyledSearchBar>
  // );
}

function Input() {
  const { value, onSearchBarChange } = useContext(SearchBarContext);

  return (
    <InputContainer>
      <StyledInput
        type="text"
        value={value}
        placeholder="종목 또는 지수 검색"
        onChange={onSearchBarChange}
      />
    </InputContainer>
  );
}

function SearchList({
  onItemClick,
}: {
  onItemClick: (tickerSymbol: string) => void;
}) {
  const { searchResults, isQuerySearched } = useContext(SearchBarContext);

  return (
    isQuerySearched && (
      <StyledSearchList>
        {searchResults.map((result) => (
          <SearchItem
            key={result.stockCode}
            searchResult={result}
            onClick={onItemClick}
          />
        ))}
      </StyledSearchList>
    )
  );
}

function SearchItem({
  searchResult,
  onClick,
}: {
  searchResult: StockSearchResponse;
  onClick: (tickerSymbol: string) => void;
}) {
  return (
    <StyledSearchItem onClick={() => onClick(searchResult.tickerSymbol)}>
      {searchResult.companyName}
    </StyledSearchItem>
  );
}

SearchBar.Input = Input;
SearchBar.SearchList = SearchList;

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

const StyledInput = styled.input`
  width: 100%;
  height: 16px;
`;

const StyledSearchList = styled.div`
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

const StyledSearchItem = styled.div`
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

import TVTickerTapeWidget from "../TradingViewWidgets/TVTickerTape";
import { NavWrapper } from "../Nav";
import styled from "styled-components";
import Search from "../Search";
import UserControls from "../common/UserControls";

export default function Header() {
  const headerNavLinks = [
    { name: "Portfolio", url: "/portfolio" },
    { name: "Watchlist", url: "/watchlist" },
    { name: "Indices", url: "/indices" },
  ];

  return (
    <>
      <StyledHeader>
        <HeaderLeft>
          <StyledBrandIdentity>FineAnts</StyledBrandIdentity>
          <NavWrapper style={navStyles} links={headerNavLinks}>
            <NavWrapper.NavList style={navListStyle}>
              <NavWrapper.NavItem style={navItemStyle} />
            </NavWrapper.NavList>
          </NavWrapper>
        </HeaderLeft>
        <HeaderRight>
          <Search />
          <UserControls />
        </HeaderRight>
      </StyledHeader>
      <TVTickerTapeWidget />
    </>
  );
}

const StyledHeader = styled.header`
  width: 1440px;
  height: 80px;
  display: flex;
  gap: 48px;
  justify-content: space-between;
  align-items: center;
  padding: 16px 80px;
`;

const HeaderLeft = styled.div`
  display: flex;
  gap: 48px;
  align-items: center;
`;

const HeaderRight = styled.div`
  display: flex;
  gap: 48px;
  align-items: center;
  margin-left: auto;
`;

const StyledBrandIdentity = styled.div`
  font-size: 40px;
  font-weight: bold;
`;

const navStyles = {
  backgroundColor: "#ffffff",
};

const navListStyle = {
  display: "flex",
  gap: "16px",
};

const navItemStyle = {
  width: "80px",
  height: "40px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "16px",
  fontWeight: "bold",
};

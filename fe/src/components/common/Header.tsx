import TVTickerTapeWidget from "../TradingViewWidgets/TVTickerTape";
import { NavBar } from "../NavBar";
import styled from "styled-components";
import Search from "../Search";
import UserControls from "../common/UserControls";
import Routes from "router/Routes";

export default function Header() {
  const navItemList = [
    <div
      style={navItemStyle}
      onClick={() => console.log("포트폴리오 Dropdown 요소가 들어갈자리")}>
      Portfolio
    </div>,
    <a style={navItemStyle} href={Routes.WATCHLIST}>
      Watchlist
    </a>,
    <a style={navItemStyle} href={Routes.INDICES}>
      Indices
    </a>,
  ];

  return (
    <>
      <StyledHeader>
        <HeaderLeft>
          <StyledBrandIdentity>FineAnts</StyledBrandIdentity>
          <NavBar style={navBarStyles} navItems={navItemList}>
            <NavBar.NavList style={navListStyle}>
              <NavBar.NavItem />
            </NavBar.NavList>
          </NavBar>
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

const navBarStyles = {
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

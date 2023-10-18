import TVTickerTapeWidget from "../TradingViewWidgets/TVTickerTape";
import { NavBar } from "../NavBar";
import styled from "styled-components";
import SearchBar from "../SearchBar";
import UserControls from "../common/UserControls";
import Routes from "router/Routes";
import Dropdown from "./Dropdown";

export default function Header() {
  const navItemLinks = [
    { name: "Watchlist", path: Routes.WATCHLIST },
    { name: "indices", path: Routes.INDICES },
  ];

  const dropdownProps = [
    {
      name: "내꿈은워렌버핏",
      onClick: () => {
        console.log("워렌버핏으로 이동");
      },
    },
    {
      name: "단타왕",
      onClick: () => {
        console.log("단타왕으로 이동");
      },
    },
    {
      name: "물린게아니고장기투자",
      onClick: () => {
        console.log("장기투자로 이동");
      },
    },
  ];

  return (
    <>
      <StyledHeader>
        <HeaderTop>
          <HeaderLeft>
            <StyledBrandIdentity>FineAnts</StyledBrandIdentity>
            <NavBar style={navBarStyles}>
              {/* <NavBar.NavList style={navListStyle}> */}
              <Dropdown itemProps={dropdownProps}>
                <Dropdown.Toggle style={ddToggleStyle}>
                  Portfolio
                </Dropdown.Toggle>
                <Dropdown.List style={ddListStyle}>
                  <Dropdown.Items style={ddItemsStyle} />
                </Dropdown.List>
              </Dropdown>
              {navItemLinks.map((link) => (
                <NavBar.NavItem link={link} style={navItemStyle} />
              ))}
              {/* </NavBar.NavList> */}
            </NavBar>
          </HeaderLeft>
          <HeaderRight>
            <SearchBar />
            <UserControls />
          </HeaderRight>
        </HeaderTop>
        <TVTickerTapeWidget />
      </StyledHeader>
    </>
  );
}

const StyledHeader = styled.header`
  z-index: 1;
`;

const HeaderTop = styled.header`
  // width: 1440px;
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
  display: "flex",
  gap: "16px",
  alignItems: "center",
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

const ddToggleStyle = {
  ...navItemStyle,
  cursor: "pointer",
  position: "relative" as "relative",
};

const ddListStyle = {
  top: "0px",
  backgroundColor: "#ffffff",
  border: "1.5px solid #e5e5e5",
  borderRadius: "8px",
  padding: "10px",
  display: "flex",
  flexDirection: "column" as "column",
  gap: "8px",
  width: "200px",
};

const ddItemsStyle = {
  width: "inherit",
  height: " 30px",
  display: "flex",
  alignItems: "center",
};

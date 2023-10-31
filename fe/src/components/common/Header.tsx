import TVTickerTapeWidget from "../TradingViewWidgets/TVTickerTape";
import { NavBar } from "../NavBar";
import styled from "styled-components";
import SearchBar from "../SearchBar";
import UserControls from "../common/UserControls";
import Routes from "router/Routes";
import Dropdown from "./Dropdown";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Watchlist",
      path: Routes.WATCHLIST,
    },
    { name: "indices", path: Routes.INDICES },
  ];

  const dropdownItems = [
    {
      name: "내꿈은워렌버핏",
      onClick: () => {
        console.log("워렌버핏으로 이동");
        navigate("/portfolio/1");
      },
    },
    {
      name: "단타왕",
      onClick: () => {
        console.log("단타왕으로 이동");
        navigate("/portfolio/2");
      },
    },
    {
      name: "물린게아니고장기투자",
      onClick: () => {
        console.log("장기투자로 이동");
        navigate("/portfolio/3");
      },
    },
  ];

  return (
    <>
      <StyledHeader>
        <HeaderTop>
          <HeaderLeft>
            <StyledBrandIdentity onClick={() => navigate("/dashboard")}>
              FineAnts
            </StyledBrandIdentity>
            <NavBar style={navBarStyles}>
              <Dropdown>
                <Dropdown.Toggle>Portfolio</Dropdown.Toggle>
                <Dropdown.Menu>
                  {dropdownItems.map((item) => (
                    <Dropdown.Item key={item.name} item={item} />
                  ))}
                  <Dropdown.Item
                    item={{
                      name: "포트폴리오로 이동",
                      onClick: () => navigate("/profile/portfolio"),
                    }}
                  />
                </Dropdown.Menu>
              </Dropdown>
              {navItems.map((item) => (
                <NavBar.NavItem
                  key={item.name}
                  item={item}
                  style={navItemStyle}
                />
              ))}
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

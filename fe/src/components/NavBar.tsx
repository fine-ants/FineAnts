import React from "react";

type Props = {
  navItems: React.ReactElement[];
  style?: React.CSSProperties;
  children: React.ReactNode;
};

const NavContext = React.createContext({ navItems: [<div>initial</div>] });

export function NavBar({ navItems, style, children }: Props) {
  const contextValue = { navItems };

  return (
    <NavContext.Provider value={contextValue}>
      <nav style={style}>{children}</nav>
    </NavContext.Provider>
  );
}

export function NavList({
  children,
  style,
}: {
  children: React.ReactNode;
  style: React.CSSProperties;
}) {
  return <ul style={style}>{children}</ul>;
}

export function NavItem() {
  const { navItems } = React.useContext(NavContext);

  return (
    <>
      {navItems.map((navItem, idx) => (
        <li key={idx}>{navItem}</li>
      ))}
    </>
  );
}

NavBar.NavList = NavList;
NavBar.NavItem = NavItem;

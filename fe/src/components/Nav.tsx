import React from "react";

const NavContext = React.createContext({
  links: [{ name: "", url: "" }],
});

type Props = {
  links: { name: string; url: string }[];
  style?: React.CSSProperties;
  children: React.ReactNode;
};

export function NavWrapper({ links, style, children }: Props) {
  const contextValue = { links };

  return (
    <NavContext.Provider value={contextValue}>
      <nav style={style}>{children}</nav>
    </NavContext.Provider>
  );
}

export function NavList({
  children,
  style,
  ...props
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <ul style={style} {...props}>
      {children}
    </ul>
  );
}

export function NavItem({
  link,
  style,
  ...props
}: {
  link: { name: string; url: string };
  style?: React.CSSProperties;
}) {
  return (
    <li key={link.url} {...props}>
      <a style={style} href={link.url}>
        {link.name}
      </a>
    </li>
  );
}

NavWrapper.NavList = NavList;
NavWrapper.NavItem = NavItem;

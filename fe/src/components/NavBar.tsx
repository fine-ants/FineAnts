import React from "react";

type Props = {
  style: React.CSSProperties;
  children: React.ReactNode;
};

export function NavBar({ style, children }: Props) {
  return (
    <nav>
      <ul style={style}> {children}</ul>
    </nav>
  );
}

export function NavItem({
  style,
  link,
}: {
  style: React.CSSProperties;
  link: { name: string; path: string };
}) {
  return (
    <>
      <li key={link.name}>
        <a style={style} href={link.path}>
          {link.name}
        </a>
      </li>
    </>
  );
}

NavBar.NavItem = NavItem;

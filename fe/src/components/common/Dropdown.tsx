import { ReactNode, createContext, useContext, useState } from "react";
import { CSSProperties } from "styled-components";

const DropdownContext = createContext({
  isOpen: false,
  toggle: () => {},
});

export default function Dropdown({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <DropdownContext.Provider value={{ isOpen, toggle }}>
      <div>{children}</div>
    </DropdownContext.Provider>
  );
}

function DropdownToggle({
  children,
  style,
}: {
  children: ReactNode;
  style: CSSProperties;
}) {
  const { toggle } = useContext(DropdownContext);

  return (
    <button style={style} onClick={toggle}>
      {children}
    </button>
  );
}

function DropdownMenu({
  children,
  style,
}: {
  children: ReactNode;
  style: CSSProperties;
}) {
  const { isOpen } = useContext(DropdownContext);

  return isOpen ? (
    <div style={{ position: "relative" }}>
      <ul style={{ ...style, position: "absolute" }}>{children}</ul>
    </div>
  ) : null;
}

function DropdownItem({
  style,
  item,
}: {
  style: CSSProperties;
  item: {
    name: string;
    onClick: () => void;
  };
}) {
  return (
    <>
      <li key={item.name} style={style} onClick={item.onClick}>
        {item.name}
      </li>
    </>
  );
}

Dropdown.Toggle = DropdownToggle;
Dropdown.Menu = DropdownMenu;
Dropdown.Item = DropdownItem;

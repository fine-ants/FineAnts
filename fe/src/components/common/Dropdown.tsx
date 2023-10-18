import React, { useContext } from "react";
interface DropdownProps {
  children: React.ReactNode;
  itemProps: {
    name: string;
    onClick: () => void;
  }[];
}
const DropdownContext = React.createContext({
  isOpen: false,
  toggle: () => {},
  itemProps: [
    {
      name: "",
      onClick: () => {},
    },
  ],
});

export default function Dropdown({ children, itemProps }: DropdownProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <DropdownContext.Provider value={{ isOpen, toggle, itemProps }}>
      <div>{children}</div>
    </DropdownContext.Provider>
  );
}

function DropdownToggle({
  children,
  style,
}: {
  children: React.ReactNode;
  style: React.CSSProperties;
}) {
  const { toggle } = useContext(DropdownContext);

  return (
    <button style={style} onClick={toggle}>
      {children}
    </button>
  );
}

function DropdownList({
  children,
  style,
}: {
  children: React.ReactNode;
  style: React.CSSProperties;
}) {
  const { isOpen } = useContext(DropdownContext);

  return isOpen ? (
    <div style={{ position: "relative" }}>
      <ul style={{ ...style, position: "absolute" }}>{children}</ul>
    </div>
  ) : null;
}

function DropdownItems({ style }: { style: React.CSSProperties }) {
  const { itemProps } = useContext(DropdownContext);

  return (
    <>
      {itemProps.map((item) => (
        <li key={item.name} style={style} onClick={item.onClick}>
          {item.name}
        </li>
      ))}
    </>
  );
}

Dropdown.Toggle = DropdownToggle;
Dropdown.List = DropdownList;
Dropdown.Items = DropdownItems;

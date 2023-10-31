import { User } from "@api/auth";
import { ReactNode, createContext, useState } from "react";

export const UserContext = createContext<{
  user: User | null;
  onSignIn: (user: User) => void;
  onSignOut: () => void;
}>({
  user: null,
  onSignIn: () => {},
  onSignOut: () => {},
});

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const onSignIn = (user: User) => {
    setUser(user);
  };

  const onSignOut = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, onSignIn, onSignOut }}>
      {children}
    </UserContext.Provider>
  );
}

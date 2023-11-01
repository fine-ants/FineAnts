import { SignInData, User } from "@api/auth";
import { ReactNode, createContext, useState } from "react";

export const UserContext = createContext<{
  user: User | null;
  onSignIn: (signInData: SignInData) => void;
  onSignOut: () => void;
}>({
  user: null,
  onSignIn: () => {},
  onSignOut: () => {},
});

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const onSignIn = ({
    jwt: { accessToken, refreshToken },
    user,
  }: SignInData) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    setUser(user);
  };

  const onSignOut = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, onSignIn, onSignOut }}>
      {children}
    </UserContext.Provider>
  );
}

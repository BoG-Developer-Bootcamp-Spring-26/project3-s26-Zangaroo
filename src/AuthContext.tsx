import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type User = {
  id: string;
  isAdmin: boolean;
  fullName: string, 
} | null;


type AuthContextType = {
  user: User;
  login: (data: { userid: string; isAdmin: boolean, fullName: string }) => void;
  logout: () => void;
};


const AuthContext = createContext<AuthContextType | undefined>(undefined);


type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>(null);

  
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const login = (data: { userid: string; isAdmin: boolean, fullName: string }) => {
    const newUser = {
      id: data.userid,
      isAdmin: data.isAdmin,
      fullName: data.fullName, 
    };

    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}


export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
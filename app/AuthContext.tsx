import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of the context data
interface AuthContextType {
  account: string | null;
  setAccount: (account: string | null) => void;
}

// Create the context with an empty default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create a provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [account, setAccount] = useState<string | null>("");

  return (
    <AuthContext.Provider value={{ account, setAccount }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

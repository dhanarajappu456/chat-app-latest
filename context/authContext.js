const { createContext, useState, useEffect, useContext } = require("react");

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);

  useEffect(() => {
    setInterval(() => {
      setIsAuthenticated(false);
    }, 3000);
    //on auth change
  }, []);

  const login = async (email, password) => {
    try {
    } catch (e) {}
  };

  const logout = async () => {
    try {
    } catch (e) {}
  };
  const register = async (email, password, username, profileUrl) => {
    try {
    } catch (e) {}
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error("Should be wrapped in context provider");
  }
  return value;
};

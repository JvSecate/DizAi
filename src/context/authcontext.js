import { createContext } from "react";
import useSessionStorage from "../hook/useSessionStorage";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {

  const { gravarToken, accessToken } = useSessionStorage();

  return (
    <AuthContext.Provider value={{ gravarToken, accessToken }}>
      { children }
    </AuthContext.Provider>
  )

}

export default AuthProvider;
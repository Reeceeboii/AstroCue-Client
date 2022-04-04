import useLocalStorage from "@rehooks/local-storage";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect } from "react";
import LocalStorageKeys from "../../lib/constants/LocalStorageKeys";

/** Type representing an AstroCue user */
type AstroCueUser = {
  /** The user's first name */
  firstName: string;
  /** The user's last name */
  lastName: string;
  /** The user's email address */
  emailAddress: string;
}

/** Interface representing the AstroCue user context*/
interface AstroCueUserContext {
  /** User */
  astroCueUser?: AstroCueUser;
  /** Sets user */
  setAstroCueUser: (astroCueUser?: AstroCueUser) => void;
  /** JSON Web Token, passed as a bearen token header to auth with backend */
  token?: string;
  /** Sets JWT */
  setToken: (token?: string) => void;
}

/** AstroCueUserContext */
const AstroCueUserContext = createContext<AstroCueUserContext>({
  astroCueUser: undefined,
  setAstroCueUser: () => { },
  token: undefined,
  setToken: () => { },
});

export const useAstroCueContext = () => useContext(AstroCueUserContext);
const AstroCueUserProvider = AstroCueUserContext.Provider;

export const AstroCueUserContextProvider: React.FC = ({ children }) => { 
  const [astroCueUser, setAstroCueUser] = useLocalStorage<AstroCueUser | undefined>(LocalStorageKeys.User, undefined);
  const [token, setToken] = useLocalStorage<string | undefined>(LocalStorageKeys.Token, undefined);

  return <AstroCueUserProvider value={
    {
      astroCueUser,
      setAstroCueUser,
      token,
      setToken,
    }
  }>
    {children}
  </AstroCueUserProvider>;
}
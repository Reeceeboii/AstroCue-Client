import useLocalStorage from '@rehooks/local-storage';
import { createContext, useContext } from 'react';
import LocalStorageKeys from '../lib/Constants/LocalStorageKeys';
import { AstroCueUser } from '../lib/Models/Misc/AstroCueUser';

/** Interface representing the AstroCue user context*/
interface AstroCueUserContextValues {
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
const AstroCueUserContext = createContext<AstroCueUserContextValues>({
  astroCueUser: undefined,
  setAstroCueUser: () => {},
  token: undefined,
  setToken: () => {},
});

export const useAstroCueContext = () => useContext(AstroCueUserContext);
const AstroCueUserProvider = AstroCueUserContext.Provider;

export const AstroCueUserContextProvider: React.FC = ({ children }) => {
  const [astroCueUser, setAstroCueUser] = useLocalStorage<
    AstroCueUser | undefined
  >(LocalStorageKeys.User, undefined);
  const [token, setToken] = useLocalStorage<string | undefined>(
    LocalStorageKeys.Token,
    undefined,
  );

  return (
    <AstroCueUserProvider
      value={{
        astroCueUser,
        setAstroCueUser,
        token,
        setToken,
      }}
    >
      {children}
    </AstroCueUserProvider>
  );
};

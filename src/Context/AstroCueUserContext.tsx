import useLocalStorage from '@rehooks/local-storage';
import { createContext, useContext } from 'react';
import LocalStorageKeys from '../lib/Constants/LocalStorageKeys';
import { AstroCueUser } from '../lib/Models/Misc/AstroCueUser';

/** Interface representing the AstroCue user context */
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

const vals: AstroCueUserContextValues = {
  astroCueUser: undefined,
  setAstroCueUser: () => {},
  token: undefined,
  setToken: () => {},
};

export const AstroCueUserContext = createContext(vals);

export const AstroCueUserContextProvider: React.FC = (props) => {
  const [astroCueUser, setAstroCueUser] = useLocalStorage<
    AstroCueUser | undefined
  >(LocalStorageKeys.User, undefined);

  const [token, setToken] = useLocalStorage<string | undefined>(
    LocalStorageKeys.Token,
    undefined,
  );

  return (
    <AstroCueUserContext.Provider
      value={{
        astroCueUser,
        setAstroCueUser,
        token,
        setToken,
      }}
    >
      {props.children}
    </AstroCueUserContext.Provider>
  );
};

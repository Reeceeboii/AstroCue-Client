import useLocalStorage from '@rehooks/local-storage';
import LocalStorageKeys from '../constants/LocalStorageKeys';

/** Hook for checking if a user is logged in - denoted by a JWT being present in the browser */
export const useIsLoggedIn = () => {
  const [token] = useLocalStorage(LocalStorageKeys.Token);
  return token !== null;
};

export default useIsLoggedIn;

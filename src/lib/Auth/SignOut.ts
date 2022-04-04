import { deleteFromStorage } from '@rehooks/local-storage';
import Router from 'next/router';
import LocalStorageKeys from '../Constants/LocalStorageKeys';

/** Removes all keys from local storage */
export const SignOut = () => {
  deleteFromStorage(LocalStorageKeys.User);
  deleteFromStorage(LocalStorageKeys.Token);
  Router.push('/login');
};

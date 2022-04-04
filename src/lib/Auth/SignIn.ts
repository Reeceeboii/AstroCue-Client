import { writeStorage } from '@rehooks/local-storage';
import LocalStorageKeys from '../Constants/LocalStorageKeys';
import OutboundAuthSuccessModel from './Models';

/** Stores user details in local storage */
export const SignIn = (user: OutboundAuthSuccessModel) => {
  writeStorage(LocalStorageKeys.User, user);
  writeStorage(LocalStorageKeys.Token, user.token);
};

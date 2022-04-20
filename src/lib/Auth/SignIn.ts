import { writeStorage } from '@rehooks/local-storage';
import LocalStorageKeys from '../Constants/LocalStorageKeys';
import OutboundAuthSuccessModel from '../Models/Outbound/OutboundAuthSuccessModel';

/** Stores user details in local storage */
export const SignIn = (user: OutboundAuthSuccessModel | undefined) => {
  if (user === undefined) {
    return;
  }
  writeStorage(LocalStorageKeys.User, user);
  writeStorage(LocalStorageKeys.Token, user.token);
};

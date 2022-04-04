import { deleteFromStorage, writeStorage } from "@rehooks/local-storage";
import Router from "next/router";
import LocalStorageKeys from "../constants/LocalStorageKeys";
import OutboundAuthSuccessModel from "./Models";

/** Stores user details in local storage */
export const SignIn = (user: OutboundAuthSuccessModel) => { 
  writeStorage(LocalStorageKeys.User, user);
  writeStorage(LocalStorageKeys.Token, user.token);
}

/** Removes all keys from local storage */
export const SignOut = () => { 
  deleteFromStorage(LocalStorageKeys.User);
  deleteFromStorage(LocalStorageKeys.Token);
  Router.push("/login");
}
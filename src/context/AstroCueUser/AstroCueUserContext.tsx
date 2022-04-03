import { createContext, useContext } from "react";
import { AstroCueUserContext } from "./models";

/** AstroCueUserContext */
const AstroCueUserContext = createContext<AstroCueUserContext>({
  jwt: undefined,
  setJwt: () => { },
  astroCueUser: undefined,
  setAstroCueUser: () => { },
});


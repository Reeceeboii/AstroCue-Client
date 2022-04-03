/** Type representing an AstroCue user */
export type AstroCueUser = {
  /** The user's first name */
  firstName: string;
  /** The user's last name */
  lastName: string;
  /** The user's email address */
  emailAddress: string;
}

/** Interface representing the AstroCue user context*/
export interface AstroCueUserContext {
  /** User */
  astroCueUser?: AstroCueUser;
  /** Sets user */
  setAstroCueUser: (astroCueUser?: AstroCueUser) => void;
  /** JSON Web Token, passed as a bearen token header to auth with backend */
  jwt?: string;
  /** Sets JWT */
  setJwt: (jwt?: string) => void;
}
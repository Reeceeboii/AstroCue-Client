/** Type representing a successful user authentication */
type OutboundAuthSuccessModel = {
  /** The user's ID */
  id: number,
  /** The user's email address */
  emailAddress: string,
  /** The user's first name */
  firstName: string,
  /** The user's last name */
  lastName: string,
  /** JWT */
  token: string,
}

export default OutboundAuthSuccessModel;
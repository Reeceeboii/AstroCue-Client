/** Hook for checking if a user is logged in - denoted by a JWT being present in the browser */
export const useIsLoggedIn = () => {
  return localStorage.getItem('token') !== null;
}

export default useIsLoggedIn;
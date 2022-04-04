import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useIsLoggedIn } from './useIsLoggedIn';

/** Hook that redirects to login page if user is not logged in yet */
const useLoginRedirect = () => {
  const isLoggedIn = useIsLoggedIn();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }
  }, [isLoggedIn, router]);
};

export default useLoginRedirect;

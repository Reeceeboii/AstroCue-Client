import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useIsLoggedIn } from './useIsLoggedIn';

/** Hook that redirects logged in users to index. Use on routes like login and register forms etc... */
const useRedirectLoggedInUsers = () => { 
  const isLoggedIn = useIsLoggedIn();
  const router = useRouter();

  useEffect(() => { 
    if (isLoggedIn) {
      router.push('/');
      return;
    }
  }, [isLoggedIn, router]);
}

export default useRedirectLoggedInUsers;
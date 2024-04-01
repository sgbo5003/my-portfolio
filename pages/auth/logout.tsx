import { AuthModel } from '../../components/auth';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAuth } from '../../components/auth/core/Auth';
import * as authHelper from '../../components/auth/core/AuthHelpers';

export default function Logout() {
  const router = useRouter();
  const saveAuth = (auth: AuthModel | undefined) => {
    setAuth(auth);
    if (auth) {
      authHelper.setAuth(auth);
    } else {
      authHelper.removeAuth();
    }
  };
  const { logout } = useAuth();
  const [auth, setAuth] = useState<AuthModel | undefined>(authHelper.getAuth());
  useEffect(() => {
    saveAuth(undefined);
    authHelper.removeAuth();
    sessionStorage.removeItem('myUserInfo');
    sessionStorage.removeItem('myBusinessAccountInfo');
    sessionStorage.removeItem('myAdAccountInfo');
    sessionStorage.removeItem('selectedAdAccount');
    document.location = '/auth/login';
    return;
    // logout();

    // document.location.reload();
  }, []);
  // }, [logout]);

  // router.push('/auth/login');

  return;
}

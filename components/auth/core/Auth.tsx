import { createContext, FC, ReactNode, useContext, useEffect, useState } from 'react';
import { LayoutSplashScreen } from '../../../angkor/layout/core';
import { AuthModel } from './_models';
import * as authHelper from './AuthHelpers';
import { WithChildren } from '../../../angkor/helpers';
import { useRouter } from 'next/router';
import AuthLayout from '../../../angkor/layout/AuthLayout';
import MasterLayout from '../../../angkor/layout/MasterLayout';
import { MasterInit } from '../../../angkor/layout/MasterInit';

export type AuthContextProps = {
  auth: AuthModel | undefined;
  saveAuth: (auth: AuthModel | undefined) => void;
  saveAuthLogin: (auth: AuthModel | undefined) => void;
  logout: () => void;
  userLogout: () => void;
};

const initAuthContextPropsState = {
  auth: authHelper.getAuth(),
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  saveAuth: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  saveAuthLogin: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  logout: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  userLogout: () => {},
};

const AuthContext = createContext<AuthContextProps>(initAuthContextPropsState);

const useAuth = () => useContext(AuthContext);

// interface AuthInitProps {
//   children?: React.ReactNode;
// }

const AuthProvider: FC<WithChildren> = ({ children }) => {
  const [auth, setAuth] = useState<AuthModel | undefined>(authHelper.getAuth());
  const router = useRouter();
  // const [currentUser, setCurrentUser] = useState<UserModel | undefined>();
  const saveAuth = (auth: AuthModel | undefined) => {
    if (authHelper.getAuth() !== undefined) {
      setAuth(auth);
      if (auth) {
        authHelper.setAuth(auth);
      } else {
        authHelper.removeAuth();
      }
    } else {
      authHelper.removeAuth();
    }
  };

  const saveAuthLogin = (auth: AuthModel | undefined) => {
    setAuth(auth);
    if (auth) {
      authHelper.setAuth(auth);
    } else {
      authHelper.removeAuth();
    }
  };

  useEffect(() => {
    if (!router.isReady) return;
  }, [router.isReady]);

  const logout = async () => {
    saveAuth(undefined);
    authHelper.removeAuth();
    document.location = '/auth/login';
  };

  const userLogout = () => {
    // console.log('userLogout');
    saveAuth(undefined);
    authHelper.removeAuth();
    document.location = '/auth/login';
    sessionStorage.removeItem('myUserInfo');
    sessionStorage.removeItem('myBusinessAccountInfo');
    sessionStorage.removeItem('myAdAccountInfo');
    sessionStorage.removeItem('selectedAdAccount');
    // document.location = '/auth/logout';
    return;
    // saveAuth(undefined);
    // authHelper.removeAuth();
    // router.push('/auth/logout', undefined, { shallow: true });
  };

  return (
    <AuthContext.Provider value={{ auth, saveAuth, saveAuthLogin, logout, userLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

// const AuthInit = ({ children }: AuthInitProps) => {
//   const { auth, logout } = useAuth();
//   const didRequest = useRef(false);
//   const [showSplashScreen, setShowSplashScreen] = useState(true);
//   // We should request user by authToken (IN OUR EXAMPLE IT'S API_TOKEN) before rendering the application
//
//   useEffect(() => {
//     const requestUser = async (apiToken: string) => {
//       try {
//         if (!didRequest.current) {
//         }
//       } catch (error) {
//         console.error(error);
//         if (!didRequest.current) {
//           logout();
//         }
//       } finally {
//         setShowSplashScreen(false);
//       }
//
//       return () => (didRequest.current = true);
//     };
//     if (auth && auth.accessToken) {
//       requestUser(auth.accessToken);
//     } else {
//       logout();
//       setShowSplashScreen(false);
//     }
//     // eslint-disable-next-line
//   }, []);
//
//   if (showSplashScreen) {
//     return <LayoutSplashScreen />;
//   }
//   return <>{children}</>;
// };

interface AuthInitProps {
  children: ReactNode;
}

const AuthInit = ({ children }: AuthInitProps) => {
  const [showSplashScreen, setShowSplashScreen] = useState(true);

  // const { auth } = useAuth();
  const [auth, setAuth] = useState<AuthModel | undefined>(authHelper.getAuth());
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  const saveAuth = (auth: AuthModel | undefined) => {
    setAuth(auth);
    if (auth) {
      authHelper.setAuth(auth);
    } else {
      authHelper.removeAuth();
    }
  };

  const publicPaths = [
    '/auth/login',
    '/auth/logout',
    '/auth/signup',
    '/auth/forgotPassword',
    '/test',
    '/test2',
    '/ko/auth/login',
    '/en/auth/login',
    '/ko/auth/logout',
    '/en/auth/logout',
    '/ko/auth/signup',
    '/en/auth/signup',
    '/ko/auth/forgotPassword',
    '/en/auth/forgotPassword',
  ];

  let path = '';

  const authCheck = async (url: string) => {
    // redirect to login page if accessing a private page and not logged in
    path = url.split('?')[0];
    // console.log(path);
    if (path.includes('/auth/logout')) {
      saveAuth(undefined);
      authHelper.removeAuth();
      router.replace({
        pathname: '/auth/login',
      });
      return;
    }

    setShowSplashScreen(true);
    if (!auth && !publicPaths.includes(path)) {
      setAuthorized(false);
      await router.replace({
        pathname: '/auth/login',
      });
    } else if (!auth && publicPaths.includes(path)) {
      setAuthorized(true);
    } else if (auth && publicPaths.includes(path)) {
      setAuthorized(true);
      await router.replace({
        pathname: '/businessAccount/all',
      });
    } else {
      setAuthorized(true);
    }
    setShowSplashScreen(false);
  };

  useEffect(() => {
    // on initial load - run auth check
    authCheck(router.asPath);

    // on route change start - hide page content by setting authorized to false
    const hideContent = () => setAuthorized(false);
    router.events.on('routeChangeStart', hideContent);

    // on route change complete - run auth check
    router.events.on('routeChangeComplete', authCheck);

    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off('routeChangeStart', hideContent);
      router.events.off('routeChangeComplete', authCheck);
      setShowSplashScreen(false);
    };
  }, [auth]);

  if (showSplashScreen) {
    return <LayoutSplashScreen />;
  }
  if (!auth && !publicPaths.includes(path)) {
    return <AuthLayout>{authorized && children}</AuthLayout>;
  } else if (!auth && publicPaths.includes(path)) {
    return <></>;
  } else if (auth && publicPaths.includes(path)) {
    return <></>;
  } else {
    return (
      <MasterLayout>
        <MasterInit />
        {children}
      </MasterLayout>
    );
  }
};

export { AuthProvider, AuthInit, useAuth };

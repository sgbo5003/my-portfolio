import '../styles/globals.scss';
import '@styles/common.scss';
import { ReactElement, ReactNode, Suspense } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { LayoutProvider, LayoutSplashScreen } from '../angkor/layout/core';
import { AuthInit, AuthProvider } from '../components/auth';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // const Layout = Component.Layout || ((children: ReactElement) => <>{children}</>)

  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <AuthProvider>
        <LayoutProvider>
          <AuthInit>
            <Component {...pageProps} />
          </AuthInit>
        </LayoutProvider>
      </AuthProvider>
    </Suspense>
  );
}

export default MyApp;

// import '@styles/common.scss';
import '../styles/globals.scss';
import { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Image from 'next/image';
import img1 from '../public/assets/images/앙코르솔루션_광고그룹.png';
import SpecialMenuComponent from '../components/header';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // const Layout = Component.Layout || ((children: ReactElement) => <>{children}</>)

  return (
    <div className="home_body">
      <div className="front_img">
        <Image src={img1} alt="메인이미지" height="204" width="1080" />
      </div>
      <SpecialMenuComponent />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;

import { HeaderWrapper } from './components/header';
import { FooterWrapper } from './components/footer';
import { Sidebar } from './components/sidebar';
import { ScrollTop } from './components/scroll-top';
import { Content } from './components/content';
import { ToolbarWrapper } from './components/toolbar';
import { PageDataProvider } from './core';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { MenuComponent } from '../assets/ts/components';
import { MasterInit } from './MasterInit';
import { useAuth } from '../../components/auth';

export default function MasterLayout({ children }: any) {
  const router = useRouter();
  const { auth } = useAuth();
  // useEffect(() => {
  //   setTimeout(() => {
  //     MenuComponent.bootstrap();
  //   }, 500);
  // }, []);

  // useEffect(() => {
  //   console.log('2');
  //   setTimeout(() => {
  //     MenuComponent.bootstrap();
  //     // MenuComponent.reinitialization();
  //   }, 500);
  // }, [router]);

  useEffect(() => {
    const storage = globalThis?.sessionStorage;
    if (!storage) return;
    // Set the previous path as the value of the current path.
    let prevPath = storage.getItem('currentPath');
    prevPath = prevPath === null ? '' : prevPath;
    if (typeof prevPath === 'undefined') {
      prevPath = '';
    }
    storage.setItem('prevPath', prevPath);
    // Set the current path value by looking at the browser's location object.
    storage.setItem('currentPath', globalThis.location.pathname);

    // console.log('router', router);
    if (router.pathname == '/businessAccount/all') {
      document.body.setAttribute('data-app-sidebar-fixed', 'false');
      // document.body.setAttribute('data-app-sidebar-enabled', 'false');
    } else {
      // setTimeout(() => {
      //   // sidebar가 없는 상태에서 생겼을때 drop & down이 안되는 현상 해결 (MenuComponent를 불러오는데 시간이 좀 걸리는 것 같다.)
      //   if ((prevPath === null ? '' : prevPath).startsWith('/businessAccount')) {
      //     MenuComponent.bootstrap();
      //   }
      //   MenuComponent.bootstrap();
      // }, 500);
    }
  }, [router]);

  if (auth === undefined || router.pathname.startsWith('/auth/login')) {
    return <></>;
  } else {
    return (
      <>
        <PageDataProvider>
          <div className="d-flex flex-column flex-root app-root" id="app_root">
            <div className="app-page flex-column flex-column-fluid" id="app_page">
              <HeaderWrapper />
              <div className="app-wrapper flex-column flex-row-fluid" id="app_wrapper">
                <Sidebar />
                <div className="app-main flex-column flex-row-fluid" id="app_main">
                  {/* <div className="d-flex flex-column flex-column-fluid" id="campaign_reform_wrap"> */}
                  <div
                    className="d-flex flex-column flex-column-fluid"
                    id={`${
                      router.pathname == '/businessAccount/all'
                        ? 'myinfo_wrap'
                        : router.pathname.startsWith(`/ad/[adaccountId]/campaign_group`)
                        ? 'campaign_reform_wrap'
                        : ''
                    }`}
                  >
                    {/* <ToolbarWrapper /> */}
                    <Content>{children}</Content>
                  </div>
                  <FooterWrapper />
                </div>
              </div>
            </div>
          </div>
          <ScrollTop />
        </PageDataProvider>
      </>
    );
  }
}

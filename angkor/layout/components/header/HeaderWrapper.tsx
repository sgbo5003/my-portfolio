import clsx from 'clsx';
import { useLayout } from '../../core';
import Link from 'next/link';
import { AKSVG, toAbsoluteUrl } from '../../../helpers';
import { Header } from './Header';
import { Navbar } from './Navbar';
import { useRouter } from 'next/router';

const HeaderWrapper = () => {
  const { config, classes } = useLayout();
  const router = useRouter();
  if (!config.app?.header?.display) {
    return null;
  }

  return (
    <div id="app_header" className="app-header">
      <div
        id="app_header_container"
        className={clsx(
          'app-container flex-lg-grow-1',
          classes.headerContainer.join(' '),
          config.app?.header?.default?.containerClass,
        )}
      >
        {config.app.sidebar?.display && (
          <>
            <div className="d-flex align-items-center d-lg-none ms-n2 me-2" title="Show sidebar menu">
              <div className="btn btn-icon btn-active-color-primary w-35px h-35px" id="app_sidebar_mobile_toggle">
                <AKSVG path="/assets/icons/duotune/abstract/abs015.svg" className=" svg-icon-1" />
              </div>
              <div className="d-flex align-items-center flex-grow-1 flex-lg-grow-0">
                {/* <Link href="#"> */}
                <a className="d-lg-none">
                  <img alt="Logo" src={toAbsoluteUrl('/assets/images/logos/logo.png')} className="h-30px" />
                </a>
                {/* </Link> */}
              </div>
            </div>
          </>
        )}

        {!config.app.sidebar?.display && (
          <div className="d-flex align-items-center flex-grow-1 flex-lg-grow-0 me-lg-15">
            {/* <Link href="#"> */}
            <a
              onClick={() => {
                router.push('/businessAccount/all');
                sessionStorage.removeItem('myAdAccountInfo');
                sessionStorage.removeItem('selectedAdAccount');
              }}
            >
              {config.layoutType !== 'dark-header' ? (
                <img
                  alt="Logo"
                  src={toAbsoluteUrl('/assets/images/logos/logo.png')}
                  className="h-20px h-lg-30px app-sidebar-logo-default"
                />
              ) : (
                <>
                  <img
                    alt="Logo"
                    src={toAbsoluteUrl('/assets/images/logos/logo.png')}
                    className="h-20px h-lg-30px app-sidebar-logo-default theme-light-show"
                  />
                  <img
                    alt="Logo"
                    src={toAbsoluteUrl('/assets/images/logos/logo.png.svg')}
                    className="h-20px h-lg-30px app-sidebar-logo-default theme-dark-show"
                  />
                </>
              )}
            </a>
            {/* </Link> */}
          </div>
        )}

        <div id="app_header_wrapper" className="d-flex align-items-stretch justify-content-between flex-lg-grow-1">
          {config.app.header.default?.content === 'menu' && config.app.header.default.menu?.display && (
            <div
              className="app-header-menu app-header-mobile-drawer align-items-stretch"
              data-drawer="true"
              data-drawer-name="app-header-menu"
              data-drawer-activate="{default: true, lg: false}"
              data-drawer-overlay="true"
              data-drawer-width="225px"
              data-drawer-direction="end"
              data-drawer-toggle="#app_header_menu_toggle"
              data-swapper="true"
              data-swapper-mode="{default: 'append', lg: 'prepend'}"
              data-swapper-parent="{default: '#app_body', lg: '#app_header_wrapper'}"
            >
              <Header />
            </div>
          )}
          <Navbar />
        </div>
      </div>
    </div>
  );
};

export { HeaderWrapper };

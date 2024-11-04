import clsx from 'clsx';
import { AKSVG, toAbsoluteUrl } from '../../../helpers';
import { useLayout } from '../../core';
import { useRouter } from 'next/router';

const SidebarLogo = () => {
  const { config } = useLayout();
  const router = useRouter();
  const appSidebarDefaultMinimizeDesktopEnabled = config?.app?.sidebar?.default?.minimize?.desktop?.enabled;
  const appSidebarDefaultCollapseDesktopEnabled = config?.app?.sidebar?.default?.collapse?.desktop?.enabled;
  const toggleType = appSidebarDefaultCollapseDesktopEnabled
    ? 'collapse'
    : appSidebarDefaultMinimizeDesktopEnabled
    ? 'minimize'
    : '';
  const toggleState = appSidebarDefaultMinimizeDesktopEnabled ? 'active' : '';
  const appSidebarDefaultMinimizeDefault = config.app?.sidebar?.default?.minimize?.desktop?.default;
  return (
    <div
      className={
        router.pathname == '/businessAccount/all' ? 'app-sidebar-logo px-6 display_none' : 'app-sidebar-logo px-6'
      }
      id="app_sidebar_logo"
    >
      {/* <Link href="#"> */}
      <a
        onClick={() => {
          router.push('/dashboard');
          sessionStorage.removeItem('myAdAccountInfo');
          sessionStorage.removeItem('selectedAdAccount');
        }}
      >
        {config.layoutType === 'dark-sidebar' ? (
          <img
            alt="Logo"
            src={toAbsoluteUrl('/assets/images/logos/logo.png')}
            className="h-35px app-sidebar-logo-default"
          />
        ) : (
          <>
            <img
              alt="Logo"
              src={toAbsoluteUrl('/assets/images/logos/logo.png')}
              className="h-35px app-sidebar-logo-default theme-light-show"
            />
            <img
              alt="Logo"
              src={toAbsoluteUrl('/assets/images/logos/logo.png')}
              className="h-35px app-sidebar-logo-default theme-dark-show"
            />
          </>
        )}

        <img
          alt="Logo"
          src={toAbsoluteUrl('/assets/images/logos/logo.png')}
          className="h-30px app-sidebar-logo-minimize"
        />
      </a>
      {/* </Link> */}

      {(appSidebarDefaultMinimizeDesktopEnabled || appSidebarDefaultCollapseDesktopEnabled) && (
        <div
          id="app_sidebar_toggle"
          className={clsx(
            // eslint-disable-next-line max-len
            'app-sidebar-toggle btn btn-icon btn-shadow btn-sm btn-color-muted btn-active-color-primary body-bg h-30px w-30px position-absolute top-50 start-100 translate-middle rotate',
            { active: appSidebarDefaultMinimizeDefault },
          )}
          data-toggle="true"
          data-toggle-state={toggleState}
          data-toggle-target="body"
          data-toggle-name={`app-sidebar-${toggleType}`}
        >
          <AKSVG path="/assets/icons/duotune/arrows/arr079.svg" className="svg-icon-2 rotate-180" />
        </div>
      )}
    </div>
  );
};

export { SidebarLogo };

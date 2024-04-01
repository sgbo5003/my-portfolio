/* eslint-disable react/jsx-no-target-blank */
import { AKSVG } from '../../../helpers';
import { useRouter } from 'next/router';

const SidebarFooter = () => {
  const router = useRouter();
  return (
    <div
      className={
        router.pathname == '/businessAccount/all'
          ? 'app-sidebar-footer flex-column-auto pt-2 pb-6 px-6 display_none'
          : 'app-sidebar-footer flex-column-auto pt-2 pb-6 px-6'
      }
      id="app_sidebar_footer"
    >
      <a
        href={process.env.REACT_APP_PREVIEW_URL}
        target="_blank"
        className="btn btn-flex flex-center btn-custom btn-primary overflow-hidden text-nowrap px-0 h-40px w-100"
        data-bs-toggle="tooltip"
        data-bs-trigger="hover"
        data-bs-dismiss-="click"
        title="Metronic Docs & Components"
      >
        <span className="btn-label">Docs & Components</span>
        <AKSVG path="/assets/icons/duotune/general/gen005.svg" className="btn-icon svg-icon-2 m-0" />
      </a>
    </div>
  );
};

export { SidebarFooter };

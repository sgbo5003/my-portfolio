import { SidebarMenuMain } from './SidebarMenuMain';
import { useRouter } from 'next/router';

const SidebarMenu = () => {
  const router = useRouter();
  return (
    <div
      className={
        router.pathname == '/businessAccount/all'
          ? 'app-sidebar-menu overflow-hidden flex-column-fluid display_none'
          : 'app-sidebar-menu overflow-hidden flex-column-fluid '
      }
    >
      <div
        id="app_sidebar_menu_wrapper"
        className="app-sidebar-wrapper hover-scroll-overlay-y my-5"
        data-scroll="true"
        data-scroll-activate="true"
        data-scroll-height="auto"
        data-scroll-dependencies="#app_sidebar_logo, #app_sidebar_footer"
        data-scroll-wrappers="#app_sidebar_menu"
        data-scroll-offset="5px"
        data-scroll-save-state="true"
      >
        <div
          className="menu menu-column menu-rounded menu-sub-indention px-3"
          id="#app_sidebar_menu"
          data-menu="true"
          data-menu-expand="false"
        >
          <SidebarMenuMain />
        </div>
      </div>
    </div>
  );
};

export { SidebarMenu };

import Link from 'next/link';
import { useEffect } from 'react';
import { ILayout, useLayout } from '../../core';

const linkStyle = {
  marginRight: '1rem',
};
const Footer = () => {
  const { config } = useLayout();
  // useEffect(() => {
  //   updateDOM(config);
  // }, [config]);
  return (
    <>
      {/* <div className="text-dark order-2 order-md-1">
        <span className="text-muted fw-semibold me-1">{new Date().getFullYear().toString()}&copy;</span>
        <Link href="https://keenthemes.com/" target="_blank">
          <a className="text-gray-800 text-hover-primary">Keenthemes</a>
        </Link>
      </div>

      <ul className="menu menu-gray-600 menu-hover-primary fw-semibold order-1">
        <li className="menu-item">
          <Link href="https://keenthemes.com/" target="_blank">
            <a className="menu-link px-2">About</a>
          </Link>
        </li>

        <li className="menu-item">
          <Link href="https://devs.keenthemes.com/" target="_blank">
            <a className="menu-link px-2">Support</a>
          </Link>
        </li>

        <li className="menu-item">
          <Link
            href="https://themeforest.net/item/metronic-responsive-admin-dashboard-template/4021469"
            target="_blank"
          >
            <a className="menu-link px-2">Purchase</a>
          </Link>
        </li>
      </ul> */}
    </>
  );
};

// const updateDOM = (config: ILayout) => {
//   if (config.app?.footer?.fixed?.desktop) {
//     document.body.classList.add('data-app-footer-fixed', 'true');
//   }

//   if (config.app?.footer?.fixed?.mobile) {
//     document.body.classList.add('data-app-footer-fixed-mobile', 'true');
//   }
// };

export { Footer };

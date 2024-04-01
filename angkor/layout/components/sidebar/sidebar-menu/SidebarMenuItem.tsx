import { FC } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { checkIsActive, AKSVG, WithChildren } from '../../../../helpers';
import { useLayout } from '../../../core';

type Props = {
  to: string;
  title: string;
  icon?: string;
  fontIcon?: string;
  hasBullet?: boolean;
};

const SidebarMenuItem: FC<Props & WithChildren> = ({ children, to, title, icon, fontIcon, hasBullet = false }) => {
  const router = useRouter();
  // const isActive = checkIsActive(router.pathname, to);
  const isActive = checkIsActive(router.asPath, to);
  const { config } = useLayout();
  const { app } = config;

  return (
    <div className="menu-item">
      <Link href={to} legacyBehavior>
        <a className={clsx('menu-link without-sub', { active: isActive })}>
          {hasBullet && (
            <span className="menu-bullet">
              <span className="bullet bullet-dot"></span>
            </span>
          )}
          {icon && app?.sidebar?.default?.menu?.iconType === 'svg' && (
            <span className="menu-icon">
              {' '}
              <AKSVG path={icon} className="svg-icon-2" />
            </span>
          )}
          {fontIcon && app?.sidebar?.default?.menu?.iconType === 'font' && (
            <i className={clsx('bi fs-3', fontIcon)}></i>
          )}
          <span className="menu-title">{title}</span>
        </a>
      </Link>
      {children}
    </div>
  );
};

export { SidebarMenuItem };

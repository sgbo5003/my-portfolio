import React from 'react';
import clsx from 'clsx';
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

const SidebarMenuItemWithSub: React.FC<Props & WithChildren> = ({ children, to, title, icon, fontIcon, hasBullet }) => {
  const router = useRouter();
  const isActive = checkIsActive(router.pathname, to);
  const { config } = useLayout();
  const { app } = config;

  return (
    <div className={clsx('menu-item', { 'here show': isActive }, 'menu-accordion')} data-menu-trigger="click">
      <span className="menu-link">
        {hasBullet && (
          <span className="menu-bullet">
            <span className="bullet bullet-dot"></span>
          </span>
        )}
        {icon && app?.sidebar?.default?.menu?.iconType === 'svg' && (
          <span className="menu-icon">
            <AKSVG path={icon} className="svg-icon-2" />
          </span>
        )}
        {fontIcon && app?.sidebar?.default?.menu?.iconType === 'font' && <i className={clsx('bi fs-3', fontIcon)}></i>}
        <span className="menu-title">{title}</span>
        <span className="menu-arrow"></span>
      </span>
      <div className={clsx('menu-sub menu-sub-accordion', { 'menu-active-bg': isActive })}>{children}</div>
    </div>
  );
};

export { SidebarMenuItemWithSub };

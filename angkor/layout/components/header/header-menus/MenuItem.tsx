import { FC } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import clsx from 'clsx';
import { checkIsActive, AKSVG } from '../../../../helpers';

type Props = {
  to: string;
  title: string;
  icon?: string;
  fontIcon?: string;
  hasArrow?: boolean;
  hasBullet?: boolean;
};

const MenuItem: FC<Props> = ({ to, title, icon, fontIcon, hasArrow = false, hasBullet = false }) => {
  const router: any = useRouter();
  return (
    <div className="menu-item me-lg-1">
      <Link href={to} legacyBehavior>
        <a
          className={clsx('menu-link py-3', {
            'active menu-here': checkIsActive(`${router.pathname}`, to),
          })}
        >
          {hasBullet && (
            <span className="menu-bullet">
              <span className="bullet bullet-dot"></span>
            </span>
          )}

          {icon && (
            <span className="menu-icon">
              <AKSVG path={icon} className="svg-icon-2" />
            </span>
          )}

          {fontIcon && (
            <span className="menu-icon">
              <i className={clsx('bi fs-3', fontIcon)}></i>
            </span>
          )}

          <span className="menu-title">{title}</span>

          {hasArrow && <span className="menu-arrow"></span>}
        </a>
      </Link>
    </div>
  );
};

export { MenuItem };

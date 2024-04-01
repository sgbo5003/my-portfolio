import { FC } from 'react';
import Link from 'next/link';
// import { useAuth } from '../../../../app/modules/auth';
import { toAbsoluteUrl } from '../../../helpers';
import { useAuth } from '../../../../components/auth';
import { useRouter } from 'next/router';

const HeaderUserMenu: FC = () => {
  const { auth } = useAuth();
  const router = useRouter();
  const { adaccountId } = router.query;

  return auth === undefined ? (
    <div
      className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 
                 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px"
      data-menu="true"
    >
      <div className="menu-item px-3">
        <div className="menu-content d-flex align-items-center px-3">
          <div className="symbol symbol-50px me-5">
            <img alt="Logo" src={toAbsoluteUrl('/assets/images/avatars/blank.png')} />
          </div>

          <div className="d-flex flex-column">
            <div className="fw-bolder d-flex align-items-center fs-5">
              {/* {currentUser?.first_name} {currentUser?.first_name} */}
              {/* <span>{decrypt(auth!.userName)}</span> */}
              {/* <span className="badge badge-light-success fw-bolder fs-8 px-2 py-1 ms-2">Pro</span> */}
            </div>
            {/* <a href="#" className="fw-bold text-muted text-hover-primary fs-7"> */}
            {/* {currentUser?.email} */}
            {/* </a> */}
          </div>
        </div>
      </div>

      {/* <div className="separator my-2"></div>

      <div className="menu-item px-5">
        <Link href={'/crafted/pages/profile'}>
          <a className="menu-link px-5">My Profile</a>
        </Link>
      </div> */}

      <div className="separator my-2"></div>

      <div className="menu-item px-5">
        <Link href={`${adaccountId === undefined ? '' : `/${adaccountId}`}/myInfo`} legacyBehavior>
          <a className="menu-link px-5">{/* <a onClick={userLogout} className="menu-link px-5"> */}내 정보</a>
        </Link>
        <Link href="/auth/logout" legacyBehavior>
          <a className="menu-link px-5">
            {/* <a onClick={userLogout} className="menu-link px-5"> */}
            Sign Out
          </a>
        </Link>
      </div>
    </div>
  ) : (
    <div
      className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 
                 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px"
      data-menu="true"
    >
      <div className="menu-item px-3">
        <div className="menu-content d-flex align-items-center px-3">
          <div className="symbol symbol-50px me-5">
            <img alt="Logo" src={toAbsoluteUrl('/assets/images/avatars/blank.png')} />
          </div>

          <div className="d-flex flex-column">
            <div className="fw-bolder d-flex align-items-center fs-5">
              {/* {currentUser?.first_name} {currentUser?.first_name} */}
              <span>{auth!.userName}</span>
              {/* <span className="badge badge-light-success fw-bolder fs-8 px-2 py-1 ms-2">Pro</span> */}
            </div>
            {/* <a href="#" className="fw-bold text-muted text-hover-primary fs-7"> */}
            {/* {currentUser?.email} */}
            {/* </a> */}
          </div>
        </div>
      </div>

      {/* <div className="separator my-2"></div>

      <div className="menu-item px-5">
        <Link href={'/crafted/pages/profile'}>
          <a className="menu-link px-5">My Profile</a>
        </Link>
      </div> */}

      <div className="separator my-2"></div>

      <div className="menu-item px-5">
        {/* <Link href={`${adaccountId === undefined ? '' : `/${adaccountId}`}/myInfo`} legacyBehavior>
          <a className="menu-link px-5">내 정보</a>
        </Link> */}
        <Link href="/auth/logout" legacyBehavior>
          <a className="menu-link px-5">
            {/* <a onClick={userLogout} className="menu-link px-5"> */}
            Sign Out
          </a>
        </Link>
      </div>
    </div>
  );
};

export { HeaderUserMenu };

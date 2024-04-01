import type { NextPage } from 'next';
import Link from 'next/link';
import { toAbsoluteUrl } from '../angkor/helpers';
import { PageTitle } from '../angkor/layout/core';
import MasterLayout from '../angkor/layout/MasterLayout';

const Error404 = () => (
  <>
    <div className="d-flex flex-column flex-root">
      <div className="d-flex flex-column flex-center flex-column-fluid">
        <div className="d-flex flex-column flex-center text-center p-10">
          <div className="card card-flush  w-lg-650px py-5">
            <div className="card-body py-15 py-lg-20">
              {/* begin::Title */}
              <h1 className="fw-bolder fs-2hx text-gray-900 mb-4">404 Error</h1>
              {/* end::Title */}

              {/* begin::Text */}
              <div className="fw-semibold fs-6 text-gray-500 mb-7">Page Not Found.</div>
              {/* end::Text */}

              {/* begin::Illustration */}
              <div className="mb-3">
                <img
                  src={toAbsoluteUrl('/assets/images/auth/404-error.png')}
                  className="mw-100 mh-300px theme-light-show"
                  alt=""
                />
                <img
                  src={toAbsoluteUrl('/assets/images/auth/404-error-dark.png')}
                  className="mw-100 mh-300px theme-dark-show"
                  alt=""
                />
              </div>
              {/* end::Illustration */}

              {/* begin::Link */}
              <div className="mb-0">
                <Link href="/dashboard" legacyBehavior>
                  <a className="btn btn-sm btn-primary">Return Home</a>
                </Link>
              </div>
              {/* end::Link */}
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default Error404;

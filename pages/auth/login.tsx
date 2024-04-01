import { useState } from 'react';
import * as Yup from 'yup';
import clsx from 'clsx';
import Link from 'next/link';
import { useFormik } from 'formik';
// import { getUserByToken, login } from '../../components/auth/core/_requests';
import { useAuth } from '../../components/auth';
import { useRouter } from 'next/router';
// import { AKSVG, toAbsoluteUrl } from '../../../helpers';

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Email is required'),
  password: Yup.string().min(8, 'Minimum 8 symbols').max(20, 'Maximum 20 symbols').required('Password is required'),
});

const initialValues = {
  email: 'guest@email.com', // test5@test.com
  password: '123456789', // 1111
  userSite: 'advertiser',
};

/*
  Formik+YUP+Typescript:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
  https://medium.com/@maurice.de.beijer/yup-validation-and-typescript-and-formik-6c342578a20e
*/

export default function Login() {
  const [loading, setLoading] = useState(false);
  const { saveAuth, saveAuthLogin } = useAuth();
  const router = useRouter();

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      setLoading(true);
      // try {
      //   const data = await login(values.email, values.password, values.userSite);
      //   saveAuthLogin(data);
      //   if (router.query.returnUrl && router.query.returnUrl !== '/auth/logout') {
      //     // setTimeout(() => {
      //     //   router.replace(router.query.returnUrl as string);
      //     // }, 1000);
      //     // await router.replace(router.query.returnUrl as string);
      //     await document.location.replace(router.query.returnUrl as string);
      //   } else {
      //     // setTimeout(() => {
      //     //   // router.replace('/businessAccount/all');
      //     //   document.location.replace('/businessAccount/all');
      //     // }, 500);
      //     // await router.replace('/businessAccount/all');
      //     if (location.pathname.includes('/en')) {
      //       await document.location.replace('/en/businessAccount/all');
      //     } else if (location.pathname.includes('/ko')) {
      //       await document.location.replace('/ko/businessAccount/all');
      //     } else {
      //       await document.location.replace('/businessAccount/all');
      //     }
      //     // await document.location.replace('/businessAccount/all');
      //   }
      // } catch (e) {
      //   const error = e as AxiosError<ErrorDto>;
      //   alert(error.response?.data.errorMessage);
      //   saveAuth(undefined);
      //   setStatus('The login details are incorrect');
      //   setSubmitting(false);
      //   setLoading(false);
      // }
      try {
        if (values.email === 'guest@email.com' && values.password === '123456789') {
          saveAuthLogin({
            userId: values.email,
            userName: 'GUEST',
            accessToken: '',
          });
          setTimeout(() => {
            document.location.replace('/dashboard');
          }, 500);
        } else {
          if (values.email !== 'guest@email.com' && values.password !== '123456789') {
            alert('이메일과 비밀번호를 다시 입력해주세요.');
          } else {
            if (values.email !== 'guest@email.com') {
              alert('올바르지 않은 아이디입니다.');
            }
            if (values.password !== '123456789') {
              alert('올바르지 않은 비밀번호입니다.');
            }
          }
          setStatus('The login details are incorrect');
          setSubmitting(false);
          setLoading(false);
        }
      } catch (e) {
        setStatus('The login details are incorrect');
        setSubmitting(false);
        setLoading(false);
      }
    },
  });

  return (
    <>
      {/* <div className="text-align-c m-b-10"> */}
      {/* </div> */}
      {/* <div className="login-widget m-b-0-i"> */}
      <form className="form w-100" onSubmit={formik.handleSubmit} noValidate id="login_signin_form">
        {/* begin::Heading */}
        <div className="text-center mb-11">
          <h1 className="text-dark fw-bolder mb-3">Sign In</h1>
        </div>
        {/* begin::Heading */}

        {/* begin::Form group */}
        <div className="fv-row mb-8">
          <label className="form-label fs-6 fw-bolder text-dark">Email</label>
          <input
            placeholder="이메일을 입력하세요."
            {...formik.getFieldProps('email')}
            className={clsx(
              'form-control bg-transparent',
              { 'is-invalid': formik.touched.email && formik.errors.email },
              {
                'is-valid': formik.touched.email && !formik.errors.email,
              },
            )}
            type="email"
            name="email"
            autoComplete="off"
            maxLength={50}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="fv-plugins-message-container">
              <span role="alert">{formik.errors.email}</span>
            </div>
          )}
        </div>
        {/* end::Form group */}

        {/* begin::Form group */}
        <div className="fv-row mb-3">
          <label className="form-label fw-bolder text-dark fs-6 mb-0">Password</label>
          <input
            placeholder="비밀번호를 입력하세요."
            type="password"
            autoComplete="off"
            {...formik.getFieldProps('password')}
            className={clsx(
              'form-control bg-transparent',
              {
                'is-invalid': formik.touched.password && formik.errors.password,
              },
              {
                'is-valid': formik.touched.password && !formik.errors.password,
              },
            )}
            maxLength={20}
          />
          {formik.touched.password && formik.errors.password && (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">
                <span role="alert">{formik.errors.password}</span>
              </div>
            </div>
          )}
        </div>
        {/* end::Form group */}

        {/* begin::Wrapper */}
        <div className="d-flex flex-stack flex-wrap gap-3 fs-base fw-semibold mb-8">
          {/* begin::Link */}
          {/* end::Link */}
        </div>
        {/* end::Wrapper */}
        <div className="fv-row mb-8">
          <div className="text-center">
            기본으로 입력되어 있는 이메일과 비밀번호만 로그인이 가능합니다.
            {/* <button
            style={{ marginRight: '10px' }}
            type="button"
            className="btn_gm gm_bl"
            onClick={() => {
              const path = router.asPath;
              router.push(path, path, { locale: 'en' });
            }}
          >
            <span className="inner_g">{t('common:en')}</span>
          </button>
          <button
            type="button"
            className="btn_gm gm_bl"
            onClick={() => {
              const path = router.asPath;
              router.push(path, path, { locale: 'ko' });
            }}
          >
            <span className="inner_g">{t('common:ko')}</span>
          </button> */}
            {/* <input
              type="radio"
              name="ko"
              id="ko"
              checked={language === 'ko' ? true : false}
              value={'ko'}
              onChange={(e) => {
                localStorage.setItem('lang', e.target.value);
                const path = router.asPath;
                router.push(path, path, { locale: e.target.value });
              }}
              className="m-r-5"
            />
            <label htmlFor="ko" className="m-r-5" style={{ cursor: 'pointer' }}>
              {t('common:ko')}
            </label>
            <input
              type="radio"
              name="en"
              id="en"
              checked={language === 'en' ? true : false}
              value={'en'}
              onChange={(e) => {
                localStorage.setItem('lang', e.target.value);
                const path = router.asPath;
                router.push(path, path, { locale: e.target.value });
              }}
              className="m-r-5"
            />
            <label htmlFor="en" style={{ cursor: 'pointer' }}>
              {t('common:en')}
            </label> */}
          </div>
        </div>
        {/* begin::Action */}
        <div className="d-grid mb-10">
          <button
            type="submit"
            id="sign_in_submit"
            className="btn btn-primary"
            disabled={formik.isSubmitting || !formik.isValid}
          >
            {!loading && <span className="indicator-label">Continue</span>}
            {loading && (
              <span className="indicator-progress" style={{ display: 'block' }}>
                Please wait...
                <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
              </span>
            )}
          </button>
        </div>
        {/* end::Action */}
      </form>
      {/* </div> */}
    </>
  );
}

/* eslint-disable react/jsx-no-target-blank */
import React, { useEffect, useState } from 'react';
import { SidebarMenuItemWithSub } from './SidebarMenuItemWithSub';
import { SidebarMenuItem } from './SidebarMenuItem';
import { useRouter } from 'next/router';
import { useAuth } from '../../../../../components/auth';
import Swal from 'sweetalert2';

const SidebarMenuMain = () => {
  const { userLogout } = useAuth();
  const router = useRouter();
  const { adaccountId } = router.query;

  // const getAdAccountInfo = async () => {
  //   try {
  //     const response = await api.get<BusinessAdAccountInfoResponse[]>(
  //       `/business/account/${
  //         JSON.parse(
  //           sessionStorage.getItem('myBusinessAccountInfo') ?? JSON.stringify(initBusinessAccountAllSearchResponse),
  //         ).id
  //       }/adaccounts/${
  //         JSON.parse(sessionStorage.getItem('myBusinessAccountInfo') ?? '').memberType === 'MASTER'
  //           ? 'master'
  //           : 'member'
  //       }`,
  //     );
  //     // console.log('getAdAccountInfo', response.data);
  //     let check = false;
  //     await response.data.map((item, idx) => {
  //       if (String(item.id) == adaccountId) {
  //         let newItem = { ...item, id: String(item.id) };
  //         const { memberType, ...otherItem } = newItem;
  //         sessionStorage.setItem('selectedAdAccount', JSON.stringify(otherItem));
  //         check = true;
  //         setSelectedAdAccount(item);
  //       }
  //     });
  //     if (adaccountId !== undefined && check === false) {
  //       const Toast = Swal.mixin({
  //         toast: true,
  //         position: 'bottom-right',
  //         showConfirmButton: false,
  //         timer: 1500,
  //         timerProgressBar: true,
  //         // didOpen: (toast) => {
  //         //   toast.addEventListener('mouseenter', Swal.stopTimer);
  //         //   toast.addEventListener('mouseleave', Swal.resumeTimer);
  //         // },
  //       });
  //       await Toast.fire({
  //         icon: 'warning',
  //         title: `${t('common:sidebarMenu.alert.adAccount')}`,
  //       }).then(async (result) => {
  //         await router.replace('/businessAccount/all');
  //         await sessionStorage.removeItem('myAdAccountInfo');
  //         await sessionStorage.removeItem('selectedAdAccount');
  //       });
  //     }
  //     setAdAccountResponse(response.data);
  //     // UserCheckFnc(adaccountId);
  //   } catch (e) {
  //     ErrorFunc(e);
  //   }
  // };

  // const getAdAccountUserInfo = async () => {
  //   try {
  //     const response = await api.get<AdAccountUserInfoResponse>(`/adaccounts/${adaccountId}/user/${myUserInfo.userNo}`);
  //     // console.log('getAdAccountUserInfo123', response.data);
  //     sessionStorage.setItem('myAdAccountInfo', JSON.stringify(response.data));
  //     setAdAccountUserInfo(response.data);
  //   } catch (e) {
  //     ErrorFunc(e);
  //   }
  // };

  useEffect(() => {
    if (!router.isReady) return;
    // if (router.asPath.startsWith('/businessAccount/all')) {
    //   sessionStorage.removeItem('myAdAccountInfo');
    //   sessionStorage.removeItem('selectedAdAccount');
    // }
    // if (
    //   router.asPath.startsWith('/businessAccount/all') === false &&
    //   router.asPath.startsWith('/myInfo') === false &&
    //   router.asPath.startsWith('/test') === false &&
    //   router.asPath.startsWith('/test2') === false &&
    //   router.asPath.startsWith('/auth/logout') === false
    // ) {
    //   if (sessionStorage.getItem('myBusinessAccountInfo') === null) {
    //     const Toast = Swal.mixin({
    //       toast: true,
    //       position: 'bottom-right',
    //       showConfirmButton: false,
    //       timer: 1500,
    //       timerProgressBar: true,
    //       // didOpen: (toast) => {
    //       //   toast.addEventListener('mouseenter', Swal.stopTimer);
    //       //   toast.addEventListener('mouseleave', Swal.resumeTimer);
    //       // },
    //     });
    //     Toast.fire({
    //       icon: 'warning',
    //       title: `${t('common:sidebarMenu:alert.invalidPath')}`,
    //     }).then((result) => {
    //       router.replace('/auth/logout');
    //     });
    //     // alert('잘못된 접속 경로입니다.');
    //     // router.replace('/auth/logout');
    //     return;
    //   }
    //   // getAdAccountInfo();
    // }
    // if (myUserInfo.userSite !== 'advertiser') {
    //   // console.log('접속 권한이 없습니다.');
    //   userLogout();
    // }
    // if (adaccountId !== undefined) {
    //   getAdAccountUserInfo();
    // }
  }, [router.isReady, router]);

  return (
    <>
      {/* {router.asPath.startsWith('/businessAccount/all') === false &&
        router.asPath.startsWith('/myInfo') === false &&
        router.asPath.startsWith('/test') === false &&
        router.asPath.startsWith('/test2') === false &&
        router.asPath.startsWith('/auth/logout') === false &&
        !(myBusinessAccountInfo.memberType === 'MEMBER' && adaccountId === undefined) && (
          <>
            <SidebarMenuMainInfo
              myBusinessAccountInfo={myBusinessAccountInfo}
              adAccountResponse={adAccountResponse}
              selectedAdAccount={selectedAdAccount}
              setAdAccountResponse={setAdAccountResponse}
            />
            <SidebarMenuItem
              to={adaccountId !== undefined ? `/dashboard/${adaccountId}` : '/dashboard'}
              icon="/assets/icons/duotune/art/art002.svg"
              title={t('common:sidebarMenu.dashboard.depth1')}
              fontIcon="bi-app-indicator"
            />
          </>
        )}
      {adaccountId !== undefined && (
        <>
          {(adAccountUserInfo?.memberType === 'MASTER' || adAccountUserInfo?.memberType === 'OPERATOR') && (
            <SidebarMenuItem
              to={`/ad/${adaccountId}/campaign_group?create=true`}
              icon="/assets/icons/duotune/general/gen019.svg"
              title={t('common:sidebarMenu.createAd.depth1')}
              fontIcon="bi-layers"
            />
          )}
          <SidebarMenuItem
            to={`/${adaccountId}/report/customreport/all`}
            icon="/assets/icons/duotune/general/gen019.svg"
            title={t('common:sidebarMenu.report.depth1')}
            fontIcon="bi-layers"
          />
        </>
      )}
      {myBusinessAccountInfo !== null && myBusinessAccountInfo.memberTypeAccount === '' && (
        <SidebarMenuItemWithSub
          to={`/${adaccountId}/businessAccount/settings/account`}
          icon="/assets/icons/duotune/general/gen025.svg"
          title={t('common:sidebarMenu.businessAccountSetting.depth1')}
          fontIcon="bi-person"
        >
          <SidebarMenuItem
            to={
              adaccountId !== undefined
                ? `/${adaccountId}/businessAccount/settings/account/info`
                : '/businessAccount/settings/account/info'
            }
            title={t('common:sidebarMenu.businessAccountSetting.depth2.account')}
            hasBullet={true}
          />
          <SidebarMenuItem
            to={
              adaccountId !== undefined
                ? `/${adaccountId}/businessAccount/settings/credit`
                : '/businessAccount/settings/credit'
            }
            title={t('common:sidebarMenu.businessAccountSetting.depth2.credit')}
            hasBullet={true}
          />
        </SidebarMenuItemWithSub>
      )}
      {router.asPath.startsWith('/businessAccount/all') === false &&
        router.asPath.startsWith('/myInfo') === false &&
        router.asPath.startsWith('/test') === false &&
        router.asPath.startsWith('/test2') === false &&
        router.asPath.startsWith('/auth/logout') === false &&
        !(myBusinessAccountInfo.memberType === 'MEMBER' && adaccountId === undefined) && (
          <SidebarMenuItem
            to={adaccountId !== undefined ? `/${adaccountId}/adAccount/settings/member` : '/adAccount/settings/member'}
            icon="/assets/icons/duotune/general/gen025.svg"
            title={t('common:sidebarMenu.adAccountSetting.depth1')}
            fontIcon="bi-person"
          />
        )} */}
      {/* <SidebarMenuItemWithSub
        to="/setting"
        title="설정"
        icon="/assets/icons/duotune/general/gen025.svg"
        fontIcon="bi-person"
      >
        <SidebarMenuItem to="#" title="광고계정 관리" hasBullet={true} />
        <SidebarMenuItem to={`/${adaccountId}/settings/cash`} title="광고캐시 관리" hasBullet={true} />
        <SidebarMenuItem to="/accountId/settings/editlog" title="변경이력 관리" hasBullet={true} />
      </SidebarMenuItemWithSub> */}
      <SidebarMenuItem
        to={`/dashboard`}
        icon="/assets/icons/duotune/general/gen019.svg"
        title={'대시보드'}
        fontIcon="bi-layers"
      />
      <SidebarMenuItem to={`/form`} icon="/assets/icons/duotune/general/gen019.svg" title={'폼'} fontIcon="bi-layers" />
      <SidebarMenuItem
        to={`/report`}
        icon="/assets/icons/duotune/general/gen019.svg"
        title={'리포트'}
        fontIcon="bi-layers"
      />
    </>
  );
};

export { SidebarMenuMain };

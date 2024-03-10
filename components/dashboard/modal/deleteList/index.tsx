import { api } from '@api/index';
import { PageDto } from '@api/dto';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react';
import { CreativeResponseDto } from '@api/dto/dashboard/table/creativeDto';
import { ErrorFunc } from '@utils/authFunction';
import Swal from 'sweetalert2';
import { useTranslation } from 'next-i18next';

const DeleteListModal = (props: {
  setDeleteListModalOn: Dispatch<SetStateAction<boolean>>;
  checkItems: { tableType: string; id: string }[];
  getCampaignData: () => Promise<void>;
  getAdGroupData: () => Promise<void>;
  getCreativeData: () => Promise<void>;
  creativeResponseData: PageDto<CreativeResponseDto>;
}) => {
  const { setDeleteListModalOn, checkItems, getCampaignData, getAdGroupData, getCreativeData, creativeResponseData } =
    props;
  const router = useRouter();
  const { table, page, size } = router.query;
  const { t } = useTranslation(['common', 'dashboard', 'description']);
  const tableType =
    table === 'campaign' || table === undefined
      ? 'campaign'
      : table === 'ad_group'
      ? 'ad_group'
      : table === 'creative'
      ? 'creative'
      : '';

  const deleteData = async () => {
    const newCheckItems = checkItems.filter((el) => el.tableType === tableType);
    try {
      for (let i = 0; i < newCheckItems.length; i++) {
        await api.delete(
          `/${
            table == 'campaign' || table == undefined
              ? 'campaigns'
              : table == 'ad_group'
              ? 'adgroups'
              : table == 'creative'
              ? 'creatives'
              : ''
          }/${newCheckItems[i].id}`,
        );
      }
      await setDeleteListModalOn(false);
      if (table == 'campaign' || table == undefined) {
        await getCampaignData();
      } else if (table == 'ad_group') {
        await getAdGroupData();
      } else if (table == 'creative') {
        if (
          creativeResponseData.currentPage > 1 &&
          (creativeResponseData.currentCount === 1 || creativeResponseData.currentCount === newCheckItems.length)
        ) {
          let routerPathStr = '';
          routerPathStr = router.asPath.replace(
            `&page=${page}&size=${size}`,
            `&page=${creativeResponseData.currentPage - 1}&size=${size}`,
          );
          await router.replace(routerPathStr);
        } else {
          await getCreativeData();
        }
      }
      const Toast = Swal.mixin({
        toast: true,
        position: 'bottom-right',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        // didOpen: (toast) => {
        //   toast.addEventListener('mouseenter', Swal.stopTimer);
        //   toast.addEventListener('mouseleave', Swal.resumeTimer);
        // },
      });
      await Toast.fire({
        icon: 'success',
        title: `${
          table == 'campaign' || table == undefined
            ? t('common:campaign')
            : table == 'ad_group'
            ? t('common:adGroup')
            : t('common:creative')
        } ${t('dashboard:alert.modal.deleteListModal')}`,
      });
    } catch (e) {
      ErrorFunc(e);
    }
  };

  return (
    <div className="basic_layer2">
      <strong className="tit_layer">
        {table == 'campaign' || table == undefined
          ? t('dashboard:modal.deleteListModal.title.campaign')
          : table == 'ad_group'
          ? t('dashboard:modal.deleteListModal.title.adGroup')
          : table == 'creative'
          ? t('dashboard:modal.deleteListModal.title.creative')
          : ''}
      </strong>
      <p className="txt_layer">{t('dashboard:modal.deleteListModal.detail')}</p>
      <div className="btn_group">
        <button type="button" className="btn_gm" onClick={() => setDeleteListModalOn(false)}>
          <span className="inner_g">{t('common:cancel')}</span>
        </button>
        <button type="button" className="btn_gm gm_bl m-l-10" onClick={() => deleteData()}>
          <span className="inner_g">{t('common:confirm')}</span>
        </button>
      </div>
    </div>
  );
};

export default DeleteListModal;

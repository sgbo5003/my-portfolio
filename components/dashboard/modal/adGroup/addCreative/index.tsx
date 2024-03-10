import { PageDto } from '@api/dto';
import { api } from '@api/index';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import styles from '../addCreative/AddCreativeModal.module.scss';
import { useFormik } from 'formik';
import { AdGroupSearchResponse } from '@api/dto/dashboard/createModal/creativeDto';
import { AiFillCloseCircle } from 'react-icons/ai';
import InfiniteScroll from 'react-infinite-scroll-component';
import ReactLoading from 'react-loading';
import { ErrorFunc } from '@utils/authFunction';
import { useTranslation } from 'next-i18next';

export interface initialValues {
  adGroupNameInp: string;
  adGroupListRadio: AdGroupSearchResponse;
}

const initialValues: initialValues = {
  adGroupNameInp: '',
  adGroupListRadio: {
    id: 0,
    name: '',
    campaignName: '',
    campaignId: 0,
  },
};

const AddCreativeModal = (props: { setAddCreativeModalOn: Dispatch<SetStateAction<boolean>> }) => {
  const { setAddCreativeModalOn } = props;
  const router = useRouter();
  const { adaccountId } = router.query;
  const [inpFocus, setInpFocus] = useState<boolean>(false);
  const [adGroupList, setAdGroupList] = useState<Array<AdGroupSearchResponse>>([]);
  const [totalListLength, setTotalListLength] = useState<number>(0);
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState<boolean>(false);
  const [submit, setsubmit] = useState<boolean>(false);
  const scrollDivRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation(['common', 'dashboard']);

  const formik = useFormik({
    initialValues,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      // console.log('values', values);
      setsubmit(true);
      setPage(1);
      scrollDivRef.current?.scrollTo(0, 0); // 스크롤 최상단으로 끌어올리기
    },
  });

  const getAdGroupListData = async () => {
    setLoading(true);
    try {
      const response = await api.get<PageDto<AdGroupSearchResponse>>('/adgroups/search/for-save-creative', {
        params: {
          adAccountId: adaccountId,
          page: 1,
          size: 10,
          name: formik.values.adGroupNameInp,
        },
      });
      // console.log('getAdGroupListData', response.data);
      await setAdGroupList(response.data.content);
      await setLoading(false);
      setTotalListLength(response.data.totalCount);
      setHasNext(response.data.hasNext);
    } catch (e) {
      ErrorFunc(e);
    }
  };

  const getFetchListData = async () => {
    try {
      const response = await api.get<PageDto<AdGroupSearchResponse>>('/adgroups/search/for-save-creative', {
        params: {
          adAccountId: adaccountId,
          page: page,
          size: 10,
          name: formik.values.adGroupNameInp,
        },
      });
      // console.log('getFetchAdGroupListData', response.data);
      setAdGroupList(adGroupList.concat(response.data.content));
      setTotalListLength(response.data.totalCount);
      setHasNext(response.data.hasNext);
    } catch (e) {
      ErrorFunc(e);
    }
  };

  useEffect(() => {
    if (page == 1 && submit == false) {
      getAdGroupListData();
    } else if (page == 1 && submit == true) {
      getAdGroupListData();
      setsubmit(false);
    } else {
      getFetchListData();
    }
  }, [page, submit]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className={styles.layer_body}>
        <div className={styles.pop_adgroup}>
          <strong className={styles.tit_copy + ' m-t-0-i'}>{t('dashboard:modal.createCreative.input.title')}</strong>
          <p className={styles.txt_copy}>{t('dashboard:modal.createCreative.input.subTitle')}</p>

          <span
            className={
              styles.box_inptxt +
              ' box_inptxt search_inp2' +
              (inpFocus ? ' on' : '') +
              (formik.values.adGroupNameInp !== '' ? ' on_inp' : '')
            }
          >
            <span className="inner_inp">
              <label htmlFor="input|create|query" className="lab_txt">
                {formik.values.adGroupNameInp == '' && <>{t('dashboard:placeholder.modal.createCreative')}</>}
              </label>
              <input
                type="text"
                className="inp_txt"
                id="input|create|query"
                name="adGroupNameInp"
                value={formik.values.adGroupNameInp}
                onChange={formik.handleChange}
                onFocus={() => setInpFocus(true)}
                onBlur={() => setInpFocus(false)}
              />
            </span>
            <button
              type="button"
              className={styles.button + ' btn_del'}
              onClick={() => {
                formik.setValues({ ...formik.values, adGroupNameInp: '' });
                getAdGroupListData();
              }}
            >
              <span className="ico_comm">
                <AiFillCloseCircle size={16} color={'rgb(171 168 168)'} />
              </span>
            </button>
            <button type="submit" className={styles.button + ' button btn_search'}>
              <span className="ico_comm ico_search">
                <BiSearch />
              </span>
            </button>
          </span>
          <strong className={styles.tit_copy}>
            {t('dashboard:modal.createCreative.radio.title')}
            <span className={styles.txt_num}>{totalListLength}</span>
          </strong>
          <div
            className={styles.item_select + ' ' + (adGroupList.length == 0 ? styles.no_data : '')}
            id="scrollableDiv"
            ref={scrollDivRef}
          >
            {loading ? (
              <ReactLoading type={'bubbles'} color={'#326edc'} height={70} width={70} className="m-0-auto" />
            ) : adGroupList.length == 0 ? (
              <p className={styles.txt_nodata}>{t('common:noSearchData')}</p>
            ) : (
              <InfiniteScroll
                dataLength={adGroupList.length}
                next={() => {
                  setPage((p) => p + 1);
                }}
                hasMore={hasNext}
                scrollableTarget="scrollableDiv"
                loader={<ReactLoading type={'bubbles'} color={'#326edc'} height={70} width={70} className="m-0-auto" />}
              >
                <ul className={styles.list_item}>
                  {adGroupList.map((adGroupListItem, idx) => (
                    <li key={idx}>
                      <span className={styles.box_radioinp + ' box_radioinp'}>
                        <span className={styles.inner_inp}>
                          <input
                            type="radio"
                            name="adGroupListRadio"
                            id={`${adGroupListItem.id}`}
                            onChange={(e) => {
                              formik.handleChange(e);
                              formik.setValues({ ...formik.values, adGroupListRadio: adGroupListItem });
                            }}
                            className={styles.inp_radio}
                          />
                          <label htmlFor={`${adGroupListItem.id}`} className={styles.lab_radio + ' lab_radio'}>
                            <span
                              className={styles.tit_list}
                            >{`${adGroupListItem.campaignName}, ${adGroupListItem.campaignId}`}</span>
                            <span className={styles.sub_list}>{adGroupListItem.name}</span>
                          </label>
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </InfiniteScroll>
            )}
          </div>
        </div>
      </div>
      <div className={styles.layer_foot}>
        <div className={styles.btn_group}>
          <button type="button" className="btn_gm" onClick={() => setAddCreativeModalOn(false)}>
            <span className="inner_g">{t('common:cancel')}</span>
          </button>
          <button
            type="button"
            className={`btn_gm gm_bl ${formik.values.adGroupListRadio.name == '' ? 'in_active' : ''} m-l-10`}
            onClick={() =>
              router.push(
                // eslint-disable-next-line max-len
                `/ad/${adaccountId}/creative?campaignId=${formik.values.adGroupListRadio.campaignId}&adGroupId=${formik.values.adGroupListRadio.id}`,
              )
            }
          >
            <span className="inner_g">{t('common:confirm')}</span>
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddCreativeModal;

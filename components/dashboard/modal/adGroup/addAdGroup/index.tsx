import { PageDto } from '@api/dto';
import { CampaignSearchResponse } from '@api/dto/dashboard/createModal/adGroupDto';
import { api } from '@api/index';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import styles from '../addAdGroup/AddAdGroupModal.module.scss';
import * as adFnc from 'utils/adFunction';
import { useFormik } from 'formik';
import { AiFillCloseCircle } from 'react-icons/ai';
import InfiniteScroll from 'react-infinite-scroll-component';
import ReactLoading from 'react-loading';
import { ErrorFunc } from '@utils/authFunction';
import { useTranslation } from 'next-i18next';

export interface initialValues {
  campaignNameInp: string;
  campaignListRadio: CampaignSearchResponse;
}

const initialValues: initialValues = {
  campaignNameInp: '',
  campaignListRadio: {
    id: 0,
    name: '',
    adTypeAndGoal: { adGoalName: '', adTypeName: '' },
    createdAt: '',
    updatedAt: '',
  },
};

const AddAdGroupModal = (props: { setAddAdGroupModalOn: Dispatch<SetStateAction<boolean>> }) => {
  const { setAddAdGroupModalOn } = props;
  const router = useRouter();
  const { adaccountId } = router.query;
  const [inpFocus, setInpFocus] = useState<boolean>(false);
  const [campaignList, setCampaignList] = useState<Array<CampaignSearchResponse>>([]);
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

  const getCampaignListData = async () => {
    setLoading(true);
    try {
      const response = await api.get<PageDto<CampaignSearchResponse>>('/campaigns/search/for-save-adgroup', {
        params: {
          adAccountId: adaccountId,
          page: 1,
          size: 10,
          name: formik.values.campaignNameInp,
        },
      });
      // console.log('getCampaignListData', response.data);
      await setCampaignList(response.data.content);
      await setLoading(false);
      setTotalListLength(response.data.totalCount);
      setHasNext(response.data.hasNext);
    } catch (e) {
      ErrorFunc(e);
    }
  };

  const getFetchListData = async () => {
    try {
      const response = await api.get<PageDto<CampaignSearchResponse>>('/campaigns/search/for-save-adgroup', {
        params: {
          adAccountId: adaccountId,
          page: page,
          size: 10,
          name: formik.values.campaignNameInp,
        },
      });
      // console.log('getFetchAdGroupListData', response.data);
      setCampaignList(campaignList.concat(response.data.content));
      setTotalListLength(response.data.totalCount);
      setHasNext(response.data.hasNext);
    } catch (e) {
      ErrorFunc(e);
    }
  };

  useEffect(() => {
    if (page == 1 && submit == false) {
      getCampaignListData();
    } else if (page == 1 && submit == true) {
      getCampaignListData();
      setsubmit(false);
    } else {
      getFetchListData();
    }
  }, [page, submit]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className={styles.layer_body}>
        <div className={styles.pop_adgroup}>
          <strong className={styles.tit_copy + ' m-t-0-i'}>{t('dashboard:modal.createAdGroup.input.title')}</strong>
          <p className={styles.txt_copy}>{t('dashboard:modal.createAdGroup.input.subTitle')}</p>

          <span
            className={
              styles.box_inptxt +
              ' box_inptxt search_inp2' +
              (inpFocus ? ' on' : '') +
              (formik.values.campaignNameInp !== '' ? ' on_inp' : '')
            }
          >
            <span className="inner_inp">
              <label htmlFor="input|create|query" className="lab_txt">
                {formik.values.campaignNameInp == '' && <>{t('dashboard:placeholder.modal.createAdGroup')}</>}
              </label>
              <input
                type="text"
                className="inp_txt"
                id="input|create|query"
                name="campaignNameInp"
                value={formik.values.campaignNameInp}
                onChange={formik.handleChange}
                onFocus={() => setInpFocus(true)}
                onBlur={() => setInpFocus(false)}
              />
            </span>
            <button
              type="button"
              className={styles.button + ' btn_del'}
              onClick={() => {
                formik.setValues({ ...formik.values, campaignNameInp: '' });
                getCampaignListData();
              }}
            >
              <span className="ico_comm">
                <AiFillCloseCircle size={16} color={'rgb(171 168 168)'} />
              </span>
            </button>
            <button type="submit" className={styles.button + ' button btn_search'}>
              <span className="ico_comm ico_search">
                <BiSearch size={16} />
              </span>
            </button>
          </span>
          <strong className={styles.tit_copy}>
            {t('dashboard:modal.createAdGroup.radio.title')}
            <span className={styles.txt_num}>{totalListLength}</span>
          </strong>
          <div
            className={styles.item_select + ' ' + (campaignList.length == 0 ? styles.no_data : '')}
            id="scrollableDiv"
            ref={scrollDivRef}
          >
            {loading ? (
              <ReactLoading type={'bubbles'} color={'#326edc'} height={70} width={70} className="m-0-auto" />
            ) : campaignList.length == 0 ? (
              <p className={styles.txt_nodata}>{t('common:noSearchData')}</p>
            ) : (
              <InfiniteScroll
                dataLength={campaignList.length}
                next={() => {
                  setPage((p) => p + 1);
                }}
                hasMore={hasNext}
                scrollableTarget="scrollableDiv"
                loader={<ReactLoading type={'bubbles'} color={'#326edc'} height={70} width={70} className="m-0-auto" />}
              >
                <ul className={styles.list_item}>
                  {campaignList.map((campaignListItem, idx) => {
                    let adTypeAndGoalArr: string[] = [];
                    adTypeAndGoalArr = adFnc.adTypeAndGoalFnc(
                      campaignListItem.adTypeAndGoal.adTypeName,
                      campaignListItem.adTypeAndGoal.adGoalName,
                    );
                    return (
                      <li key={idx}>
                        <span className={styles.box_radioinp + ' box_radioinp'}>
                          <span className={styles.inner_inp}>
                            <input
                              type="radio"
                              name="campaignListRadio"
                              id={`${campaignListItem.id}`}
                              onChange={(e) => {
                                formik.handleChange(e);
                                formik.setValues({ ...formik.values, campaignListRadio: campaignListItem });
                              }}
                              className={styles.inp_radio}
                            />
                            <label htmlFor={`${campaignListItem.id}`} className={styles.lab_radio + ' lab_radio'}>
                              {/* <span
                                className={styles.tit_list}
                              >{`${adTypeAndGoalArr[0]}x${adTypeAndGoalArr[1]}, ${campaignListItem.id}`}</span> */}
                              <span
                                className={styles.tit_list}
                                // >{`${adTypeAndGoalArr[0]}, ${campaignListItem.id}`}</span>
                              >{`${
                                adTypeAndGoalArr[0] === '디스플레이'
                                  ? t('common:adType.display')
                                  : adTypeAndGoalArr[0] === '동영상'
                                  ? t('common:adType.video')
                                  : ''
                              }, ${campaignListItem.id}`}</span>
                              <span className={styles.sub_list}>{campaignListItem.name}</span>
                            </label>
                          </span>
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </InfiniteScroll>
            )}
          </div>
        </div>
      </div>
      <div className={styles.layer_foot}>
        <div className={styles.btn_group}>
          <button type="button" className="btn_gm" onClick={() => setAddAdGroupModalOn(false)}>
            <span className="inner_g">{t('common:cancel')}</span>
          </button>
          <button
            type="button"
            className={`btn_gm gm_bl ${formik.values.campaignListRadio.name == '' ? 'in_active' : ''} m-l-10`}
            onClick={() =>
              router.push(
                `/ad/${adaccountId}/campaign_group?campaignId=${formik.values.campaignListRadio.id}&create=true`,
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

export default AddAdGroupModal;

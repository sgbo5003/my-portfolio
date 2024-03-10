import styles from '../copyList/CopyListModal.module.scss';
import { api } from '@api/index';
import { ErrorDto, PageDto } from '@api/dto';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { BiHelpCircle } from 'react-icons/bi';
import { useFormik } from 'formik';
import { CampaignSearchResponse } from '@api/dto/dashboard/createModal/adGroupDto';
import * as adFnc from '@utils/adFunction';
import * as fnc from '@utils/commonFunction';
import { AiOutlineCalendar } from 'react-icons/ai';
import { Calendar } from 'react-date-range';
import { AdGroupCopyRequest } from '@api/dto/adGroup/copy/adGroupCopyDto';
import { ErrorFunc } from '@utils/authFunction';
import { addDays } from 'date-fns';

interface CopyFormValues {
  campaignOption: string; // 기존 캠페인(OWN) | 신규 캠페인(NEW)
  campaignId: string; // 기존 캠페인 선택 (campaignId)
  campaignName: string; // 신규 캠페인 > input box value
  scheduleCheck: string[]; // 추가 설정 > 집행 기간 설정 (checkValue: ['on'] | [])
  onlyAdGroupCheck: string[]; // 추가 설정 > 광고 그룹만 복사 (checkValue: ['on'] | [])
  adGroupStartDate: string; // 추가 설정 > 집행기간 > 일자 > 시작일
  adGroupEndDate: string | null; // 추가 설정 > 집행기간 > 일자 > 종료일
  // adGroupDateSettingCheck: boolean; // 추가 설정 > 집행기간 > 일자 > 미설정 checkbox
}

const campaignOptionItems: { label: string; value: string }[] = [
  { label: '기존 캠페인', value: 'OWN' },
  // { label: '신규 캠페인', value: 'NEW' },
];

const subSettingItems: { label: string; value: string[]; htmlFor: string; formikName: string }[] = [
  { label: '집행 기간 설정', value: [], htmlFor: 'checkBox|schedule', formikName: 'scheduleCheck' },
  { label: '광고 그룹만 복사', value: [], htmlFor: 'checkBox|onlyAdGroup', formikName: 'onlyAdGroupCheck' },
];

const CopyListModal = (props: {
  setCopyListModalOn: Dispatch<SetStateAction<boolean>>;
  adGroupData: { nodes: any[] };
  adGroupCheckItemId: string;
  getAdGroupData: () => Promise<void>;
}) => {
  const { setCopyListModalOn, adGroupData, adGroupCheckItemId, getAdGroupData } = props;
  const router = useRouter();
  const { adaccountId } = router.query;
  const [adGroupAdTypeName, setAdGroupAdTypeName] = useState<string>('');
  const [adGroupAdGoalName, setAdGroupAdGoalName] = useState<string>('');
  const [showCampaignSelect, setShowCampaignSelect] = useState<boolean>(false);
  const [campaignList, setCampaignList] = useState<Array<CampaignSearchResponse>>([]);
  const [campaignNameInpFocus, setCampaignNameInpFocus] = useState<boolean>(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(
    new Date(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate() - 1),
  );
  const [showStartCalendar, setShowStartCalendar] = useState<boolean>(false);
  const [showEndCalendar, setShowEndCalendar] = useState<boolean>(false);
  const optSelectCampaignDivRef = useRef<HTMLDivElement>(null);
  const startCalendarInputDivRef = useRef<HTMLDivElement>(null);
  const endCalendarInputDivRef = useRef<HTMLDivElement>(null);

  const initialValues: CopyFormValues = {
    campaignOption: 'OWN',
    campaignId: '',
    campaignName: `${adFnc.adTypeAndGoalFnc(adGroupAdTypeName, adGroupAdGoalName)[0]}_${
      adFnc.adTypeAndGoalFnc(adGroupAdTypeName, adGroupAdGoalName)[1]
    }_${fnc.dateAsYYYYMMDD(new Date()).replace(/-/gi, '')}`,
    scheduleCheck: [],
    onlyAdGroupCheck: [],
    adGroupStartDate: fnc.dateAsYYYYMMDD(new Date()).replace(/-/gi, ''),
    adGroupEndDate: null,
    // adGroupDateSettingCheck: true,
  };

  const formik = useFormik({
    initialValues,
    // validationSchema: signupSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      // console.log('values', values);
      const copyRequestObj: AdGroupCopyRequest = {
        campaignId: Number(values.campaignId),
        adGroupId: Number(adGroupCheckItemId),
        onlyAdGroup: values.onlyAdGroupCheck[0] === 'on' ? true : false,
        changeStartEndDate: values.scheduleCheck[0] === 'on' ? true : false,
        startDate: Number(values.adGroupStartDate),
        endDate: values.adGroupEndDate === null ? null : Number(values.adGroupEndDate),
      };
      // console.log('copyRequestObj', copyRequestObj);
      try {
        setSubmitting(true);
        await api.post<AdGroupCopyRequest>('/adgroups/copy', copyRequestObj);
        await setCopyListModalOn(false);
        await getAdGroupData();
      } catch (e) {
        const error = e as AxiosError<ErrorDto>;
        setStatus(error.response?.data.errorMessage);
        alert(error.response?.data.errorMessage);
        setSubmitting(false);
      }
    },
  });

  const getCampaignListData = async (adTypeName: string, adGoalName: string) => {
    try {
      const response = await api.get<PageDto<CampaignSearchResponse>>('/campaigns/search/for-save-adgroup', {
        params: {
          adAccountId: adaccountId,
          page: 1,
          size: 10,
          adTypeName: adTypeName,
          adGoalName: adGoalName,
        },
      });
      // console.log('getCampaignListData', response.data);
      setCampaignList(response.data.content);
    } catch (e) {
      ErrorFunc(e);
    }
  };

  const onCalendarInputClick = (type: string) => {
    if (type == 'startDate') {
      setShowEndCalendar(false);
      setShowStartCalendar(true);
    } else {
      setShowStartCalendar(false);
      setShowEndCalendar(true);
    }
  };

  const onCalendarChange = (date: any, type: string) => {
    // console.log('date', date);
    if (type == 'startDate') {
      setStartDate(date);
      formik.setValues({ ...formik.values, adGroupStartDate: fnc.dateAsYYYYMMDD(date).replace(/-/gi, '') });
    } else {
      setEndDate(date);
      formik.setValues({ ...formik.values, adGroupEndDate: fnc.dateAsYYYYMMDD(date).replace(/-/gi, '') });
    }
  };

  const handleClickOutSide = (e: any) => {
    if (optSelectCampaignDivRef && !optSelectCampaignDivRef.current?.contains(e.target)) {
      setShowCampaignSelect(false);
    }
    if (startCalendarInputDivRef && !startCalendarInputDivRef.current?.contains(e.target)) {
      setShowStartCalendar(false);
    }
    if (endCalendarInputDivRef && !endCalendarInputDivRef.current?.contains(e.target)) {
      setShowEndCalendar(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutSide);
    return () => {
      document.removeEventListener('mousedown', handleClickOutSide);
    };
  });

  useEffect(() => {
    adGroupData.nodes.map((item) => {
      if (item.id === Number(adGroupCheckItemId)) {
        getCampaignListData(item.adTypeName, item.adGoalName);
        setAdGroupAdGoalName(item.adGoalName);
        setAdGroupAdTypeName(item.adTypeName);
      }
    });
  }, []);

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="layer_body">
        <div className={styles.dashcopy_wrap}>
          <strong className={styles.tit_copy}>캠페인 선택</strong>
          <p className={styles.txt_copy + ' ' + styles.txt_small}>
            선택한 캠페인 하위로 광고그룹의 모든 정보(타겟 등)가 복사 되며, 하위 소재 중 등록 가능한 소재들을 일괄
            복사합니다. 단, 일 예산, 입찰금액, 기간은 변경될 수 있습니다.
          </p>
          <div className={styles.reform_area_radiocheck}>
            <ul className={styles.reform_list_radiocheck + ' ' + styles.reform_list_float}>
              {campaignOptionItems.map((campaignOptionItem, idx) => (
                <li key={idx}>
                  <span className="box_radioinp">
                    <input
                      type="radio"
                      name="campaignOption"
                      id={campaignOptionItem.value}
                      value={campaignOptionItem.value}
                      checked={formik.values.campaignOption === campaignOptionItem.value ? true : false}
                      onChange={(e) => {
                        if (e.target.value === 'OWN') {
                          formik.setValues({ ...formik.values, campaignOption: e.target.value });
                          adGroupData.nodes.map((item) => {
                            if (item.id === Number(adGroupCheckItemId)) {
                              getCampaignListData(item.adTypeName, item.adGoalName);
                            }
                          });
                        } else {
                          formik.setValues({
                            ...formik.values,
                            campaignOption: e.target.value,
                            campaignName: `${adFnc.adTypeAndGoalFnc(adGroupAdTypeName, adGroupAdGoalName)[0]}_${
                              adFnc.adTypeAndGoalFnc(adGroupAdTypeName, adGroupAdGoalName)[1]
                            }_${fnc.dateAsYYYYMMDD(new Date()).replace(/-/gi, '')}`,
                          });
                        }
                      }}
                    />
                    <label htmlFor={campaignOptionItem.value} className="lab_radio">
                      {campaignOptionItem.label}
                    </label>
                  </span>
                </li>
              ))}
            </ul>
            {formik.values.campaignOption === 'OWN' ? (
              <div
                className={styles.opt_select + ` opt_select ${showCampaignSelect ? 'opt_open' : ''}`}
                ref={optSelectCampaignDivRef}
              >
                <a className="link_selected" onClick={() => setShowCampaignSelect(!showCampaignSelect)}>
                  {formik.values.campaignId === '' ? (
                    <>캠페인 선택</>
                  ) : (
                    campaignList.map((campaignListItem) => {
                      if (campaignListItem.id === Number(formik.values.campaignId)) {
                        return `${campaignListItem.name} (${campaignListItem.id})`;
                      }
                    })
                  )}
                </a>
                <span className="ico_arr"></span>
                <div className="opt_list">
                  <ul className={styles.list_opt + ' list_opt'}>
                    <li
                      key={0}
                      className={`${formik.values.campaignId === '' ? 'on' : ''}`}
                      onClick={() => {
                        formik.setValues({ ...formik.values, campaignId: '' });
                        setShowCampaignSelect(false);
                      }}
                    >
                      <a className={styles.link_option + ' link_option in_active'}>캠페인 선택</a>
                    </li>
                    {campaignList.map((campaignListItem) => (
                      <li
                        key={campaignListItem.id}
                        onClick={() => {
                          formik.setValues({ ...formik.values, campaignId: String(campaignListItem.id) });
                          setShowCampaignSelect(false);
                        }}
                        className={`${Number(formik.values.campaignId) === campaignListItem.id ? 'on' : ''}`}
                      >
                        <a
                          className={styles.link_option + ' link_option in_active'}
                        >{`${campaignListItem.name} (${campaignListItem.id})`}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <span className={styles.box_inptxt + ` box_inptxt ${campaignNameInpFocus ? 'on' : ''}`}>
                <span className="num_byte">{50 - formik.values.campaignName.length}</span>
                <span className="inner_inp">
                  <label htmlFor="input|campaignName" className="lab_txt">
                    {!campaignNameInpFocus && formik.values.campaignName === '' && <>캠페인 이름을 입력하세요.</>}
                  </label>
                  <input
                    type="text"
                    className="inp_txt"
                    id="input|campaignName"
                    {...formik.getFieldProps('campaignName')}
                    maxLength={50}
                    autoComplete="on"
                    onFocus={() => setCampaignNameInpFocus(true)}
                    onBlur={() => setCampaignNameInpFocus(false)}
                  />
                </span>
              </span>
            )}
            <p className={styles.txt_copy + ' ' + styles.txt_small}>
              선택한 광고그룹 상위 {adFnc.adTypeAndGoalFnc(adGroupAdTypeName, adGroupAdGoalName)[0]}×
              {adFnc.adTypeAndGoalFnc(adGroupAdTypeName, adGroupAdGoalName)[1]} 캠페인과 동일한 조건의 캠페인만 선택
              가능합니다.
            </p>
          </div>
          <strong className={styles.tit_copy}>추가 설정</strong>
          <ul className={styles.reform_list_radiocheck}>
            {subSettingItems.map((subSettingItem, idx) => (
              <li key={idx}>
                <span className="box_checkinp">
                  <input
                    type="checkbox"
                    name={subSettingItem.formikName}
                    id={subSettingItem.htmlFor}
                    className="inp_check"
                    checked={
                      subSettingItem.formikName === 'scheduleCheck'
                        ? formik.values.scheduleCheck[0] === 'on'
                          ? true
                          : false
                        : subSettingItem.formikName === 'onlyAdGroupCheck'
                        ? formik.values.onlyAdGroupCheck[0] === 'on'
                          ? true
                          : false
                        : undefined
                    }
                    onChange={formik.handleChange}
                  />
                  <label htmlFor={subSettingItem.htmlFor} className="lab_check">
                    {subSettingItem.label}
                    <span>
                      <a className={styles.link_help + ' link_g'}>
                        <BiHelpCircle size={15} color="rgb(218 218 218)" />
                      </a>
                    </span>
                  </label>
                </span>
                {subSettingItem.formikName === 'scheduleCheck' && formik.values.scheduleCheck[0] === 'on' && (
                  <div className={styles.reform_calendar_adgroup}>
                    <div className="btn_gm gm_calendar" ref={startCalendarInputDivRef}>
                      <a className="link_calendar" onClick={() => onCalendarInputClick('startDate')}>
                        {fnc.dateAsYYYYMMDD(startDate)}
                        <span className="ico_comm">
                          <AiOutlineCalendar size={18} />
                        </span>
                      </a>
                      {showStartCalendar && (
                        <div className="calendar_wrap_left">
                          <Calendar
                            date={startDate}
                            onChange={(date) => onCalendarChange(date, 'startDate')}
                            minDate={addDays(new Date(), 1)}
                          />
                        </div>
                      )}
                    </div>
                    {' ~ '}
                    <div className={`btn_gm gm_calendar`} ref={endCalendarInputDivRef}>
                      <a className={`link_calendar`} onClick={() => onCalendarInputClick('endDate')}>
                        {fnc.dateAsYYYYMMDD(endDate)}
                        <span className="ico_comm">
                          <AiOutlineCalendar size={18} />
                        </span>
                      </a>
                      {showEndCalendar && (
                        <div className="calendar_wrap_right">
                          <Calendar
                            date={endDate}
                            onChange={(date) => onCalendarChange(date, 'endDate')}
                            minDate={addDays(new Date(), 1)}
                          />
                        </div>
                      )}
                    </div>
                    {/* <span className="box_checkinp">
                      <input
                        type="checkbox"
                        name="adGroupDateSettingCheck"
                        id="adGroupDateSettingCheck"
                        className="inp_check"
                        checked={formik.values.adGroupDateSettingCheck}
                        onChange={(e) => {
                          if (e.target.checked === true) {
                            formik.setValues({
                              ...formik.values,
                              adGroupEndDate: null,
                              adGroupDateSettingCheck: e.target.checked,
                            });
                          } else {
                            formik.setValues({
                              ...formik.values,
                              adGroupEndDate: fnc
                                .dateAsYYYYMMDD(
                                  new Date(
                                    new Date().getFullYear(),
                                    new Date().getMonth() + 1,
                                    new Date().getDate() - 1,
                                  ),
                                )
                                .replace(/-/gi, ''),
                              adGroupDateSettingCheck: e.target.checked,
                            });
                            setEndDate(
                              new Date(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate() - 1),
                            );
                          }
                        }}
                      />
                      <label htmlFor="adGroupDateSettingCheck" className="lab_check">
                        종료일 미설정
                      </label>
                    </span> */}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles.layer_foot}>
        <div className={styles.btn_group}>
          <button type="button" className="btn_gm" onClick={() => setCopyListModalOn(false)}>
            <span className="inner_g">취소</span>
          </button>
          <button type="submit" className={`btn_gm gm_bl ${formik.values.campaignId === '' ? 'in_active' : ''} m-l-10`}>
            <span className="inner_g">확인</span>
          </button>
        </div>
      </div>
    </form>
  );
};

export default CopyListModal;

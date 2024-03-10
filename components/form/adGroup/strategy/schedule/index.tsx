// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import styles from '../schedule/Schedule.module.scss';
import * as fnc from '../../../../../utils/commonFunction';
import { AiOutlineCalendar } from 'react-icons/ai';
import { Calendar } from 'react-date-range';
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from 'react-icons/md';
import TableDragSelect from '../../../../../components/tableDragSelect';
import { FormikErrors } from 'formik';
import { lateNightCellsItems, newCellsItems } from './items/ScheduleItems';
import { addDays } from 'date-fns';
import { useRouter } from 'next/router';

const Schedule = (props: {
  adGroupIdx: number;
  myForm: MyFormValues;
  handleChange: (e: React.ChangeEvent<any>) => void;
  setValues: (values: React.SetStateAction<MyFormValues>) => void;
  errors: FormikErrors<MyFormValues>;
  scheduleDisplayFlag: boolean;
  setScheduleDisplayFlag: Dispatch<SetStateAction<boolean>>;
  startDate: Date;
  setStartDate: Dispatch<SetStateAction<Date>>;
  endDate: Date;
  setEndDate: Dispatch<SetStateAction<Date>>;
}) => {
  const {
    adGroupIdx,
    myForm,
    handleChange,
    setValues,
    errors,
    scheduleDisplayFlag,
    setScheduleDisplayFlag,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
  } = props;
  const router = useRouter();
  const { campaignId, adGroupId } = router.query;
  const [showStartCalendar, setShowStartCalendar] = useState<boolean>(false);
  const [showEndCalendar, setShowEndCalendar] = useState<boolean>(false);
  // 캘린더 관련 ref
  const startCalendarInputDivRef = useRef<HTMLDivElement>(null);
  const endCalendarInputDivRef = useRef<HTMLDivElement>(null);
  // 광고그룹 > 집행기간 > 시간 제한 소재 설정 > display 관련
  const [nightTargetDisplayFlag, setNightTargetDisplayFlag] = useState<boolean>(false);

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
      setValues({
        campaign: { ...myForm.campaign },
        adGroup: myForm.adGroup.map((item, idx) =>
          idx == adGroupIdx ? { ...item, adGroupStartDate: fnc.dateAsYYYYMMDD(date).replace(/-/gi, '') } : item,
        ),
      });
    } else {
      setEndDate(date);
      setValues({
        campaign: { ...myForm.campaign },
        adGroup: myForm.adGroup.map((item, idx) =>
          idx == adGroupIdx ? { ...item, adGroupEndDate: fnc.dateAsYYYYMMDD(date).replace(/-/gi, '') } : item,
        ),
      });
    }
  };

  const handleClickOutSide = (e: any) => {
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

  return (
    <div
      className={
        styles.reform_area_card +
        ' ' +
        (errors.adGroup?.[adGroupIdx]
          ? (errors.adGroup[adGroupIdx] as unknown as adGroupFormValues).adGroupStartDate && styles.making_error
          : '')
      }
    >
      <h4 className={styles.reform_subtit_card}>집행기간</h4>
      <div className={styles.reform_con_card}>
        <div className={styles.reform_tit_card}>
          {errors.adGroup?.[adGroupIdx]
            ? (errors.adGroup[adGroupIdx] as unknown as adGroupFormValues).adGroupStartDate && (
                <span className={styles.reform_txt_error}>{errors.adGroup[adGroupIdx].adGroupStartDate}</span>
              )
            : ''}
        </div>
        <div className={styles.reform_tit_card}>
          <strong className={styles.reform_tit_detail}>일자</strong>
        </div>
        <div className={styles.reform_item_card + ' m-t-0-i'} ref={startCalendarInputDivRef}>
          <div
            className={`btn_gm ${
              campaignId !== undefined &&
              adGroupId !== undefined &&
              (adGroupUpdateDetailResponse?.status === 'FINISHED' ||
                adGroupUpdateDetailResponse?.status === 'ADMIN_STOP')
                ? 'in_active'
                : ''
            } gm_calendar`}
            ref={startCalendarInputDivRef}
          >
            <a
              className={`link_calendar ${
                campaignId !== undefined &&
                adGroupId !== undefined &&
                (adGroupUpdateDetailResponse?.status === 'FINISHED' ||
                  adGroupUpdateDetailResponse?.status === 'ADMIN_STOP')
                  ? 'bg-f5f5f5'
                  : ''
              }`}
              onClick={() => onCalendarInputClick('startDate')}
            >
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
          <div
            className={`btn_gm gm_calendar ${
              myForm.adGroup[adGroupIdx].adGroupDateSettingCheck == true ||
              (campaignId !== undefined &&
                adGroupId !== undefined &&
                (adGroupUpdateDetailResponse?.status === 'FINISHED' ||
                  adGroupUpdateDetailResponse?.status === 'ADMIN_STOP'))
                ? 'in_active'
                : ''
            }`}
            ref={endCalendarInputDivRef}
          >
            <a
              className={`link_calendar ${
                myForm.adGroup[adGroupIdx].adGroupDateSettingCheck == true ||
                (campaignId !== undefined &&
                  adGroupId !== undefined &&
                  (adGroupUpdateDetailResponse?.status === 'FINISHED' ||
                    adGroupUpdateDetailResponse?.status === 'ADMIN_STOP'))
                  ? 'bg-f5f5f5'
                  : ''
              }`}
              onClick={() => onCalendarInputClick('endDate')}
            >
              {myForm.adGroup[adGroupIdx].adGroupDateSettingCheck == true ? '종료일 없음' : fnc.dateAsYYYYMMDD(endDate)}
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
          {/* <span className={styles.box_checkinp}>
            <input
              type="checkbox"
              name={`adGroup[${adGroupIdx}].adGroupDateSettingCheck`}
              id={`adGroupDateSettingCheck_${adGroupIdx}`}
              className={styles.inp_check}
              checked={myForm.adGroup[adGroupIdx].adGroupDateSettingCheck}
              onChange={(e) => {
                handleChange(e);
                if (e.target.checked == true) {
                  setValues({
                    campaign: { ...myForm.campaign },
                    adGroup: myForm.adGroup.map((item, idx) =>
                      idx == adGroupIdx
                        ? { ...item, adGroupEndDate: null, adGroupDateSettingCheck: e.target.checked }
                        : item,
                    ),
                  });
                } else {
                  setValues({
                    campaign: { ...myForm.campaign },
                    adGroup: myForm.adGroup.map((item, idx) =>
                      idx == adGroupIdx
                        ? {
                            ...item,
                            adGroupEndDate: fnc
                              .dateAsYYYYMMDD(
                                new Date(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate() - 1),
                              )
                              .replace(/-/gi, ''),
                            adGroupDateSettingCheck: e.target.checked,
                          }
                        : item,
                    ),
                  });
                  setEndDate(new Date(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate() - 1));
                }
              }}
            />
            <label htmlFor={`adGroupDateSettingCheck_${adGroupIdx}`} className={styles.lab_check}>
              종료일 미설정
            </label>
          </span> */}
        </div>
        <div className={styles.reform_tit_card}>
          <strong className={styles.reform_tit_detail}>요일/시간</strong>
        </div>
        <div className={styles.reform_item_card + ' m-t-0-i'}>
          <ul className={styles.reform_list_radiocheck}>
            <li>
              <span className="box_radioinp">
                <input
                  type="radio"
                  name={`adGroup[${adGroupIdx}].hasDetailTime`}
                  id={`scheduleDetailOption1_${adGroupIdx}`}
                  // className="inp_radio"
                  value="N"
                  checked={myForm.adGroup[adGroupIdx].hasDetailTime == 'N' ? true : false}
                  onChange={(e) => {
                    handleChange(e);
                    setScheduleDisplayFlag(false);
                  }}
                  disabled={
                    campaignId !== undefined &&
                    adGroupId !== undefined &&
                    (adGroupUpdateDetailResponse?.status === 'FINISHED' ||
                      adGroupUpdateDetailResponse?.status === 'ADMIN_STOP')
                      ? true
                      : false
                  }
                />
                <label htmlFor={`scheduleDetailOption1_${adGroupIdx}`} className="lab_radio">
                  가능한 모든 요일/시간 노출
                </label>
              </span>
            </li>
            <div className={styles.day_completetool + ' m-t-5-i'}>
              <ul className={styles.list_complete}>
                <li>
                  <strong className={styles.tit_complete}>집행요일 : </strong>
                  <p className={styles.txt_complete}>월, 화, 수, 목, 금, 토, 일</p>
                </li>
                <li>
                  <strong className={styles.tit_complete}>집행시간 : </strong>
                  <p className={styles.txt_complete}>
                    {myForm.adGroup[adGroupIdx].lateNightTargeting == false ? '00:00 ~ 23:59' : '22:00 ~ 06:59'}
                  </p>
                </li>
              </ul>
            </div>
            <li>
              <span className="box_radioinp">
                <input
                  type="radio"
                  name={`adGroup[${adGroupIdx}].hasDetailTime`}
                  id={`scheduleDetailOption2_${adGroupIdx}`}
                  // className="inp_radio"
                  value="Y"
                  checked={myForm.adGroup[adGroupIdx].hasDetailTime == 'Y' ? true : false}
                  onChange={(e) => {
                    setScheduleDisplayFlag(true);
                    setValues({
                      campaign: { ...myForm.campaign },
                      adGroup: myForm.adGroup.map((item, idx) =>
                        idx == adGroupIdx
                          ? {
                              ...item,
                              schedule:
                                myForm.adGroup[adGroupIdx].lateNightTargeting === true
                                  ? lateNightCellsItems
                                  : newCellsItems,
                              hasDetailTime: e.target.value,
                            }
                          : item,
                      ),
                    });
                  }}
                  disabled={
                    campaignId !== undefined &&
                    adGroupId !== undefined &&
                    (adGroupUpdateDetailResponse?.status === 'FINISHED' ||
                      adGroupUpdateDetailResponse?.status === 'ADMIN_STOP')
                      ? true
                      : false
                  }
                />
                <label htmlFor={`scheduleDetailOption2_${adGroupIdx}`} className="lab_radio">
                  상세 설정
                </label>
              </span>
              {scheduleDisplayFlag && (
                <div className={styles.reform_sch_wrap}>
                  <div className={styles.info_sch}>
                    <span className={styles.sch_choice + ' ' + styles.on}>노출</span>
                    <span className={styles.sch_choice + ' ' + styles.off}>미노출</span>
                  </div>
                  <TableDragSelect
                    value={myForm.adGroup[adGroupIdx].schedule}
                    onChange={(cell: any) => {
                      setValues({
                        campaign: { ...myForm.campaign },
                        adGroup: myForm.adGroup.map((item, idx) =>
                          idx == adGroupIdx
                            ? {
                                ...item,
                                schedule: cell,
                              }
                            : item,
                        ),
                      });
                    }}
                  >
                    <tr>
                      <td disabled />
                      <td disabled>월</td>
                      <td disabled>화</td>
                      <td disabled>수</td>
                      <td disabled>목</td>
                      <td disabled>금</td>
                      <td disabled>토</td>
                      <td disabled>일</td>
                    </tr>
                    {[...Array(myForm.adGroup[adGroupIdx].schedule.length - 1)].map((cellItem, idx) => (
                      <tr key={idx}>
                        <td disabled>
                          <div>{idx < 10 ? `0${idx}시` : `${idx}시`}</div>
                        </td>
                        <td />
                        <td />
                        <td />
                        <td />
                        <td />
                        <td />
                        <td />
                      </tr>
                    ))}
                  </TableDragSelect>
                </div>
              )}
            </li>
          </ul>
        </div>
        <div className={styles.reform_item_card}>
          <div className={styles.reform_box_time}>
            <a className={styles.reform_link_card} onClick={() => setNightTargetDisplayFlag(!nightTargetDisplayFlag)}>
              <span className="inner_g">
                시간 제한 소재 설정
                {nightTargetDisplayFlag ? (
                  <MdOutlineKeyboardArrowUp size={25} className="m-b-5" />
                ) : (
                  <MdOutlineKeyboardArrowDown size={25} className="m-b-5" />
                )}
              </span>
            </a>
            {nightTargetDisplayFlag && (
              <div className={styles.reform_subbox_radiocheck}>
                <span className={styles.box_checkinp + ' m-l-0-i'}>
                  <input
                    type="checkbox"
                    name={`adGroup[${adGroupIdx}].lateNightTargeting`}
                    id={`lateNightTargeting_${adGroupIdx}`}
                    className={styles.inp_check}
                    checked={myForm.adGroup[adGroupIdx].lateNightTargeting}
                    onChange={(e) => {
                      if (e.target.checked == true) {
                        setValues({
                          campaign: { ...myForm.campaign },
                          adGroup: myForm.adGroup.map((item, idx) =>
                            idx == adGroupIdx
                              ? {
                                  ...item,
                                  schedule: lateNightCellsItems,
                                  lateNightTargeting: e.target.checked,
                                }
                              : item,
                          ),
                        });
                      } else {
                        setValues({
                          campaign: { ...myForm.campaign },
                          adGroup: myForm.adGroup.map((item, idx) =>
                            idx == adGroupIdx
                              ? {
                                  ...item,
                                  schedule: newCellsItems,
                                  lateNightTargeting: e.target.checked,
                                }
                              : item,
                          ),
                        });
                      }
                    }}
                    disabled={
                      campaignId !== undefined &&
                      adGroupId !== undefined &&
                      (adGroupUpdateDetailResponse?.status === 'FINISHED' ||
                        adGroupUpdateDetailResponse?.status === 'ADMIN_STOP')
                        ? true
                        : false
                    }
                  />
                  <label htmlFor={`lateNightTargeting_${adGroupIdx}`} className={styles.lab_check}>
                    심야 타게팅
                  </label>
                </span>
                <p className={styles.reform_desc_radiocheck}>
                  심야 시간대에만 광고집행이 가능한 소재 (예 : 고도수 주류 등)를 사용할 경우 필수로 선택하세요.
                  <br />
                  광고그룹 만들기 후에는 해제할 수 없습니다.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;

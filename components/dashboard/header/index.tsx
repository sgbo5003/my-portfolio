import { BiHelpCircle } from 'react-icons/bi';
import { BsFillBarChartFill } from 'react-icons/bs';
import { TbRefresh } from 'react-icons/tb';
import { IoInformationCircle } from 'react-icons/io5';
import Filter from '../../../components/adFilter';
import { useState, useRef, useCallback, useEffect, Dispatch, SetStateAction } from 'react';
import * as fnc from '../../../utils/commonFunction';
import { DateRangePicker, Range } from 'react-date-range';
import { subDays } from 'date-fns';
import { useRouter } from 'next/router';

const DashBoardHeader = (props: {
  rangeDate: Range[];
  setRangeDate: Dispatch<SetStateAction<Range[]>>;
  reportDate: Array<{ startDate: string; endDate: string }>;
  setReportDate: Dispatch<SetStateAction<Array<{ startDate: string; endDate: string }>>>;
  getCampaignData: () => Promise<void>;
  getAdGroupData: () => Promise<void>;
  getCreativeData: () => Promise<void>;
  getAdAccountChartInfo: () => Promise<void>;
  getAdAccountOperationCountInfo: () => Promise<void>;
  getDashboardChartTotal: () => Promise<void>;
  getCostTodayInfo: () => Promise<void>;
  getDashboardChartDetail: () => Promise<void>;
  getDashboardChartDetailInfo: () => Promise<void>;
  costOfToday: number;
}) => {
  const {
    rangeDate,
    setRangeDate,
    reportDate,
    setReportDate,
    getCampaignData,
    getAdGroupData,
    getCreativeData,
    getAdAccountChartInfo,
    getAdAccountOperationCountInfo,
    getDashboardChartTotal,
    getCostTodayInfo,
    getDashboardChartDetail,
    getDashboardChartDetailInfo,
    costOfToday,
  } = props;
  const router = useRouter();
  const { table, summary, adaccountId } = router.query;
  const calendarInputDivRef = useRef<HTMLDivElement>(null);
  const [showCalendar, setShowCalendar] = useState<boolean>(false);

  const onCalendarInputClick = (): void => {
    setShowCalendar(true);
  };

  const onDateChange = useCallback((item: any) => {
    setRangeDate([item.selection]);
  }, []);

  const handleClickOutSide = (e: any) => {
    if (calendarInputDivRef && !calendarInputDivRef.current?.contains(e.target)) {
      setShowCalendar(false);
    }
  };

  useEffect(() => {
    setRangeDate([
      {
        startDate: fnc.YYYYMMDDToDate(reportDate[0].startDate),
        endDate: fnc.YYYYMMDDToDate(reportDate[0].endDate),
        key: 'selection',
      },
    ]);
  }, [showCalendar]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutSide);
    return () => {
      document.removeEventListener('mousedown', handleClickOutSide);
    };
  });

  return (
    <div className="inner_g">
      <div className="wrap_price">
        <strong className="tit_search">
          {/* <span>
            <a className="link_g m-b-4">
              <BiHelpCircle />
            </a>
          </span> */}
        </strong>
        <p className="txt_search">${costOfToday.toLocaleString()}</p>
        <a
          className="link_account"
          onClick={() => {
            if (adaccountId !== undefined) {
              if (summary !== undefined) {
                let routerPathStr = '';
                if (summary === 'ad_account') {
                  if (router.asPath.includes('?summary=ad_account')) {
                    routerPathStr = router.asPath.replace('?summary=ad_account', '');
                    routerPathStr = routerPathStr.replace('&', '?');
                    router.push(routerPathStr);
                  } else {
                    routerPathStr = router.asPath.replace('&summary=ad_account', '');
                    router.push(routerPathStr);
                  }
                } else {
                  if (router.asPath.includes(`?summary=${summary}`)) {
                    routerPathStr = router.asPath.replace(`?summary=${summary}`, '?summary=ad_account');
                    router.push(routerPathStr);
                  } else {
                    routerPathStr = router.asPath.replace(`&summary=${summary}`, '&summary=ad_account');
                    router.push(routerPathStr);
                  }
                }
              } else {
                if (router.asPath.includes('?')) {
                  router.push(router.asPath + '&summary=ad_account');
                } else {
                  router.push(router.asPath + '?summary=ad_account');
                }
              }
            }
          }}
        >
          <span className="m-l-5">
            <BsFillBarChartFill color={summary === 'ad_account' ? '#4884f1' : ''} />
          </span>
        </a>
      </div>
      <Filter />
      <div className="wrap_calendar">
        <div className="reform_box_calendar">
          <div className="calendar_div" ref={calendarInputDivRef}>
            <input
              type="text"
              className="form-control form-control-sm h-36 calendar_input"
              onClick={() => onCalendarInputClick()}
              value={reportDate[0].startDate + ' ~ ' + reportDate[0].endDate}
              onChange={() => {}}
            />
            {showCalendar && (
              <div className="calendar_wrap">
                <DateRangePicker
                  ranges={rangeDate}
                  onChange={(item) => onDateChange(item)}
                  months={2}
                  direction="horizontal"
                />
                <div className="calendar_btn_wrap">
                  <button type="button" className="btn_gm gm_bl" onClick={() => setShowCalendar(false)}></button>
                  <button
                    type="button"
                    className="btn_gm m-l-10"
                    onClick={() => {
                      setReportDate([
                        {
                          startDate: fnc.dateAsYYYYMMDD(rangeDate[0].startDate ?? subDays(new Date(), 7)),
                          endDate: fnc.dateAsYYYYMMDD(rangeDate[0].endDate ?? new Date()),
                        },
                      ]);
                      setShowCalendar(false);
                    }}
                  ></button>
                </div>
              </div>
            )}
          </div>
        </div>
        <a
          className="btn_gm gm_line btn_refresh h-36"
          onClick={() => {
            if (table === 'campaign' || table === undefined) {
              getCampaignData();
            } else if (table === 'ad_group') {
              getAdGroupData();
            } else if (table === 'creative') {
              getCreativeData();
            }
            if (summary !== undefined) {
              if (summary === 'ad_account') {
                getAdAccountChartInfo();
                // getAdAccountAdvertiserInfo();
                getAdAccountOperationCountInfo();
              } else if (
                summary === 'campaign' ||
                summary === 'ad_group' ||
                summary === 'creative' ||
                String(summary).split('~')[1] === ''
              ) {
                getDashboardChartTotal();
                getCostTodayInfo();
              } else {
                getDashboardChartDetail();
                getDashboardChartDetailInfo();
              }
            }
          }}
        >
          <span className="inner_g p-l-10-i p-r-10-i">
            <TbRefresh />
          </span>
        </a>
        {/* <a className="btn_gm gm_line btn_guide">
          <span className="inner_g p-l-10-i p-r-10-i">
            <IoInformationCircle />
          </span>
        </a> */}
      </div>
    </div>
  );
};

export default DashBoardHeader;

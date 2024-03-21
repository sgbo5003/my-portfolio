import React, { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from 'react';
import { DateRangePicker, Range } from 'react-date-range';
import { subDays } from 'date-fns';
import * as fnc from '../../../utils/commonFunction';
import {
  adaccountHeaderColumns,
  adGroupHeaderColumns,
  campaignHeaderColumns,
  categoryItems,
  costIndicatorHeaderColumns,
  creativeHeaderColumns,
  defaultIndicatorHeaderColumns,
  HeaderColumnsType,
  indicatorItems,
  statusItems,
} from '../../../components/report/items/CustomReportItems';
import { HiDownload } from 'react-icons/hi';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { useRouter } from 'next/router';
import { InitialFormValueProps } from '../../../pages/report';

const CustomReportHead = (props: {
  values: InitialFormValueProps;
  setValues: (values: React.SetStateAction<InitialFormValueProps>) => void;
  handleChange: (e: React.ChangeEvent<any>) => void;
  setCustomReportTableData: Dispatch<
    SetStateAction<{
      nodes: any[];
    }>
  >;
  setGridTemplateColumns: Dispatch<SetStateAction<string>>;
  headerColumns: HeaderColumnsType[];
  setHeaderColumns: Dispatch<SetStateAction<HeaderColumnsType[]>>;
  reportDate: { startDate: string; endDate: string }[];
  setReportDate: Dispatch<SetStateAction<{ startDate: string; endDate: string }[]>>;
  getCustomReportAdAccountSearch: (
    categoryVal: string,
    startDate: string,
    endDate: string,
    statusVal: string[],
  ) => Promise<void>;
}) => {
  const {
    values,
    setValues,
    handleChange,
    setCustomReportTableData,
    setGridTemplateColumns,
    headerColumns,
    setHeaderColumns,
    reportDate,
    setReportDate,
    getCustomReportAdAccountSearch,
  } = props;
  const router = useRouter();
  const { adaccountId, page } = router.query;
  const calendarInputDivRef = useRef<HTMLDivElement>(null);
  const categorySelectRef = useRef<HTMLDivElement>(null);
  const statusSelectRef = useRef<HTMLDivElement>(null);
  const indicatorSelectRef = useRef<HTMLDivElement>(null);
  const [showCategorySelect, setShowCategorySelect] = useState<boolean>(false);
  const [showStatusSelect, setShowStatusSelect] = useState<boolean>(false);
  const [showIndicatorSelect, setShowIndicatorSelect] = useState<boolean>(false);
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [rangeDate, setRangeDate] = useState<Range[]>([
    { startDate: subDays(new Date(), 7), endDate: new Date(), key: 'selection' },
  ]);
  const categoryItems: { id: number; label: string; value: string }[] = [
    { id: 0, label: '전체', value: 'ALL' },
    { id: 1, label: '광고계정', value: 'AD_ACCOUNT' },
    { id: 2, label: '캠페인', value: 'CAMPAIGN' },
    { id: 3, label: '광고그룹', value: 'AD_GROUP' },
    { id: 4, label: '소재', value: 'CREATIVE' },
  ];
  const adaccountHeaderColumns: HeaderColumnsType[] = [
    {
      columnIndex: 'reportDate',
      columnName: '기간',
      width: '20%',
    },
    {
      columnIndex: 'impression',
      columnName: '노출수',
      width: '20%',
    },
    {
      columnIndex: 'click',
      columnName: '클릭수',
      width: '20%',
    },
    {
      columnIndex: 'ctr',
      columnName: '클릭률',
      width: '20%',
    },
    {
      columnIndex: 'cost',
      columnName: 'cost',
      width: '20%',
    },
  ];

  const campaignHeaderColumns: HeaderColumnsType[] = [
    {
      columnIndex: 'adTypeAndGoal',
      columnName: '유형',
      width: '221px',
    },
    {
      columnIndex: 'campaignName',
      columnName: '캠페인',
      width: '221px',
    },
    {
      columnIndex: 'reportDate',
      columnName: '기간',
      width: '221px',
    },
  ];

  const adGroupHeaderColumns: HeaderColumnsType[] = [
    {
      columnIndex: 'adTypeAndGoal',
      columnName: '유형',
      width: '221px',
    },
    {
      columnIndex: 'campaignName',
      columnName: '캠페인',
      width: '221px',
    },
    {
      columnIndex: 'adGroupName',
      columnName: '광고그룹',
      width: '221px',
    },
    {
      columnIndex: 'reportDate',
      columnName: '기간',
      width: '221px',
    },
  ];

  const creativeHeaderColumns: HeaderColumnsType[] = [
    {
      columnIndex: 'adTypeAndGoal',
      columnName: '유형',
      width: '221px',
    },
    {
      columnIndex: 'campaignName',
      columnName: '캠페인',
      width: '221px',
    },
    {
      columnIndex: 'adGroupName',
      columnName: '광고그룹',
      width: '221px',
    },
    {
      columnIndex: 'creativeName',
      columnName: '소재',
      width: '221px',
    },
    {
      columnIndex: 'reportDate',
      columnName: '기간',
      width: '221px',
    },
  ];

  const costIndicatorHeaderColumns: HeaderColumnsType[] = [
    {
      columnIndex: 'cost',
      columnName: '비용',
      width: '109px',
    },
  ];
  const defaultIndicatorHeaderColumns: HeaderColumnsType[] = [
    {
      columnIndex: 'impression',
      columnName: '노출수',
      width: '109px',
    },
    {
      columnIndex: 'click',
      columnName: '클릭수',
      width: '109px',
    },
    {
      columnIndex: 'ctr',
      columnName: '클릭률',
      width: '109px',
    },
    {
      columnIndex: 'cpm',
      columnName: '노출당 비용',
      width: '109px',
    },
    {
      columnIndex: 'cpc',
      columnName: '클릭당 비용',
      width: '109px',
    },
  ];

  const statusItems: { id: number; label: string; value: string }[] = [
    { id: 1, label: 'ON', value: 'ON' },
    { id: 2, label: 'OFF', value: 'OFF' },
    { id: 3, label: '삭제', value: 'DEL' },
  ];

  const indicatorItems = [
    {
      groupId: 1,
      groupName: '비용 지표',
      columnItems: [{ groupId: 1, id: 1, label: '비용 지표', value: 'costIndicator' }],
    },
    {
      groupId: 2,
      groupName: '실적 지표',
      columnItems: [
        { groupId: 2, id: 2, label: '기본 지표', value: 'defaultIndicator' },
        // { groupId: 2, id: 3, label: '발송 지표', value: 'sendIndicator' },
      ],
    },
  ];

  const onCalendarInputClick = (): void => {
    setShowCalendar(true);
  };

  const onDateChange = useCallback((item: any) => {
    setRangeDate([item.selection]);
  }, []);

  const indicatorColumnNameToCommasStr = () => {
    let indicator = '';
    indicatorItems.map((indicatorItem) => {
      indicatorItem.columnItems.map((columnItem) => {
        if (values.indicatorCheckVal.some((el) => el === columnItem.value)) {
          return (indicator = indicator + columnItem.label + ', ');
        }
      });
    });
    return indicator.slice(0, -2);
  };

  const getReportDownload = async () => {
    let indicatorArr: string[] = [];
    if (values.indicatorCheckVal.includes('costIndicator')) {
      costIndicatorHeaderColumns.map((costIndicatorHeaderColumn) => {
        indicatorArr = indicatorArr.concat(costIndicatorHeaderColumn.columnIndex);
      });
    }
    if (values.indicatorCheckVal.includes('defaultIndicator')) {
      defaultIndicatorHeaderColumns.map((defaultIndicatorHeaderColumn) => {
        indicatorArr = indicatorArr.concat(defaultIndicatorHeaderColumn.columnIndex);
      });
    }
    const bodyDataObj: {
      adAccountId: string | string[] | undefined;
      configs: string[];
      startDate: string;
      endDate: string;
      indicators: string[];
      reportLevel: string;
    } = {
      adAccountId: adaccountId,
      configs: values.statusCheckVal,
      startDate: reportDate[0].startDate.replace(/-/gi, ''),
      endDate: reportDate[0].endDate.replace(/-/gi, ''),
      indicators: indicatorArr,
      reportLevel: values.categorySelectVal.value, // AD_ACCOUNT, CAMPAIGN, AD_GROUP, CREATIVE
    };
    try {
      // await api.post('/report/download/custom/csv', bodyDataObj, { responseType: 'blob' }).then((response) => {
      //   const url = window.URL.createObjectURL(new Blob([response.data]));
      //   const link = document.createElement('a');
      //   link.href = url;
      //   link.setAttribute('download', response.headers['content-disposition'].split('=')[1]);
      //   document.body.appendChild(link);
      //   link.click();
      // });
    } catch (e) {
      // ErrorFunc(e);
    }
  };

  const handleClickOutSide = (e: any) => {
    if (calendarInputDivRef && !calendarInputDivRef.current?.contains(e.target)) {
      setShowCalendar(false);
    }
    if (categorySelectRef && !categorySelectRef.current?.contains(e.target)) {
      setShowCategorySelect(false);
    }
    if (statusSelectRef && !statusSelectRef.current?.contains(e.target)) {
      setShowStatusSelect(false);
    }
    if (indicatorSelectRef && !indicatorSelectRef.current?.contains(e.target)) {
      setShowIndicatorSelect(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutSide);
    return () => {
      document.removeEventListener('mousedown', handleClickOutSide);
    };
  });

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
    const newHeaderColumns = JSON.parse(JSON.stringify(headerColumns));
    let newString = '';
    if (values.indicatorCheckVal.length === 1) {
      if (values.indicatorCheckVal.includes('costIndicator')) {
        if (values.categorySelectVal.value === 'CAMPAIGN') {
          newHeaderColumns.map((newHeaderColumn: any) => {
            if (newHeaderColumn.columnIndex === 'campaignName') {
              newHeaderColumn.width = '426px';
            } else if (newHeaderColumn.columnIndex === 'reportDate') {
              newHeaderColumn.width = '426px';
            } else if (newHeaderColumn.columnIndex === 'cost') {
              newHeaderColumn.width = '1fr';
            }
          });
          for (let i = 0; i < newHeaderColumns.length; i++) {
            newString += newHeaderColumns[i].width + ' ';
          }
          setGridTemplateColumns(newString);
        } else if (values.categorySelectVal.value === 'AD_GROUP') {
          newHeaderColumns.map((newHeaderColumn: any) => {
            if (newHeaderColumn.columnIndex === 'campaignName') {
              newHeaderColumn.width = '312px';
            } else if (newHeaderColumn.columnIndex === 'adGroupName') {
              newHeaderColumn.width = '312px';
            } else if (newHeaderColumn.columnIndex === 'reportDate') {
              newHeaderColumn.width = '278px';
            } else if (newHeaderColumn.columnIndex === 'cost') {
              newHeaderColumn.width = '1fr';
            }
          });
          for (let i = 0; i < newHeaderColumns.length; i++) {
            newString += newHeaderColumns[i].width + ' ';
          }
          setGridTemplateColumns(newString);
        } else if (values.categorySelectVal.value === 'CREATIVE') {
          newHeaderColumns.map((newHeaderColumn: any) => {
            if (newHeaderColumn.columnIndex === 'campaignName') {
              newHeaderColumn.width = '240px';
            } else if (newHeaderColumn.columnIndex === 'adGroupName') {
              newHeaderColumn.width = '240px';
            } else if (newHeaderColumn.columnIndex === 'creativeName') {
              newHeaderColumn.width = '240px';
            } else if (newHeaderColumn.columnIndex === 'reportDate') {
              newHeaderColumn.width = '240px';
            } else if (newHeaderColumn.columnIndex === 'cost') {
              newHeaderColumn.width = '1fr';
            }
          });
          for (let i = 0; i < newHeaderColumns.length; i++) {
            newString += newHeaderColumns[i].width + ' ';
          }
          setGridTemplateColumns(newString);
        }
      } else if (values.indicatorCheckVal.includes('defaultIndicator')) {
        if (values.categorySelectVal.value === 'CAMPAIGN') {
          newHeaderColumns.map((newHeaderColumn: any) => {
            if (newHeaderColumn.columnIndex === 'campaignName') {
              newHeaderColumn.width = '288px';
            } else if (newHeaderColumn.columnIndex === 'reportDate') {
              newHeaderColumn.width = '268px';
            } else if (newHeaderColumn.columnIndex === 'impression') {
              newHeaderColumn.width = '1fr';
            } else if (newHeaderColumn.columnIndex === 'click') {
              newHeaderColumn.width = '1fr';
            } else if (newHeaderColumn.columnIndex === 'ctr') {
              newHeaderColumn.width = '1fr';
            } else if (newHeaderColumn.columnIndex === 'cpm') {
              newHeaderColumn.width = '1fr';
            } else if (newHeaderColumn.columnIndex === 'cpc') {
              newHeaderColumn.width = '1fr';
            }
          });
          for (let i = 0; i < newHeaderColumns.length; i++) {
            newString += newHeaderColumns[i].width + ' ';
          }
          setGridTemplateColumns(newString);
        }
      }
    }
    if (values.indicatorCheckVal.length === 2) {
      if (values.categorySelectVal.value === 'CAMPAIGN') {
        newHeaderColumns.map((newHeaderColumn: any) => {
          if (newHeaderColumn.columnIndex === 'cost') {
            newHeaderColumn.width = '1fr';
          } else if (newHeaderColumn.columnIndex === 'impression') {
            newHeaderColumn.width = '1fr';
          } else if (newHeaderColumn.columnIndex === 'click') {
            newHeaderColumn.width = '1fr';
          } else if (newHeaderColumn.columnIndex === 'ctr') {
            newHeaderColumn.width = '1fr';
          } else if (newHeaderColumn.columnIndex === 'cpm') {
            newHeaderColumn.width = '1fr';
          } else if (newHeaderColumn.columnIndex === 'cpc') {
            newHeaderColumn.width = '1fr';
          }
        });
        for (let i = 0; i < newHeaderColumns.length; i++) {
          newString += newHeaderColumns[i].width + ' ';
        }
        setGridTemplateColumns(newString);
      }
    }
  }, [values.indicatorCheckVal, values.categorySelectVal]);

  // console.log('values.categorySelectVal', values.categorySelectVal);

  return (
    <div className="set_head">
      <div className="f-left">
        <div className="single_wrap">
          <div className={`opt_select ${showCategorySelect ? 'opt_open' : ''}`} ref={categorySelectRef}>
            <a className="link_selected" onClick={() => setShowCategorySelect(true)}>
              {values.categorySelectVal.label}
            </a>
            <span className="ico_arr"></span>
            <div className="opt_list">
              <ul className="list_opt">
                {categoryItems.map((categoryItem) => {
                  if (categoryItem.id !== 0) {
                    // console.log('categoryItem.label', categoryItem.label);
                    return (
                      <li
                        className={`${categoryItem.value === values.categorySelectVal.value ? 'on' : ''}`}
                        key={categoryItem.id}
                        onClick={() => {
                          setValues({ ...values, categorySelectVal: categoryItem });
                          let newString = '';
                          let newHeaderColumns =
                            categoryItem.value === 'CAMPAIGN'
                              ? campaignHeaderColumns
                              : categoryItem.value === 'AD_GROUP'
                              ? adGroupHeaderColumns
                              : categoryItem.value === 'CREATIVE'
                              ? creativeHeaderColumns
                              : adaccountHeaderColumns;
                          if (categoryItem.value !== 'AD_ACCOUNT') {
                            values.indicatorCheckVal.map((indicatorCheckVal) => {
                              if (indicatorCheckVal === 'costIndicator') {
                                newHeaderColumns = newHeaderColumns.concat(costIndicatorHeaderColumns);
                              } else if (indicatorCheckVal === 'defaultIndicator') {
                                newHeaderColumns = newHeaderColumns.concat(defaultIndicatorHeaderColumns);
                              }
                            });
                          }
                          for (let i = 0; i < newHeaderColumns.length; i++) {
                            newString += newHeaderColumns[i].width + ' ';
                          }
                          setGridTemplateColumns(newString);
                          setHeaderColumns(newHeaderColumns);
                          setShowCategorySelect(false);
                          if (page !== undefined && Number(page) !== 1) {
                            let routerPathStr = router.asPath;
                            routerPathStr = routerPathStr.replace(`page=${page}`, 'page=1');
                            router.push(routerPathStr);
                          } else {
                            getCustomReportAdAccountSearch(
                              categoryItem.value,
                              reportDate[0].startDate.replace(/-/gi, ''),
                              reportDate[0].endDate.replace(/-/gi, ''),
                              values.statusCheckVal,
                            );
                          }
                        }}
                      >
                        <a className="link_option in_active">{categoryItem.label}</a>
                      </li>
                    );
                  }
                })}
              </ul>
            </div>
          </div>
        </div>
        {values.categorySelectVal.value !== 'AD_ACCOUNT' && (
          <div className="single_wrap">
            <div className={`opt_select ${showStatusSelect ? 'opt_open' : ''}`} ref={statusSelectRef}>
              <a className="link_selected" onClick={() => setShowStatusSelect(true)}>
                {/* {values.statusCheckVal.length === 3 ? '상태 : 전체' : '상태 : 사용자 설정'} */}
                {values.statusCheckVal.length === 3 ? `상태 : 전체` : `상태 : 사용자 설정`}
              </a>
              <span className="ico_arr"></span>
              <div className="opt_list">
                <ul className="list_opt">
                  {statusItems.map((statusItem) => (
                    <li
                      className={`${values.statusCheckVal.some((el) => el === statusItem.value) === true ? 'on' : ''}`}
                      key={statusItem.id}
                    >
                      <span className="box_checkinp">
                        <input
                          type="checkbox"
                          name="statusCheckVal"
                          id={`statusCheck_${statusItem.id}`}
                          className="inp_check"
                          value={statusItem.value}
                          checked={values.statusCheckVal.includes(statusItem.value)}
                          onChange={(e) => {
                            if (e.target.checked === false && values.statusCheckVal.length === 1) {
                              return;
                            }
                            let newArr: string[] = values.statusCheckVal;
                            if (newArr.includes(e.target.value)) {
                              newArr = newArr.filter((el) => el !== e.target.value);
                            } else {
                              newArr = newArr.concat(e.target.value);
                            }
                            if (page !== undefined && Number(page) !== 1) {
                              let routerPathStr = router.asPath;
                              routerPathStr = routerPathStr.replace(`page=${page}`, 'page=1');
                              router.push(routerPathStr);
                            } else {
                              getCustomReportAdAccountSearch(
                                values.categorySelectVal.value,
                                reportDate[0].startDate.replace(/-/gi, ''),
                                reportDate[0].endDate.replace(/-/gi, ''),
                                newArr,
                              );
                            }
                            handleChange(e);
                          }}
                        />
                        <label htmlFor={`statusCheck_${statusItem.id}`} className="lab_check">
                          {statusItem.label}
                        </label>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="f-right">
        {values.categorySelectVal.value !== 'AD_ACCOUNT' && (
          <div className="single_wrap">
            <div className={`opt_select opt_limit ${showIndicatorSelect ? 'opt_open' : ''}`} ref={indicatorSelectRef}>
              <a className="link_selected" onClick={() => setShowIndicatorSelect(true)}>
                {'열'}: {indicatorColumnNameToCommasStr()}
              </a>
              <span className="ico_arr"></span>
              <div className="opt_list">
                {indicatorItems.map((indicatorItem) => (
                  <React.Fragment key={indicatorItem.groupId}>
                    <strong className="tit_option">{indicatorItem.groupName}</strong>
                    <ul className="list_opt sub_listopt">
                      {indicatorItem.columnItems.map((columnItem) => (
                        <li
                          className={`${
                            values.indicatorCheckVal.some((el) => el === columnItem.value) === true ? 'on' : ''
                          }`}
                          key={columnItem.id}
                        >
                          <span className="box_checkinp">
                            <input
                              type="checkbox"
                              name="indicatorCheckVal"
                              id={`indicatorCheck_${columnItem.id}`}
                              className="inp_check"
                              value={columnItem.value}
                              checked={values.indicatorCheckVal.includes(columnItem.value)}
                              onChange={(e) => {
                                if (e.target.checked === false && values.indicatorCheckVal.length === 1) {
                                  return;
                                }
                                let newString = '';
                                let newHeaderColumns = [...headerColumns];
                                if (e.target.checked === false) {
                                  if (e.target.value === 'costIndicator') {
                                    newHeaderColumns = newHeaderColumns.filter(
                                      (item) =>
                                        !costIndicatorHeaderColumns.some((el) => el.columnIndex === item.columnIndex),
                                    );
                                  } else {
                                    newHeaderColumns = newHeaderColumns.filter(
                                      (item) =>
                                        !defaultIndicatorHeaderColumns.some(
                                          (el) => el.columnIndex === item.columnIndex,
                                        ),
                                    );
                                  }
                                } else {
                                  if (e.target.value === 'costIndicator') {
                                    if (values.categorySelectVal.value === 'CAMPAIGN') {
                                      for (let i = 0; i < costIndicatorHeaderColumns.length; i++) {
                                        newHeaderColumns.splice(3, 0, costIndicatorHeaderColumns[i]);
                                      }
                                    } else if (values.categorySelectVal.value === 'AD_GROUP') {
                                      for (let i = 0; i < costIndicatorHeaderColumns.length; i++) {
                                        newHeaderColumns.splice(4, 0, costIndicatorHeaderColumns[i]);
                                      }
                                    } else if (values.categorySelectVal.value === 'CREATIVE') {
                                      for (let i = 0; i < costIndicatorHeaderColumns.length; i++) {
                                        newHeaderColumns.splice(5, 0, costIndicatorHeaderColumns[i]);
                                      }
                                    }
                                  } else {
                                    newHeaderColumns = newHeaderColumns.concat(defaultIndicatorHeaderColumns);
                                  }
                                }
                                for (let i = 0; i < newHeaderColumns.length; i++) {
                                  newString += newHeaderColumns[i].width + ' ';
                                }
                                setGridTemplateColumns(newString);
                                setHeaderColumns(newHeaderColumns);
                                handleChange(e);
                              }}
                            />
                            <label htmlFor={`indicatorCheck_${columnItem.id}`} className="lab_check">
                              {columnItem.label}
                            </label>
                          </span>
                        </li>
                      ))}
                    </ul>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        )}
        {/* <div className="single_wrap">
              <div className="opt_select">
                <a className="link_selected">분석 데이터</a>
                <span className="ico_arr"></span>
                <div className="opt_list">
                  <ul className="list_opt"></ul>
                </div>
              </div>
            </div> */}
        <div className="single_wrap">
          <div className="calendar_div" ref={calendarInputDivRef}>
            <input
              type="text"
              className="form-control form-control-sm h-36 calendar_input"
              style={{ paddingLeft: '15px' }}
              onClick={() => onCalendarInputClick()}
              value={reportDate[0].startDate + ' ~ ' + reportDate[0].endDate}
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
                  <button type="button" className="btn_gm gm_bl" onClick={() => setShowCalendar(false)}>
                    <span className="inner_g">취소</span>
                  </button>
                  <button
                    type="button"
                    className="btn_gm m-l-10"
                    onClick={() => {
                      // console.log('rangeDate[0].startDate', rangeDate[0].startDate);
                      // console.log('rangeDate[0].startDate', rangeDate[0].endDate);
                      setReportDate([
                        {
                          startDate: fnc.dateAsYYYYMMDD(rangeDate[0].startDate ?? subDays(new Date(), 7)),
                          endDate: fnc.dateAsYYYYMMDD(rangeDate[0].endDate ?? new Date()),
                        },
                      ]);
                      setShowCalendar(false);
                      if (page !== undefined && Number(page) !== 1) {
                        let routerPathStr = router.asPath;
                        routerPathStr = routerPathStr.replace(`page=${page}`, 'page=1');
                        router.push(routerPathStr);
                      } else {
                        getCustomReportAdAccountSearch(
                          values.categorySelectVal.value,
                          fnc.dateAsYYYYMMDD(rangeDate[0].startDate ?? subDays(new Date(), 7)).replace(/-/gi, ''),
                          fnc.dateAsYYYYMMDD(rangeDate[0].endDate ?? new Date()).replace(/-/gi, ''),
                          values.statusCheckVal,
                        );
                      }
                    }}
                  >
                    <span className="inner_g">적용</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="single_wrap">
          <a className="btn_gm gm_line" onClick={() => getReportDownload()}>
            <span className="inner_g p-l-10-i p-r-10-i">
              <HiDownload />
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default CustomReportHead;

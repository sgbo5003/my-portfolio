import styles from '../table/DashBoardTable.module.scss';
import styles2 from '../../../components/dashboard/table/campaign/CampaignTable.module.scss';
import {
  Body,
  Cell,
  Header,
  HeaderCell,
  HeaderRow,
  Row,
  Table,
  TableNode,
} from '@table-library/react-table-library/table';
import { useRouter } from 'next/router';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useTheme } from '@table-library/react-table-library/theme';
import CampaignTable from './campaign';
import * as adFnc from '../../../utils/adFunction';
import * as fnc from '../../../utils/commonFunction';
import DashboardPaginationButton from '../../../components/common/paginationButton/dashboard';
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from 'react-icons/md';
import { BiHelpCircle } from 'react-icons/bi';
import { BsFillBarChartFill } from 'react-icons/bs';

export interface HeaderColumnsType {
  columnGroupNum?: number; // 1: 비용지표, 2: 기본 지표, 3: SDK 전환 지표
  columnIndex: string;
  columnName: string;
  columnSeq?: number;
  columnRate?: number;
  pinLeftYn: boolean;
  width: string;
  sortIndex?: string;
  isHelp: boolean;
  helpId: string;
}

const DashBoardTable = (props: {
  checkItems: { tableType: string; id: string }[];
  setCheckItems: Dispatch<SetStateAction<{ tableType: string; id: string }[]>>;
  campiagnData: { nodes: any[] };
  nodes: any[];
  pageSize: number;
  reportDate: Array<{
    startDate: string;
    endDate: string;
  }>;
  sort: string;
  setSort: Dispatch<SetStateAction<string>>;
  indicatorItems: HeaderColumnsType[];
}) => {
  const { checkItems, setCheckItems, campiagnData, nodes, pageSize, reportDate, sort, setSort, indicatorItems } = props;
  const router = useRouter();
  const { adaccountId, table, page, size, filter, summary } = router.query;

  const [gridTamplateColumns, setGridTemplateColumns] = useState<string>('');
  const [headerColumns, setHeaderColumns] = useState<Array<HeaderColumnsType>>([]);
  const [hoverState, setHoverState] = useState<string>('');
  const campaignHeaderColumns: HeaderColumnsType[] = [
    {
      columnIndex: 'campaignName',
      columnName: '캠페인',
      pinLeftYn: true,
      width: '350px',
      sortIndex: 'name',
      isHelp: false,
      helpId: '',
    },
    {
      columnIndex: 'category',
      columnName: '유형',
      pinLeftYn: false,
      width: '200px',
      sortIndex: 'adTypeGoalId',
      isHelp: false,
      helpId: '',
    },
    {
      columnIndex: 'campaignBudget',
      columnName: '예산',
      pinLeftYn: false,
      width: '200px',
      sortIndex: 'dailyBudgetAmount',
      isHelp: true,
      helpId: 'budget-element',
    },
    {
      columnIndex: 'campaignPeriod',
      columnName: '기간',
      pinLeftYn: false,
      width: '250px',
      sortIndex: 'startDate',
      isHelp: true,
      helpId: 'period-element',
    },
  ];

  const tableType =
    table === 'campaign' || table === undefined
      ? 'campaign'
      : table === 'ad_group'
      ? 'ad_group'
      : table === 'creative'
      ? 'creative'
      : '';
  const tableData: { nodes: any[] } = campiagnData;

  const theme = useTheme({
    Table: `
      // --data-table-library_grid-template-columns:  250px 150px 25% 25% 50% !important;
      // --data-table-library_grid-template-columns:  250px 150px 550px 550px 550px !important;
      --data-table-library_grid-template-columns: 50px ${gridTamplateColumns} !important;
      // overflow: visible !important;
    `,
    HeaderCell: `
      background-color: #f5f5f5 !important;
    `,
    BaseCell: `
      &:nth-of-type(1) {
        left: 0px;
      }

      &:nth-of-type(2) {
        left: 50px;
      }
    `,
    Row: `
      border-bottom: 1px solid #e2e5e8 !important;
      td {
        background-color: #fff;
      }
      td:nth-of-type(3) {
        div {
          display: flex;
          justify-content: center;
        }
      }
    `,
  });

  const checkAllFnc = (target: any, tabType: string) => {
    const newCheckItems: { tableType: string; id: string }[] = [];
    for (let i = 0; i < tableData.nodes.length; i++) {
      newCheckItems.push({ tableType: tabType, id: String(tableData.nodes[i].id) });
    }
    if (target.checked) {
      let duplicationItems: { tableType: string; id: string }[] = [];
      checkItems.map((checkItem) => {
        newCheckItems.map((newCheckItem) => {
          if (Object.entries(checkItem).toString() === Object.entries(newCheckItem).toString()) {
            duplicationItems = duplicationItems.concat(newCheckItem);
          }
        });
      });
      if (duplicationItems.length > 0) {
        const notDuplicationItems = newCheckItems.filter(
          (item) => !duplicationItems.some((el) => el.tableType === item.tableType && el.id === item.id),
        );
        setCheckItems(checkItems.concat(notDuplicationItems));
      } else {
        setCheckItems(checkItems.concat(newCheckItems));
      }
    } else {
      const newCheckItems2 = [...checkItems];
      for (let j = 0; j < newCheckItems2.length; j++) {
        if (
          newCheckItems2[j].tableType === tabType &&
          newCheckItems.some((el) => el.id === newCheckItems2[j].id) === true
        ) {
          newCheckItems2.splice(j, 1);
          j--;
        }
      }
      setCheckItems(newCheckItems2);
    }
  };

  const checkFnc = (target: string, tabType: string) => {
    const newCheckItems = [...checkItems];
    if (newCheckItems.some((el) => el.tableType === tabType && el.id === target) === true) {
      setCheckItems(newCheckItems.filter((el) => !(el.tableType === tabType && el.id === target)));
    } else {
      newCheckItems.push({ tableType: tabType, id: target });
      setCheckItems(newCheckItems);
    }
  };

  const checkedAllFnc = () => {
    let newCheckItems: { tableType: string; id: string }[] = [];
    let checkCount = 0;
    for (let i = 0; i < tableData.nodes.length; i++) {
      newCheckItems = newCheckItems.concat([{ tableType: tableType, id: String(tableData.nodes[i].id) }]);
    }
    checkItems.map((checkItem, idx) => {
      newCheckItems.map((newCheckItem) => {
        if (checkItem.tableType === tableType && checkItem.id === newCheckItem.id) {
          checkCount = checkCount + 1;
        }
      });
    });
    if (newCheckItems.length === checkCount) {
      return true;
    } else {
      return false;
    }
  };

  // const switchFnc = async (item: TableNode, tabType: string) => {
  //   if (tabType === 'campaign') {
  //     try {
  //       await api.patch(`/campaigns/${item.id}/config/${item.config === 'ON' ? 'off' : 'on'}`);
  //       await getCampaignData();
  //     } catch (e) {
  //       ErrorFunc(e);
  //     }
  //   } else if (tabType === 'ad_group') {
  //     try {
  //       await api.patch(`/adgroups/${item.id}/config/${item.config === 'ON' ? 'off' : 'on'}`);
  //       await getAdGroupData();
  //     } catch (e) {
  //       ErrorFunc(e);
  //     }
  //   } else if (tabType === 'creative') {
  //     try {
  //       await api.patch(`/creatives/${item.id}/config/${item.config === 'ON' ? 'off' : 'on'}`);
  //       await getCreativeData();
  //     } catch (e) {
  //       ErrorFunc(e);
  //     }
  //   }
  // };

  useEffect(() => {
    if (!router.isReady) return;

    let newString = '';
    const indicatorItemsArr =
      sessionStorage.getItem('myIndicatorItems') !== null
        ? JSON.parse(sessionStorage.getItem('myIndicatorItems') ?? '')
        : indicatorItems;
    if (table == 'campaign' || table == undefined) {
      // const newArr = [...campaignHeaderColumns];
      const newArr = JSON.parse(JSON.stringify(campaignHeaderColumns));
      for (let j = 0; j < indicatorItemsArr.length; j++) {
        newArr.splice(newArr.length - 1, 0, indicatorItemsArr[j]);
      }
      // console.log('newArr', newArr);
      setHeaderColumns(newArr);
      for (let i = 0; i < newArr.length; i++) {
        newString += newArr[i].width + ' ';
      }
      setGridTemplateColumns(newString);
      // getCampaignData();
    }
  }, [
    router.isReady,
    table,
    page,
    size,
    filter,
    reportDate,
    sort,
    typeof window !== 'undefined' && sessionStorage.getItem('myIndicatorItems'),
    router,
  ]);

  return (
    <div className={styles.table_wrap}>
      <div className={styles.table_dashboard}>
        {/* <div style={{ height: '730px', overflow: 'hidden' }}> */}
        <div style={{ overflow: 'hidden' }}>
          {(table == 'campaign' || table == undefined) && campiagnData.nodes.length == 0 ? (
            // <div className={styles.nodata_info} style={{ width: '100%', height: '100%' }}>
            <div className={styles.nodata_info} style={{ width: '100%', height: '350px' }}>
              <div className={styles.inner_tbl}>{`${
                table == 'campaign' || table == undefined ? '캠페인이 없습니다.' : ''
              }`}</div>
            </div>
          ) : (
            <>
              <div
                style={{
                  position: 'relative',
                  // height: '730px',
                  width: '100%',
                  overflowX: 'auto',
                  willChange: 'transform',
                  direction: 'ltr',
                }}
              >
                <Table data={table == 'campaign' || table == undefined ? campiagnData : { nodes }} theme={theme}>
                  {(tableList: any) => (
                    <>
                      <Header>
                        <HeaderRow className="border_bottom">
                          <HeaderCell className={styles.inner_tbl} pinLeft={true}>
                            <input
                              type="checkbox"
                              onChange={(e) =>
                                checkAllFnc(
                                  e.target,
                                  table == 'campaign' || table == undefined
                                    ? 'campaign'
                                    : table == 'ad_group'
                                    ? 'ad_group'
                                    : table == 'creative'
                                    ? 'creative'
                                    : '',
                                )
                              }
                              value={'all'}
                              checked={checkedAllFnc()}
                            />
                          </HeaderCell>
                          {headerColumns.map((item, idx) => (
                            <HeaderCell
                              className={
                                styles.inner_tbl +
                                (sort === item.sortIndex || sort === item.sortIndex + ',desc'
                                  ? ' ' + styles.sort_on
                                  : '')
                              }
                              pinLeft={item.pinLeftYn}
                              key={idx}
                            >
                              {item.columnName}
                              <span style={{ position: 'absolute', right: 5 }}>
                                <a
                                  onClick={() => {
                                    if (sort !== '') {
                                      if (sort === item.sortIndex) {
                                        setSort(item.sortIndex + ',desc');
                                      } else {
                                        setSort(item.sortIndex ?? '');
                                      }
                                    } else {
                                      setSort(item.sortIndex ?? '');
                                    }
                                  }}
                                >
                                  {sort !== '' && sort === item.sortIndex ? (
                                    <MdOutlineKeyboardArrowUp size={17} />
                                  ) : (
                                    <MdOutlineKeyboardArrowDown size={17} />
                                  )}
                                </a>
                              </span>
                            </HeaderCell>
                          ))}
                        </HeaderRow>
                      </Header>
                      <Body>
                        {tableList.map((item: any, idx: number) => {
                          if (idx === 0) {
                            const myIndicatorItems =
                              sessionStorage.getItem('myIndicatorItems') !== null
                                ? JSON.parse(sessionStorage.getItem('myIndicatorItems') ?? '')
                                : indicatorItems;
                            if (table == 'campaign' || table == undefined) {
                              return (
                                <Row key={idx} item={item}>
                                  <Cell className={styles2.inner_tbl} pinLeft></Cell>
                                  <Cell className={styles2.inner_tbl} pinLeft>
                                    <span className={styles2.btn_dash}>
                                      <span className={styles2.link_chart + ' ' + styles2.show}>
                                        <a
                                          className={styles2.link_g + ' link_g'}
                                          onClick={() => {
                                            if (summary !== undefined) {
                                              let routerPathStr = '';
                                              if (
                                                summary?.includes('campaign') === true &&
                                                (String(summary).split('~')[1] === '' ||
                                                  String(summary).split('~')[1] == undefined)
                                              ) {
                                                if (router.asPath.includes(`?summary=${summary}`)) {
                                                  routerPathStr = router.asPath.replace(`?summary=${summary}`, '');
                                                  routerPathStr = routerPathStr.replace('&', '?');
                                                  router.push(routerPathStr);
                                                } else {
                                                  routerPathStr = router.asPath.replace(`&summary=${summary}`, '');
                                                  router.push(routerPathStr);
                                                }
                                              } else {
                                                if (router.asPath.includes(`?summary=${summary}`)) {
                                                  routerPathStr = router.asPath.replace(
                                                    `?summary=${summary}`,
                                                    '?summary=campaign',
                                                  );
                                                  router.push(routerPathStr);
                                                } else {
                                                  routerPathStr = router.asPath.replace(
                                                    `&summary=${summary}`,
                                                    '&summary=campaign',
                                                  );
                                                  router.push(routerPathStr);
                                                }
                                              }
                                            } else {
                                              if (router.asPath.includes('?')) {
                                                router.push(router.asPath + '&summary=campaign');
                                              } else {
                                                router.push(router.asPath + '?summary=campaign');
                                              }
                                            }
                                          }}
                                        >
                                          <span className={styles2.ico_comm}>
                                            <BsFillBarChartFill
                                              size={18}
                                              color={
                                                summary?.includes('campaign') === true &&
                                                (String(summary).split('~')[1] === '' ||
                                                  String(summary).split('~')[1] == undefined)
                                                  ? '#4884f1'
                                                  : 'rgb(145 144 144)'
                                              }
                                            />
                                          </span>
                                        </a>
                                      </span>
                                    </span>
                                    {/* <span>전체 캠페인 {campaignResponseData.totalCount}개</span> */}
                                    <span>전체 캠페인 1개</span>
                                  </Cell>
                                  <Cell className={styles2.inner_tbl}></Cell>
                                  <Cell className={styles2.inner_tbl}></Cell>
                                  {myIndicatorItems.map((myIndicatorItem: HeaderColumnsType, idx: number) => {
                                    if (myIndicatorItem.columnIndex === 'cost') {
                                      return <Cell className={styles2.inner_tbl} key={idx}></Cell>;
                                    } else if (myIndicatorItem.columnIndex === 'impression') {
                                      return <Cell className={styles2.inner_tbl} key={idx}></Cell>;
                                    } else if (myIndicatorItem.columnIndex === 'click') {
                                      return <Cell className={styles2.inner_tbl} key={idx}></Cell>;
                                    } else if (myIndicatorItem.columnIndex === 'ctr') {
                                      return <Cell className={styles2.inner_tbl} key={idx}></Cell>;
                                    } else if (myIndicatorItem.columnIndex === 'reach') {
                                      return <Cell className={styles2.inner_tbl} key={idx}></Cell>;
                                    } else if (myIndicatorItem.columnIndex === 'videoPlay3Seconds') {
                                      return <Cell className={styles2.inner_tbl} key={idx}></Cell>;
                                    } else if (myIndicatorItem.columnIndex === 'cpm') {
                                      return <Cell className={styles2.inner_tbl} key={idx}></Cell>;
                                    } else if (myIndicatorItem.columnIndex === 'cpc') {
                                      return <Cell className={styles2.inner_tbl} key={idx}></Cell>;
                                    } else if (myIndicatorItem.columnIndex === 'reachRate') {
                                      return <Cell className={styles2.inner_tbl} key={idx}></Cell>;
                                    } else if (myIndicatorItem.columnIndex === 'videoPlayRate') {
                                      return <Cell className={styles2.inner_tbl} key={idx}></Cell>;
                                    } else if (myIndicatorItem.columnIndex === 'signUpDay1') {
                                      return <Cell className={styles2.inner_tbl} key={idx}></Cell>;
                                    } else if (myIndicatorItem.columnIndex === 'viewCartDay1') {
                                      return <Cell className={styles2.inner_tbl} key={idx}></Cell>;
                                    } else if (myIndicatorItem.columnIndex === 'purchaseDay1') {
                                      return <Cell className={styles2.inner_tbl} key={idx}></Cell>;
                                    } else if (myIndicatorItem.columnIndex === 'signUpDay7') {
                                      return <Cell className={styles2.inner_tbl} key={idx}></Cell>;
                                    } else if (myIndicatorItem.columnIndex === 'viewCartDay7') {
                                      return <Cell className={styles2.inner_tbl} key={idx}></Cell>;
                                    } else if (myIndicatorItem.columnIndex === 'purchaseDay7') {
                                      return <Cell className={styles2.inner_tbl} key={idx}></Cell>;
                                    } else if (myIndicatorItem.columnIndex === 'videoAutoPlay') {
                                      return <Cell className={styles2.inner_tbl} key={idx}></Cell>;
                                    } else if (myIndicatorItem.columnIndex === 'videoTouches') {
                                      return <Cell className={styles2.inner_tbl} key={idx}></Cell>;
                                    } else if (myIndicatorItem.columnIndex === 'videoUnmute') {
                                      return <Cell className={styles2.inner_tbl} key={idx}></Cell>;
                                    } else if (myIndicatorItem.columnIndex === 'videoPlay5Seconds') {
                                      return <Cell className={styles2.inner_tbl} key={idx}></Cell>;
                                    } else if (myIndicatorItem.columnIndex === 'videoPlay10Seconds') {
                                      return <Cell className={styles2.inner_tbl} key={idx}></Cell>;
                                    } else if (myIndicatorItem.columnIndex === 'videoPlay15Seconds') {
                                      return <Cell className={styles2.inner_tbl} key={idx}></Cell>;
                                    } else if (myIndicatorItem.columnIndex === 'videoPlay30Seconds') {
                                      return <Cell className={styles2.inner_tbl} key={idx}></Cell>;
                                    } else if (myIndicatorItem.columnIndex === 'videoPlay60Seconds') {
                                      return <Cell className={styles2.inner_tbl} key={idx}></Cell>;
                                    } else if (myIndicatorItem.columnIndex === 'videoPlay25Percent') {
                                      return <Cell className={styles2.inner_tbl} key={idx}></Cell>;
                                    } else if (myIndicatorItem.columnIndex === 'videoPlay50Percent') {
                                      return <Cell className={styles2.inner_tbl} key={idx}></Cell>;
                                    } else if (myIndicatorItem.columnIndex === 'videoPlay75Percent') {
                                      return <Cell className={styles2.inner_tbl} key={idx}></Cell>;
                                    } else if (myIndicatorItem.columnIndex === 'videoPlay100Percent') {
                                      return <Cell className={styles2.inner_tbl} key={idx}></Cell>;
                                    }
                                  })}
                                  <Cell className={styles2.inner_tbl}></Cell>
                                </Row>
                              );
                            }
                          }
                        })}

                        {tableList.map((item: any, idx: number) => {
                          if (table == 'campaign' || table == undefined) {
                            let adTypeAndGoalArr: string[] = [];
                            adTypeAndGoalArr = adFnc.adTypeAndGoalFnc(
                              item.adTypeAndGoal.adTypeName,
                              item.adTypeAndGoal.adGoalName,
                            );
                            return (
                              <React.Fragment key={idx}>
                                <CampaignTable
                                  item={item}
                                  checkItems={checkItems}
                                  setCheckItems={setCheckItems}
                                  checkFnc={checkFnc}
                                  hoverState={hoverState}
                                  setHoverState={setHoverState}
                                  adTypeAndGoalArr={adTypeAndGoalArr}
                                  myIndicatorItems={
                                    sessionStorage.getItem('myIndicatorItems') !== null
                                      ? JSON.parse(sessionStorage.getItem('myIndicatorItems') ?? '')
                                      : indicatorItems
                                  }
                                />
                              </React.Fragment>
                            );
                          }
                        })}
                      </Body>
                    </>
                  )}
                </Table>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashBoardTable;

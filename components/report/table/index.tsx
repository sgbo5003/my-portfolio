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
import { HiMinusSm, HiPlusSm } from 'react-icons/hi';
import { useTheme } from '@table-library/react-table-library/theme';
import { getTheme } from '@table-library/react-table-library/baseline';
import { Dispatch, SetStateAction } from 'react';
import * as adFnc from '../../../utils/adFunction';
import { InitialFormValueProps } from '../../../pages/report';
import { HeaderColumnsType } from '../items/CustomReportItems';

export interface CustomReportAdAccountSearchResponse {
  id: number;
  adAccountId: number;
  adAccountName: string;
  adTypeAndGoal: null;
  campaignId: null;
  campaignName: null;
  campaignUserConfig: null;
  campaignType: null;
  adGroupId: null;
  adGroupName: null;
  adGroupUserConfig: null;
  creativeId: null;
  creativeName: null;
  creativeUserConfig: null;
  representativeId: null;
  startDate: number;
  endDate: number;
  report: {
    cost: number;
    impression: number;
    click: number;
    reach: number;
    videoAutoPlay: number;
    videoTouches: number;
    videoUnmute: number;
    videoPlay3Seconds: number;
    videoPlay5Seconds: number;
    videoPlay10Seconds: number;
    videoPlay15Seconds: number;
    videoPlay30Seconds: number;
    videoPlay60Seconds: number;
    videoPlay25Percent: number;
    videoPlay50Percent: number;
    videoPlay75Percent: number;
    videoPlay100Percent: number;
    signUpDay1: number;
    signUpDay7: number;
    purchaseDay1: number;
    purchaseDay7: number;
    viewCartDay1: number;
    viewCartDay7: number;
    ctr: number;
    cpm: number;
    cpc: number;
    reachRate: number;
    videoPlayRate: number;
  };
}

const CustomReportTable = (props: {
  values: InitialFormValueProps;
  headerColumns: HeaderColumnsType[];
  gridTamplateColumns: string;
  customReportTableData: { nodes: any[] };
  setCustomReportTableData: Dispatch<
    SetStateAction<{
      nodes: CustomReportAdAccountSearchResponse[];
    }>
  >;
  getCustomReportAdAccountDailySearch: (item: TableNode, idx: number) => Promise<void>;
}) => {
  const {
    values,
    headerColumns,
    gridTamplateColumns,
    customReportTableData,
    setCustomReportTableData,
    getCustomReportAdAccountDailySearch,
  } = props;
  const theme = useTheme([
    getTheme(),
    {
      HeaderCell: `
        background-color: #f5f5f5 !important;
      `,
      Table: `
        --data-table-library_grid-template-columns: ${gridTamplateColumns} !important;
      `,
      Row: `
        cursor: pointer;
        &:hover {
          td {
            background-color: #edeff1;
          }
        }
      `,
    },
  ]);

  const depthButtonClick = (item: TableNode, idx: number) => {
    if (item.depthActive === false) {
      getCustomReportAdAccountDailySearch(item, idx);
    } else {
      let newArr = JSON.parse(JSON.stringify([...customReportTableData.nodes]));
      newArr.map((newArrItem: any, newArrIdx: number) => {
        if (idx === newArrIdx) {
          return (newArrItem.depthActive = !newArrItem.depthActive);
        }
      });
      newArr = newArr.filter((el: any) => !(el.id === item.id && el.depth === 2));
      setCustomReportTableData({ nodes: newArr });
    }
  };

  return (
    <div className="table_wrap">
      <Table data={customReportTableData ?? []} theme={theme}>
        {(tableList: any) => (
          <>
            <Header>
              <HeaderRow className="border_bottom">
                {headerColumns.map((headerColumn, idx) => (
                  <HeaderCell className="inner_tbl" key={idx}>
                    {headerColumn.columnName}
                  </HeaderCell>
                ))}
              </HeaderRow>
            </Header>
            <Body>
              {tableList.map((item: any, idx: number) => {
                if (values.categorySelectVal.value === 'AD_ACCOUNT') {
                  if (item.depth === 2) {
                    return (
                      <Row key={idx} item={item}>
                        <Cell className="inner_tbl">{item.startDate + ' ~ ' + item.endDate}</Cell>
                        <Cell className="inner_tbl text-align-r">{item.report.impression.toLocaleString()}</Cell>
                        <Cell className="inner_tbl text-align-r">{item.report.click.toLocaleString()}</Cell>
                        <Cell className="inner_tbl text-align-r">{item.report.ctr}%</Cell>
                        <Cell className="inner_tbl text-align-r">{item.report.cost.toLocaleString()}</Cell>
                      </Row>
                    );
                  } else {
                    return (
                      <Row key={idx} item={item}>
                        <Cell className="inner_tbl">
                          <a
                            className="link_depthitem"
                            onClick={() => {
                              depthButtonClick(item, idx);
                            }}
                          >
                            {item.startDate + ' ~ ' + item.endDate}
                            <span className="ico_depth">
                              {item.depthActive === false ? (
                                <HiPlusSm size={20} className="m-b-3" />
                              ) : (
                                <HiMinusSm size={20} className="m-b-3" />
                              )}
                            </span>
                          </a>
                        </Cell>
                        <Cell className="inner_tbl text-align-r">{item.report.impression.toLocaleString()}</Cell>
                        <Cell className="inner_tbl text-align-r">{item.report.click.toLocaleString()}</Cell>
                        <Cell className="inner_tbl text-align-r">{item.report.ctr}%</Cell>
                        <Cell className="inner_tbl text-align-r">{item.report.cost.toLocaleString()}</Cell>
                      </Row>
                    );
                  }
                } else if (values.categorySelectVal.value === 'CAMPAIGN') {
                  if (item.depth === 2) {
                    return (
                      <Row key={idx} item={item}>
                        <Cell className="inner_tbl">-</Cell>
                        <Cell className="inner_tbl">-</Cell>
                        <Cell className="inner_tbl">{item.startDate + ' ~ ' + item.endDate}</Cell>
                        {values.indicatorCheckVal.includes('costIndicator') === true && (
                          <Cell className="inner_tbl text-align-r">{item.report.cost.toLocaleString()}</Cell>
                        )}
                        {values.indicatorCheckVal.includes('defaultIndicator') === true && (
                          <>
                            <Cell className="inner_tbl text-align-r">{item.report.impression.toLocaleString()}</Cell>
                            <Cell className="inner_tbl text-align-r">{item.report.click.toLocaleString()}</Cell>
                            <Cell className="inner_tbl text-align-r">{item.report.ctr}%</Cell>
                            <Cell className="inner_tbl text-align-r">{item.report.cpm.toLocaleString()}</Cell>
                            <Cell className="inner_tbl text-align-r">{item.report.cpc.toLocaleString()}</Cell>
                          </>
                        )}
                      </Row>
                    );
                  } else {
                    return (
                      <Row key={idx} item={item}>
                        <Cell className="inner_tbl">
                          {item.adTypeAndGoal !== null
                            ? adFnc.adTypeAndGoalFnc(
                                item.adTypeAndGoal.adTypeName,
                                item.adTypeAndGoal.adGoalName,
                              )[0] === '디스플레이'
                              ? '디스플레이'
                              : adFnc.adTypeAndGoalFnc(
                                  item.adTypeAndGoal.adTypeName,
                                  item.adTypeAndGoal.adGoalName,
                                )[0] === '동영상'
                              ? '동영상'
                              : ''
                            : null}
                        </Cell>
                        <Cell className="inner_tbl">{item.campaignName}</Cell>
                        <Cell className="inner_tbl">
                          <a
                            className="link_depthitem"
                            onClick={() => {
                              depthButtonClick(item, idx);
                            }}
                          >
                            {item.startDate + ' ~ ' + item.endDate}
                            <span className="ico_depth">
                              {item.depthActive === false ? (
                                <HiPlusSm size={20} className="m-b-3" />
                              ) : (
                                <HiMinusSm size={20} className="m-b-3" />
                              )}
                            </span>
                          </a>
                        </Cell>
                        {values.indicatorCheckVal.includes('costIndicator') === true && (
                          <Cell className="inner_tbl text-align-r">{item.report.cost.toLocaleString()}</Cell>
                        )}
                        {values.indicatorCheckVal.includes('defaultIndicator') === true && (
                          <>
                            <Cell className="inner_tbl text-align-r">{item.report.impression.toLocaleString()}</Cell>
                            <Cell className="inner_tbl text-align-r">{item.report.click.toLocaleString()}</Cell>
                            <Cell className="inner_tbl text-align-r">{item.report.ctr}%</Cell>
                            <Cell className="inner_tbl text-align-r">{item.report.cpm.toLocaleString()}</Cell>
                            <Cell className="inner_tbl text-align-r">{item.report.cpc.toLocaleString()}</Cell>
                          </>
                        )}
                      </Row>
                    );
                  }
                } else if (values.categorySelectVal.value === 'AD_GROUP') {
                  if (item.depth === 2) {
                    return (
                      <Row key={idx} item={item}>
                        <Cell className="inner_tbl">-</Cell>
                        <Cell className="inner_tbl">-</Cell>
                        <Cell className="inner_tbl">-</Cell>
                        <Cell className="inner_tbl">{item.startDate + ' ~ ' + item.endDate}</Cell>
                        {values.indicatorCheckVal.includes('costIndicator') === true && (
                          <Cell className="inner_tbl text-align-r">{item.report.cost.toLocaleString()}</Cell>
                        )}
                        {values.indicatorCheckVal.includes('defaultIndicator') === true && (
                          <>
                            <Cell className="inner_tbl text-align-r">{item.report.impression.toLocaleString()}</Cell>
                            <Cell className="inner_tbl text-align-r">{item.report.click.toLocaleString()}</Cell>
                            <Cell className="inner_tbl text-align-r">{item.report.ctr}%</Cell>
                            <Cell className="inner_tbl text-align-r">{item.report.cpm.toLocaleString()}</Cell>
                            <Cell className="inner_tbl text-align-r">{item.report.cpc.toLocaleString()}</Cell>
                          </>
                        )}
                      </Row>
                    );
                  } else {
                    return (
                      <Row key={idx} item={item}>
                        <Cell className="inner_tbl">
                          {item.adTypeAndGoal !== null
                            ? adFnc.adTypeAndGoalFnc(
                                item.adTypeAndGoal.adTypeName,
                                item.adTypeAndGoal.adGoalName,
                              )[0] === '디스플레이'
                              ? '디스플레이'
                              : adFnc.adTypeAndGoalFnc(
                                  item.adTypeAndGoal.adTypeName,
                                  item.adTypeAndGoal.adGoalName,
                                )[0] === '동영상'
                              ? '동영상'
                              : ''
                            : null}
                        </Cell>
                        <Cell className="inner_tbl">{item.campaignName}</Cell>
                        <Cell className="inner_tbl">{item.adGroupName}</Cell>
                        <Cell className="inner_tbl">
                          <a
                            className="link_depthitem"
                            onClick={() => {
                              depthButtonClick(item, idx);
                            }}
                          >
                            {item.startDate + ' ~ ' + item.endDate}
                            <span className="ico_depth">
                              {item.depthActive === false ? (
                                <HiPlusSm size={20} className="m-b-3" />
                              ) : (
                                <HiMinusSm size={20} className="m-b-3" />
                              )}
                            </span>
                          </a>
                        </Cell>
                        {values.indicatorCheckVal.includes('costIndicator') === true && (
                          <Cell className="inner_tbl text-align-r">{item.report.cost.toLocaleString()}</Cell>
                        )}
                        {values.indicatorCheckVal.includes('defaultIndicator') === true && (
                          <>
                            <Cell className="inner_tbl text-align-r">{item.report.impression.toLocaleString()}</Cell>
                            <Cell className="inner_tbl text-align-r">{item.report.click.toLocaleString()}</Cell>
                            <Cell className="inner_tbl text-align-r">{item.report.ctr}%</Cell>
                            <Cell className="inner_tbl text-align-r">{item.report.cpm.toLocaleString()}</Cell>
                            <Cell className="inner_tbl text-align-r">{item.report.cpc.toLocaleString()}</Cell>
                          </>
                        )}
                      </Row>
                    );
                  }
                } else {
                  if (item.depth === 2) {
                    return (
                      <Row key={idx} item={item}>
                        <Cell className="inner_tbl">-</Cell>
                        <Cell className="inner_tbl">-</Cell>
                        <Cell className="inner_tbl">-</Cell>
                        <Cell className="inner_tbl">-</Cell>
                        <Cell className="inner_tbl">{item.startDate + ' ~ ' + item.endDate}</Cell>
                        {values.indicatorCheckVal.includes('costIndicator') === true && (
                          <Cell className="inner_tbl text-align-r">{item.report.cost.toLocaleString()}</Cell>
                        )}
                        {values.indicatorCheckVal.includes('defaultIndicator') === true && (
                          <>
                            <Cell className="inner_tbl text-align-r">{item.report.impression.toLocaleString()}</Cell>
                            <Cell className="inner_tbl text-align-r">{item.report.click.toLocaleString()}</Cell>
                            <Cell className="inner_tbl text-align-r">{item.report.ctr}%</Cell>
                            <Cell className="inner_tbl text-align-r">{item.report.cpm.toLocaleString()}</Cell>
                            <Cell className="inner_tbl text-align-r">{item.report.cpc.toLocaleString()}</Cell>
                          </>
                        )}
                      </Row>
                    );
                  } else {
                    return (
                      <Row key={idx} item={item}>
                        <Cell className="inner_tbl">
                          {item.adTypeAndGoal !== null
                            ? adFnc.adTypeAndGoalFnc(
                                item.adTypeAndGoal.adTypeName,
                                item.adTypeAndGoal.adGoalName,
                              )[0] === '디스플레이'
                              ? '디스플레이'
                              : adFnc.adTypeAndGoalFnc(
                                  item.adTypeAndGoal.adTypeName,
                                  item.adTypeAndGoal.adGoalName,
                                )[0] === '동영상'
                              ? '동영상'
                              : ''
                            : null}
                        </Cell>
                        <Cell className="inner_tbl">{item.campaignName}</Cell>
                        <Cell className="inner_tbl">{item.adGroupName}</Cell>
                        <Cell className="inner_tbl">{item.creativeName}</Cell>
                        <Cell className="inner_tbl">
                          <a
                            className="link_depthitem"
                            onClick={() => {
                              depthButtonClick(item, idx);
                            }}
                          >
                            {item.startDate + ' ~ ' + item.endDate}
                            <span className="ico_depth">
                              {item.depthActive === false ? (
                                <HiPlusSm size={20} className="m-b-3" />
                              ) : (
                                <HiMinusSm size={20} className="m-b-3" />
                              )}
                            </span>
                          </a>
                        </Cell>
                        {values.indicatorCheckVal.includes('costIndicator') === true && (
                          <Cell className="inner_tbl text-align-r">{item.report.cost.toLocaleString()}</Cell>
                        )}
                        {values.indicatorCheckVal.includes('defaultIndicator') === true && (
                          <>
                            <Cell className="inner_tbl text-align-r">{item.report.impression.toLocaleString()}</Cell>
                            <Cell className="inner_tbl text-align-r">{item.report.click.toLocaleString()}</Cell>
                            <Cell className="inner_tbl text-align-r">{item.report.ctr}%</Cell>
                            <Cell className="inner_tbl text-align-r">{item.report.cpm.toLocaleString()}</Cell>
                            <Cell className="inner_tbl text-align-r">{item.report.cpc.toLocaleString()}</Cell>
                          </>
                        )}
                      </Row>
                    );
                  }
                }
              })}
            </Body>
          </>
        )}
      </Table>
    </div>
  );
};

export default CustomReportTable;

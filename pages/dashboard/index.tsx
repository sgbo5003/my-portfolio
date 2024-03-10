import Filter from '../../components/adFilter';
import Modal from '../../components/modal';
import { useState } from 'react';
import UserTableColumnSettingComponent from '../../components/userTableColumnSetting';
import { indicatorItems } from '../../components/dashboard/items/IndicatorItems';
import css from 'styled-jsx/css';
import DashBoardTable from '../../components/dashboard/table';
import * as fnc from '../../utils/commonFunction';
import { subDays } from 'date-fns';
import { useRouter } from 'next/router';
import DashboardInfoAndGraph from '../../components/dashboard/infoAndGraph';
import { MdArrowDropDown } from 'react-icons/md';

const style = css`
  button {
    height: 36px;
  }
`;

const nodes: any[] = [
  {
    id: 7,
    adTypeAndGoal: {
      adTypeName: 'DISPLAY',
      adGoalName: 'VISITING',
    },
    name: '디스플레이_202301191535',
    dailyBudgetAmount: 0,
    budgetAmount: 1600000,
    startDate: 20230119,
    endDate: 20230131,
    houseOperate: 'N',
    config: 'ON',
    systemConfig: 'ON',
    status: 'LIVE',
    createdAt: '2023-01-19T15:36:07',
    updatedAt: '2023-01-19T15:36:08',
    report: {
      cost: 520000,
      impression: 466970,
      click: 2600,
      reach: 0,
      videoAutoPlay: 0,
      videoTouches: 0,
      videoUnmute: 0,
      videoPlay3Seconds: 0,
      videoPlay5Seconds: 0,
      videoPlay10Seconds: 0,
      videoPlay15Seconds: 0,
      videoPlay30Seconds: 0,
      videoPlay60Seconds: 0,
      videoPlay25Percent: 0,
      videoPlay50Percent: 0,
      videoPlay75Percent: 0,
      videoPlay100Percent: 0,
      signUpDay1: 0,
      signUpDay7: 0,
      purchaseDay1: 0,
      purchaseDay7: 0,
      viewCartDay1: 0,
      viewCartDay7: 0,
      ctr: 0.56,
      cpm: 1114,
      cpc: 200,
      reachRate: 0,
      videoPlayRate: 0,
    },
  },
];

const chartData = [
  {
    reportDate: 20230119,
    report: {
      cost: 100000,
      impression: 100000,
      click: 1000,
      reach: 0,
      videoAutoPlay: 0,
      videoTouches: 0,
      videoUnmute: 0,
      videoPlay3Seconds: 0,
      videoPlay5Seconds: 0,
      videoPlay10Seconds: 0,
      videoPlay15Seconds: 0,
      videoPlay30Seconds: 0,
      videoPlay60Seconds: 0,
      videoPlay25Percent: 0,
      videoPlay50Percent: 0,
      videoPlay75Percent: 0,
      videoPlay100Percent: 0,
      signUpDay1: 0,
      signUpDay7: 0,
      purchaseDay1: 0,
      purchaseDay7: 0,
      viewCartDay1: 0,
      viewCartDay7: 0,
      ctr: 0,
      cpm: 123,
      cpc: 22062,
      reachRate: 0,
      videoPlayRate: 0,
    },
  },
  {
    reportDate: 20230120,
    report: {
      cost: 200000,
      impression: 150000,
      click: 2000,
      reach: 0,
      videoAutoPlay: 0,
      videoTouches: 0,
      videoUnmute: 0,
      videoPlay3Seconds: 0,
      videoPlay5Seconds: 0,
      videoPlay10Seconds: 0,
      videoPlay15Seconds: 0,
      videoPlay30Seconds: 0,
      videoPlay60Seconds: 0,
      videoPlay25Percent: 0,
      videoPlay50Percent: 0,
      videoPlay75Percent: 0,
      videoPlay100Percent: 0,
      signUpDay1: 0,
      signUpDay7: 0,
      purchaseDay1: 0,
      purchaseDay7: 0,
      viewCartDay1: 0,
      viewCartDay7: 0,
      ctr: 0,
      cpm: 123,
      cpc: 22062,
      reachRate: 0,
      videoPlayRate: 0,
    },
  },
  {
    reportDate: 20230121,
    report: {
      cost: 300000,
      impression: 200000,
      click: 3000,
      reach: 0,
      videoAutoPlay: 0,
      videoTouches: 0,
      videoUnmute: 0,
      videoPlay3Seconds: 0,
      videoPlay5Seconds: 0,
      videoPlay10Seconds: 0,
      videoPlay15Seconds: 0,
      videoPlay30Seconds: 0,
      videoPlay60Seconds: 0,
      videoPlay25Percent: 0,
      videoPlay50Percent: 0,
      videoPlay75Percent: 0,
      videoPlay100Percent: 0,
      signUpDay1: 0,
      signUpDay7: 0,
      purchaseDay1: 0,
      purchaseDay7: 0,
      viewCartDay1: 0,
      viewCartDay7: 0,
      ctr: 0,
      cpm: 123,
      cpc: 22062,
      reachRate: 0,
      videoPlayRate: 0,
    },
  },
];

const initData = {
  content: [],
  isFirst: true,
  totalPage: 0,
  currentCount: 0,
  currentPage: 1,
  hasNext: false,
  isEmpty: true,
  isLast: true,
  sort: {
    sorted: false,
    empty: true,
    unsorted: true,
  },
  totalCount: 0,
};

const DashboardPage = () => {
  const router = useRouter();
  const [userSettingColumnModalOn, setUserSettingColumnModalOn] = useState<boolean>(false); // 열 설정 모달 display
  const [checkItems, setCheckItems] = useState<{ tableType: string; id: string }[]>([]);
  const [campiagnData, setCampaignData] = useState({ nodes });
  const [pageSize, setPageSize] = useState(10);
  const [reportDate, setReportDate] = useState<Array<{ startDate: string; endDate: string }>>([
    { startDate: fnc.dateAsYYYYMMDD(subDays(new Date(), 7)), endDate: fnc.dateAsYYYYMMDD(new Date()) },
  ]);
  const [sort, setSort] = useState<string>('');
  const [opt1Select, setOpt1Select] = useState<string>('cost');
  const [opt2Select, setOpt2Select] = useState<string>('click');
  const { table, page, filter, summary } = router.query;
  // const [chartData, setChartData] = useState<ChartResponse[]>([]);
  const [loading2, setLoading2] = useState(false);

  const groupColumnItems: Array<groupColumnObj> = [
    { column_group_name: '비용 지표', column_group_no: 1 },
    { column_group_name: '기본 지표', column_group_no: 2 },
    // { column_group_name: 'SDK 전환 지표', column_group_no: 3 },
    // { column_group_name: '동영상 지표', column_group_no: 4 },
  ];

  const indicatorGroupNameToCommasStr = () => {
    let indicator = '';
    const myIndicatorItemsArr = JSON.parse(sessionStorage.getItem('myIndicatorItems') ?? '');
    groupColumnItems.map((groupColumnItem) => {
      myIndicatorItemsArr.map((myIndicatorItem: HeaderColumnsType) => {
        if (myIndicatorItem.columnGroupNum === groupColumnItem.column_group_no) {
          if (indicator.includes(groupColumnItem.column_group_name)) {
            return;
          }
          return (indicator = indicator + groupColumnItem.column_group_name + ', ');
        }
      });
    });
    return indicator.slice(0, -2);
  };

  return (
    <div>
      <div id="adboardbox_wrap" className="adboardbox_wrap1">
        <div id="DashboardHeader" className="adboardbox_search">
          <Filter />
        </div>
        {summary !== undefined &&
          (summary === 'ad_account' ||
            summary?.includes('campaign') ||
            summary?.includes('ad_group') ||
            summary?.includes('creative')) && (
            <DashboardInfoAndGraph
              opt1Select={opt1Select}
              setOpt1Select={setOpt1Select}
              opt2Select={opt2Select}
              setOpt2Select={setOpt2Select}
              chartData={chartData}
            />
          )}
        <div className="set_table m-t-15" style={{ marginBottom: '30px' }}>
          <strong className="screen_out">캠페인 탭 내용</strong>
          <div className="set_head">
            <div className="f-right">
              <div className="single_wrap">
                <div className="opt_select">
                  <a className="link_selected" onClick={() => setUserSettingColumnModalOn(true)}>
                    열:{' '}
                    {typeof window !== 'undefined' && sessionStorage.getItem('myIndicatorItems') !== null
                      ? indicatorGroupNameToCommasStr()
                      : `비용 지표, 기본 지표`}
                  </a>
                  <span>
                    <MdArrowDropDown className="ico_arr" />
                  </span>
                </div>
              </div>
            </div>
          </div>
          <DashBoardTable
            checkItems={checkItems}
            setCheckItems={setCheckItems}
            campiagnData={campiagnData}
            nodes={nodes}
            pageSize={pageSize}
            reportDate={reportDate}
            sort={sort}
            setSort={setSort}
            indicatorItems={indicatorItems}
          />
        </div>
        <style jsx>{style}</style>
        <Modal
          isOpen={userSettingColumnModalOn}
          setIsOpen={setUserSettingColumnModalOn}
          headerBorderBottom={true}
          headerTitle={'열 맞춤 설정'}
          height={'780'}
          width={'780'}
          bodyTextAlign={'start'}
        >
          <UserTableColumnSettingComponent
            setUserSettingColumnModalOn={setUserSettingColumnModalOn}
            indicatorItems={indicatorItems}
          />
        </Modal>
      </div>
    </div>
  );
};

export default DashboardPage;

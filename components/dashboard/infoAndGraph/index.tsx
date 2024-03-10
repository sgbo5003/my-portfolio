import { useRouter } from 'next/router';
import { MdClose, MdKeyboardArrowRight } from 'react-icons/md';
import styles from '../../../pages/dashboard/DashboardPage.module.scss';
import { useState, useRef, useEffect, Dispatch, SetStateAction } from 'react';
import { ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, AreaChart, Area } from 'recharts';
import * as fnc from '../../../utils/commonFunction';
import ReactLoading from 'react-loading';

interface ChartResponse {
  reportDate: number;
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

const chartSelectOptions = [
  {
    groupName: '비용 지표',
    columnItems: [{ columnName: '비용 지표', depth1Items: [{ depth1Name: '비용', depthIndex: 'cost' }] }],
  },
  {
    groupName: '실적 지표',
    columnItems: [
      {
        columnName: '기본 지표',
        depth1Items: [
          { depth1Name: '노출수', depthIndex: 'impression' },
          { depth1Name: '클릭수', depthIndex: 'click' },
          { depth1Name: '클릭률', depthIndex: 'ctr' },
          { depth1Name: '노출당 비용', depthIndex: 'cpm' },
          { depth1Name: '클릭당 비용', depthIndex: 'cpc' },
        ],
      },
    ],
  },
];

const TooltipComponent = ({ active, payload, label }: any) => {
  // console.log('active', active);
  // console.log('payload', payload);
  // console.log('label', label);
  if (active && payload && payload.length) {
    return (
      <div className="graph_tooltip">
        <strong className="tit_date">{fnc.dateNumberToString(label)}</strong>
        <dl className="detail_graphinfo graph_info1">
          <dt>
            {payload[0].name.includes('cost') === true
              ? '비용'
              : payload[0].name.includes('impression') === true
              ? '노출수'
              : payload[0].name.includes('click') === true
              ? '클릭'
              : payload[0].name.includes('ctr') === true
              ? 'ctr'
              : payload[0].name.includes('cpm') === true
              ? 'cpm'
              : payload[0].name.includes('cpc') === true
              ? 'cpc'
              : ''}{' '}
            :&nbsp;
          </dt>
          <dd>{payload[0].value.toLocaleString()}</dd>
        </dl>
        <dl className="detail_graphinfo graph_info2">
          <dt>
            {payload[1].name.includes('cost') === true
              ? '비용'
              : payload[1].name.includes('impression') === true
              ? '노출수'
              : payload[1].name.includes('click') === true
              ? '클릭'
              : payload[1].name.includes('ctr') === true
              ? 'ctr'
              : payload[1].name.includes('cpm') === true
              ? 'cpm'
              : payload[1].name.includes('cpc') === true
              ? 'cpc'
              : ''}{' '}
            :&nbsp;
          </dt>
          <dd>{payload[1].value.toLocaleString()}</dd>
        </dl>
      </div>
    );
  }

  return null;
};

const DashboardInfoAndGraph = (props: {
  opt1Select: string;
  setOpt1Select: Dispatch<SetStateAction<string>>;
  opt2Select: string;
  setOpt2Select: Dispatch<SetStateAction<string>>;
  chartData: ChartResponse[];
}) => {
  const { opt1Select, setOpt1Select, opt2Select, setOpt2Select, chartData } = props;
  const router = useRouter();
  const { summary } = router.query;
  const [showInfo, setShowInfo] = useState<boolean>(true);
  const [showGraph, setShowGraph] = useState<boolean>(true);
  const [showOpt1Select, setShowOpt1Select] = useState<boolean>(false);
  const [showOpt2Select, setShowOpt2Select] = useState<boolean>(false);
  const opt1SelectRef = useRef<HTMLDivElement>(null);
  const opt2SelectRef = useRef<HTMLDivElement>(null);
  const selectedAdAccount: { id: string; name: string } = JSON.parse(
    sessionStorage.getItem('selectedAdAccount') ?? JSON.stringify({ id: '', name: '' }),
  );
  const loading = useState<boolean>(true);
  // const formatXAxis = (tickItem: string) => `${tickItem}시`;
  const formatXAxis = (tickItem: string) => {
    let resultStr = '';
    resultStr = tickItem.toString().substring(4, 8);
    resultStr = resultStr.replace(/(.{2})/g, '$1-').slice(0, -1);
    return resultStr;
  };

  const formatYAxis = (tickItem: number) => {
    if (tickItem > 99999999) {
      return (tickItem / 10000000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '억';
    } else if (tickItem > 9999) {
      return (tickItem / 10000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '만';
    } else {
      return `${tickItem.toLocaleString()}`;
    }
  };

  const handleClickOutSide = (e: any) => {
    if (opt1SelectRef && !opt1SelectRef.current?.contains(e.target)) {
      setShowOpt1Select(false);
    }
    if (opt2SelectRef && !opt2SelectRef.current?.contains(e.target)) {
      setShowOpt2Select(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutSide);
    return () => {
      document.removeEventListener('mousedown', handleClickOutSide);
    };
  });

  return (
    <div className="adboardbox_top">
      <div className="boardbox_tit">
        <strong className="tit_box">
          {summary?.includes('campaign') === true &&
          (String(summary).split('~')[1] === '' || String(summary).split('~')[1] == undefined)
            ? '전체 캠페인'
            : summary?.includes('ad_group') === true &&
              (String(summary).split('~')[1] === '' || String(summary).split('~')[1] == undefined)
            ? '전체 광고그룹'
            : summary?.includes('creative') === true &&
              (String(summary).split('~')[1] === '' || String(summary).split('~')[1] == undefined)
            ? '전체 소재'
            : summary?.includes('campaign') === true && String(summary).split('~')[1] !== ''
            ? `[캠페인] 디스플레이_202301191535`
            : summary?.includes('ad_group') === true && String(summary).split('~')[1] !== ''
            ? `[광고그룹] 광고그룹명`
            : summary?.includes('creative') === true && String(summary).split('~')[1] !== ''
            ? `[소재] 소재명`
            : `[광고계정] ${selectedAdAccount.name}`}
        </strong>
        <div className="titcheck_box">
          <span className="box_checkinp">
            <input
              type="checkbox"
              name="check|showInfo"
              id="check|showInfo"
              className="inp_check"
              checked={showInfo}
              onChange={(e) => {
                if (showGraph) {
                  setShowInfo(e.target.checked);
                }
              }}
            />
            <label htmlFor="check|showInfo" className="lab_check">
              정보 보기
            </label>
          </span>
          <span className="box_checkinp">
            <input
              type="checkbox"
              name="check|showGraph"
              id="check|showGraph"
              className="inp_check"
              checked={showGraph}
              onChange={(e) => {
                if (showInfo) {
                  setShowGraph(e.target.checked);
                }
              }}
            />
            <label htmlFor="check|showGraph" className="lab_check">
              차트 보기
            </label>
          </span>
        </div>
      </div>
      {showInfo && (
        <div className="boardbox_card card_info">
          {/* <div className={styles.item_infosum + ' ' + styles.infosum_price}>
            <strong className={styles.tit_g}>비용</strong>
            <ul className={styles.list_infosum}>
              <li>
                <span className={styles.subtit_g}>
                  잔액
                  <a className={styles.btn_more}>
                    <span className="ico_comm">
                      <MdKeyboardArrowRight size={16} />
                    </span>
                  </a>
                </span>
                <p className={styles.desc_g}>0원</p>
              </li>
              <li>
                <span className={styles.subtit_g}>
                  미결제 금액
                  <a className={styles.btn_more}>
                    <span className="ico_comm">
                      <MdKeyboardArrowRight size={16} />
                    </span>
                  </a>
                </span>
                <p className={styles.desc_g}>0원</p>
              </li>
              <li>
                <span className={styles.subtit_g}>
                  이번 달 총 소진 비용
                  <a className="link_g">
                    <BiHelpCircle size={15} color="rgb(218 218 218)" />
                  </a>
                </span>
                <p className={styles.desc_g}>0원</p>
              </li>
            </ul>
          </div> */}
          <>
            {(summary?.includes('campaign') === true &&
              (String(summary).split('~')[1] === '' || String(summary).split('~')[1] == undefined)) ||
            (summary?.includes('ad_group') === true &&
              (String(summary).split('~')[1] === '' || String(summary).split('~')[1] == undefined)) ||
            (summary?.includes('creative') === true &&
              (String(summary).split('~')[1] === '' || String(summary).split('~')[1] == undefined)) ? (
              <div className="item_infosum infosum_price">
                {/* <strong className={styles.tit_g}>비용</strong>
                  <ul className={styles.list_infosum}>
                    <li>
                      <span className={styles.subtit_g}>오늘 소진 비용</span>
                      <p className={styles.desc_g}>{costOfToday.toLocaleString()}원</p>
                    </li>
                  </ul> */}
                <div className="h-40"></div>
              </div>
            ) : summary?.includes('campaign') === true && String(summary).split('~')[1] !== '' ? (
              <div className="item_infosum infosum_basic">
                <strong className="tit_g">기본</strong>
                <ul className="list_infosum">
                  <li>
                    <span className="subtit_g">ID</span>
                    <p className="desc_g">1</p>
                  </li>
                  <li>
                    <span className="subtit_g">유형</span>
                    <p className="desc_g">디스플레이</p>
                  </li>
                </ul>
              </div>
            ) : (
              <>
                {/* <div className={styles.item_infosum + ' ' + styles.infosum_basic}>
                    <strong className={styles.tit_g}>기본</strong>
                    <ul className={styles.list_infosum}>
                      <li>
                        <span className={styles.subtit_g}>ID</span>
                        <p className={styles.desc_g}>{myAdAccountInfo.id}</p>
                      </li>
                      <li>
                        <span className={styles.subtit_g}>광고주</span>
                        <p className={styles.desc_g}>{adAccountAdvertiserInfo.name}</p>
                      </li>
                    </ul>
                  </div> */}
                <div className="item_infosum infosum_manage">
                  <strong className="tit_g">운영</strong>
                  <ul className={styles.list_infosum}>
                    <li>
                      <span className={styles.subtit_g}>캠페인</span>
                      <p className={styles.desc_g}>1</p>
                    </li>
                    <li>
                      <span className={styles.subtit_g}>광고그룹</span>
                      <p className={styles.desc_g}>2</p>
                    </li>
                    <li>
                      <span className={styles.subtit_g}>소재</span>
                      <p className={styles.desc_g}>3</p>
                    </li>
                  </ul>
                </div>
              </>
            )}
          </>

          {/* <div className={styles.item_infosum + ' ' + styles.infosum_manage}>
            <strong className={styles.tit_g}>기타</strong>
            <ul className={styles.list_infosum}>
              <li>
                <span className={styles.subtit_g}>후심사 권한</span>
                <p className={styles.desc_g}>미설정</p>
              </li>
            </ul>
          </div> */}
        </div>
      )}
      {showGraph && (
        <div className={styles.boardbox_card + ' ' + styles.card_graph}>
          <div className={styles.detail_graph}>
            <div className={styles.boxcard_select}>
              <div
                className={styles.opt_select + ` opt_select ${showOpt1Select ? 'opt_open' : ''}`}
                ref={opt1SelectRef}
              >
                <a className={styles.link_selected + ' link_selected'} onClick={() => setShowOpt1Select(true)}>
                  <span className={styles.ico_on + ' ' + styles.on_b + ' ico_on on_b'}></span>
                  {chartSelectOptions.map((chartSelectOption: any) => {
                    let resultStr = '';
                    chartSelectOption.columnItems.map((columnItem: any) => {
                      columnItem.depth1Items.map((depth1Item: any) => {
                        if (depth1Item.depthIndex === opt1Select) {
                          return (resultStr = depth1Item.depth1Name);
                        }
                      });
                    });
                    return resultStr;
                  })}
                </a>
                <span className="ico_arr"></span>
                <div className={styles.opt_list + ' opt_list'}>
                  {chartSelectOptions.map((chartSelectOption: any, chartSelectOptionIdx: number) => (
                    <div className={styles.list_opt2 + ' list_opt2'} key={chartSelectOptionIdx}>
                      <strong className={styles.tit_option + ' tit_option'}>{chartSelectOption.groupName}</strong>
                      <ul className={styles.sub_listopt + ' ' + styles.list_opt + ' list_opt sub_listopt'}>
                        {chartSelectOption.columnItems.map((columnItem: any, columnItemIdx: number) => (
                          <li key={columnItemIdx}>
                            <a
                              className={
                                styles.link_option +
                                (columnItem.depth1Items.some((el: any) => el.depthIndex === opt1Select) === true
                                  ? ' ' + styles.on
                                  : '') +
                                ' link_option'
                              }
                            >
                              {columnItem.columnName}
                            </a>
                            <ul className={styles.sub_boxcard + ' ' + styles.sub_boxcard + ' list_opt sub_boxcard'}>
                              {columnItem.depth1Items.map((depth1Item: any, depth1ItemIdx: number) => (
                                <li
                                  key={depth1ItemIdx}
                                  className={opt2Select === depth1Item.depthIndex ? 'in_active' : ''}
                                >
                                  <a
                                    className={
                                      styles.link_option +
                                      (opt1Select === depth1Item.depthIndex ? ' ' + styles.on : '') +
                                      ' link_option'
                                    }
                                    onClick={() => {
                                      if (opt2Select === depth1Item.depthIndex) {
                                        return;
                                      }
                                      setOpt1Select(depth1Item.depthIndex);
                                      setShowOpt1Select(false);
                                    }}
                                  >
                                    {depth1Item.depth1Name}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
              <div
                className={styles.opt_select + ` opt_select ${showOpt2Select ? 'opt_open' : ''}`}
                ref={opt2SelectRef}
              >
                <a className={styles.link_selected + ' link_selected'} onClick={() => setShowOpt2Select(true)}>
                  <span className={styles.ico_on + ' ico_on'}></span>
                  {chartSelectOptions.map((chartSelectOption: any) => {
                    let resultStr = '';
                    chartSelectOption.columnItems.map((columnItem: any) => {
                      columnItem.depth1Items.map((depth1Item: any) => {
                        if (depth1Item.depthIndex === opt2Select) {
                          return (resultStr = depth1Item.depth1Name);
                        }
                      });
                    });
                    return resultStr;
                  })}
                </a>
                <span className="ico_arr"></span>
                <div className={styles.opt_list + ' opt_list'}>
                  {chartSelectOptions.map((chartSelectOption: any, chartSelectOptionIdx: number) => (
                    <div className={styles.list_opt2 + ' list_opt2'} key={chartSelectOptionIdx}>
                      <strong className={styles.tit_option + ' tit_option'}>{chartSelectOption.groupName}</strong>
                      <ul className={styles.sub_listopt + ' ' + styles.list_opt + ' list_opt sub_listopt'}>
                        {chartSelectOption.columnItems.map((columnItem: any, columnItemIdx: number) => (
                          <li key={columnItemIdx}>
                            <a
                              className={
                                styles.link_option +
                                (columnItem.depth1Items.some((el: any) => el.depthIndex === opt2Select) === true
                                  ? ' ' + styles.on
                                  : '') +
                                ' link_option'
                              }
                            >
                              {columnItem.columnName}
                            </a>
                            <ul className={styles.sub_boxcard + ' ' + styles.sub_boxcard + ' list_opt sub_boxcard'}>
                              {columnItem.depth1Items.map((depth1Item: any, depth1ItemIdx: number) => (
                                <li
                                  key={depth1ItemIdx}
                                  className={opt1Select === depth1Item.depthIndex ? 'in_active' : ''}
                                >
                                  <a
                                    className={
                                      styles.link_option +
                                      (opt2Select === depth1Item.depthIndex ? ' ' + styles.on : '') +
                                      ' link_option'
                                    }
                                    onClick={() => {
                                      if (opt1Select === depth1Item.depthIndex) {
                                        return;
                                      }
                                      setOpt2Select(depth1Item.depthIndex);
                                      setShowOpt2Select(false);
                                    }}
                                  >
                                    {depth1Item.depth1Name}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="graph_wrap" style={{ height: '180px' }}>
              <ResponsiveContainer>
                <AreaChart
                  data={chartData}
                  syncId="anyId"
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <XAxis dataKey="reportDate" tickFormatter={formatXAxis} tickLine={false} />
                  <YAxis
                    yAxisId="left"
                    axisLine={false}
                    tick={{ stroke: 'none', fill: '#326edc', fontSize: 12 }}
                    tickLine={{ stroke: 'lightGray' }}
                    tickFormatter={formatYAxis}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    axisLine={false}
                    tick={{ stroke: 'none', fill: '#4DC6DF', fontSize: 12 }}
                    tickLine={{ stroke: 'lightGray' }}
                    tickFormatter={formatYAxis}
                  />
                  <Tooltip content={<TooltipComponent />} />
                  <Area
                    dot={{ fill: '#326edc', fillOpacity: 1 }}
                    type="monotone"
                    dataKey={`report.${opt1Select}`}
                    stroke="#326edc"
                    fill="#326edc"
                    fillOpacity="0.1"
                    yAxisId="left"
                  />
                  <Area
                    dot={{ fill: '#4DC6DF', fillOpacity: 1 }}
                    type="monotone"
                    dataKey={`report.${opt2Select}`}
                    stroke="#4DC6DF"
                    fill="#4DC6DF"
                    fillOpacity="0.1"
                    yAxisId="right"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
      <a
        className="btn_close"
        onClick={() => {
          let routerPathStr = '';
          if (router.asPath.includes(`?summary=${summary}`)) {
            routerPathStr = router.asPath.replace(`?summary=${summary}`, '');
            router.push(routerPathStr);
          } else {
            routerPathStr = router.asPath.replace(`&summary=${summary}`, '');
            router.push(routerPathStr);
          }
        }}
      >
        <span>
          <MdClose size={25} color={'#555'} />
        </span>
      </a>
    </div>
  );
};

export default DashboardInfoAndGraph;

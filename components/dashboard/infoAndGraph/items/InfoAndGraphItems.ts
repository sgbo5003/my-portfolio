export interface ChartDataProps {
  date: string;
  metric1: number;
  metric2: number;
}

export const chartData: ChartDataProps[] = [
  {
    date: '00',
    metric1: 31900,
    metric2: 77,
  },
  {
    date: '01',
    metric1: 36927,
    metric2: 67,
  },
  {
    date: '02',
    metric1: 28809,
    metric2: 43,
  },
  {
    date: '03',
    metric1: 35332,
    metric2: 45,
  },
  {
    date: '04',
    metric1: 16060,
    metric2: 24,
  },
  {
    date: '05',
    metric1: 63536,
    metric2: 58,
  },
  {
    date: '06',
    metric1: 84700,
    metric2: 95,
  },
  {
    date: '07',
    metric1: 80344,
    metric2: 114,
  },
  {
    date: '08',
    metric1: 94578,
    metric2: 163,
  },
  {
    date: '09',
    metric1: 108790,
    metric2: 194,
  },
  {
    date: '10',
    metric1: 107437,
    metric2: 180,
  },
  {
    date: '11',
    metric1: 118239,
    metric2: 180,
  },
  {
    date: '12',
    metric1: 103400,
    metric2: 163,
  },
  {
    date: '13',
    metric1: 126885,
    metric2: 190,
  },
  {
    date: '14',
    metric1: 105347,
    metric2: 177,
  },
  {
    date: '15',
    metric1: 154858,
    metric2: 216,
  },
  {
    date: '16',
    metric1: 188089,
    metric2: 269,
  },
  {
    date: '17',
    metric1: 187506,
    metric2: 289,
  },
  {
    date: '18',
    metric1: 111936,
    metric2: 190,
  },
  {
    date: '19',
    metric1: 112046,
    metric2: 180,
  },
  {
    date: '20',
    metric1: 141768,
    metric2: 229,
  },
  {
    date: '21',
    metric1: 129217,
    metric2: 207,
  },
  {
    date: '22',
    metric1: 103532,
    metric2: 184,
  },
  {
    date: '23',
    metric1: 59268,
    metric2: 97,
  },
];

export const chartSelectOptions = [
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
          // { depth1Name: '도달수', depthIndex: 'reach' },
          // { depth1Name: '재생수', depthIndex: 'video3PlaySeconds' },
          { depth1Name: '노출당 비용', depthIndex: 'cpm' },
          { depth1Name: '클릭당 비용', depthIndex: 'cpc' },
          // { depth1Name: '도달당 비용', depthIndex: 'reachRate' },
          // { depth1Name: '재생당 비용', depthIndex: 'videoPlayRate' },
        ],
      },
    ],
  },
  // {
  //   groupName: '전환 지표',
  //   columnItems: [
  //     {
  //       columnName: '픽셀 & SDK 전환 지표',
  //       depth1Items: [
  //         { depth1Name: '회원가입 (1일)', depthIndex: 'signUpDay1' },
  //         { depth1Name: '장바구니 보기 (1일)', depthIndex: 'viewCartDay1' },
  //         { depth1Name: '구매 (1일)', depthIndex: 'purchaseDay1' },
  //         { depth1Name: '회원가입 (7일)', depthIndex: 'signUpDay7' },
  //         { depth1Name: '장바구니 보기 (7일)', depthIndex: 'viewCartDay7' },
  //         { depth1Name: '구매 (7일)', depthIndex: 'purchaseDay7' },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   groupName: '소재 지표',
  //   columnItems: [
  //     {
  //       columnName: '동영상 지표',
  //       depth1Items: [
  //         { depth1Name: '자동 재생수', depthIndex: 'videoAutoPlay' },
  //         { depth1Name: '터치 재생수', depthIndex: 'videoTouches' },
  //         { depth1Name: '사운드 ON수', depthIndex: 'videoUnmute' },
  //         { depth1Name: '5초 재생수', depthIndex: 'videoPlay5Seconds' },
  //         { depth1Name: '10초 재생수', depthIndex: 'videoPlay10Seconds' },
  //         { depth1Name: '15초 재생수', depthIndex: 'videoPlay15Seconds' },
  //         { depth1Name: '30초 재생수', depthIndex: 'videoPlay25Percent' },
  //         { depth1Name: '60초 재생수', depthIndex: 'videoPlay30Seconds' },
  //         { depth1Name: '25% 재생수', depthIndex: 'videoPlay50Percent' },
  //         { depth1Name: '50% 재생수', depthIndex: 'videoPlay60Seconds' },
  //         { depth1Name: '75% 재생수', depthIndex: 'videoPlay75Percent' },
  //         { depth1Name: '100% 재생수', depthIndex: 'videoPlay100Percent' },
  //       ],
  //     },
  //   ],
  // },
];

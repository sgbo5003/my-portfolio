import { HeaderColumnsType } from '../../../components/dashboard/table';

export const indicatorItems: HeaderColumnsType[] = [
  {
    columnGroupNum: 1,
    columnIndex: 'cost',
    columnName: '비용',
    columnSeq: 0,
    pinLeftYn: false,
    width: '200px',
    sortIndex: 'cost',
    isHelp: true,
    helpId: 'cost-element',
  },
  {
    columnGroupNum: 2,
    columnIndex: 'impression',
    columnName: '노출수',
    columnSeq: 1,
    pinLeftYn: false,
    width: '200px',
    sortIndex: 'impression',
    isHelp: true,
    helpId: 'impression-element',
  },
  {
    columnGroupNum: 2,
    columnIndex: 'click',
    columnName: '클릭수',
    columnSeq: 2,
    pinLeftYn: false,
    width: '200px',
    sortIndex: 'click',
    isHelp: true,
    helpId: 'click-element',
  },
  {
    columnGroupNum: 2,
    columnIndex: 'ctr',
    columnName: '클릭률',
    columnSeq: 3,
    pinLeftYn: false,
    width: '200px',
    sortIndex: 'ctr',
    isHelp: true,
    helpId: 'ctr-element',
  },
  // {
  //   columnGroupNum: 2,
  //   columnIndex: 'reach',
  //   columnName: '도달수',
  //   columnSeq: 4,
  //   pinLeftYn: false,
  //   width: '200px',
  //   sortIndex: 'reach',
  //   isHelp: true,
  //   helpId: 'reach-element',
  // },
  // {
  //   columnGroupNum: 2,
  //   columnIndex: 'videoPlay3Seconds',
  //   columnName: '재생수',
  //   columnSeq: 5,
  //   pinLeftYn: false,
  //   width: '200px',
  //   sortIndex: 'videoPlay3Seconds',
  //   isHelp: true,
  //   helpId: 'videoPlay3Seconds-element',
  // },
  {
    columnGroupNum: 2,
    columnIndex: 'cpm',
    columnName: '노출당 비용',
    columnSeq: 6,
    pinLeftYn: false,
    width: '200px',
    sortIndex: 'cpm',
    isHelp: true,
    helpId: 'cpm-element',
  },
  {
    columnGroupNum: 2,
    columnIndex: 'cpc',
    columnName: '클릭당 비용',
    columnSeq: 7,
    pinLeftYn: false,
    width: '200px',
    sortIndex: 'cpc',
    isHelp: true,
    helpId: 'cpc-element',
  },
  // {
  //   columnGroupNum: 2,
  //   columnIndex: 'reachRate',
  //   columnName: '도달당 비용',
  //   columnSeq: 8,
  //   pinLeftYn: false,
  //   width: '200px',
  //   sortIndex: 'reachRate',
  //   isHelp: true,
  //   helpId: 'reachRate-element',
  // },
  // {
  //   columnGroupNum: 2,
  //   columnIndex: 'videoPlayRate',
  //   columnName: '재생당 비용',
  //   columnSeq: 9,
  //   pinLeftYn: false,
  //   width: '200px',
  //   sortIndex: 'videoPlayRate',
  //   isHelp: true,
  //   helpId: 'videoPlayRate-element',
  // },
  // {
  //   columnGroupNum: 3,
  //   columnIndex: 'signUpDay1',
  //   columnName: '회원가입 (1일)',
  //   columnSeq: 10,
  //   pinLeftYn: false,
  //   width: '200px',
  //   sortIndex: 'signUpDay1',
  //   isHelp: true,
  //   helpId: 'signUpDay1-element',
  // },
  // {
  //   columnGroupNum: 3,
  //   columnIndex: 'viewCartDay1',
  //   columnName: '장바구니 보기 (1일)',
  //   columnSeq: 11,
  //   pinLeftYn: false,
  //   width: '200px',
  //   sortIndex: 'viewCartDay1',
  //   isHelp: true,
  //   helpId: 'viewCartDay1-element',
  // },
  // {
  //   columnGroupNum: 3,
  //   columnIndex: 'purchaseDay1',
  //   columnName: '구매 (1일)',
  //   columnSeq: 12,
  //   pinLeftYn: false,
  //   width: '200px',
  //   sortIndex: 'purchaseDay1',
  //   isHelp: true,
  //   helpId: 'purchaseDay1-element',
  // },
  // {
  //   columnGroupNum: 3,
  //   columnIndex: 'signUpDay7',
  //   columnName: '회원가입 (7일)',
  //   columnSeq: 13,
  //   pinLeftYn: false,
  //   width: '200px',
  //   sortIndex: 'signUpDay7',
  //   isHelp: true,
  //   helpId: 'signUpDay7-element',
  // },
  // {
  //   columnGroupNum: 3,
  //   columnIndex: 'viewCartDay7',
  //   columnName: '장바구니 보기 (7일)',
  //   columnSeq: 14,
  //   pinLeftYn: false,
  //   width: '200px',
  //   sortIndex: 'viewCartDay7',
  //   isHelp: true,
  //   helpId: 'viewCartDay7-element',
  // },
  // {
  //   columnGroupNum: 3,
  //   columnIndex: 'purchaseDay7',
  //   columnName: '구매 (7일)',
  //   columnSeq: 15,
  //   pinLeftYn: false,
  //   width: '200px',
  //   sortIndex: 'purchaseDay7',
  //   isHelp: true,
  //   helpId: 'purchaseDay7-element',
  // },
  // {
  //   columnGroupNum: 4,
  //   columnIndex: 'videoAutoPlay',
  //   columnName: '자동 재생수',
  //   columnSeq: 16,
  //   pinLeftYn: false,
  //   width: '200px',
  //   sortIndex: 'videoAutoPlay',
  //   isHelp: true,
  //   helpId: 'videoAutoPlay-element',
  // },
  // {
  //   columnGroupNum: 4,
  //   columnIndex: 'videoTouches',
  //   columnName: '터치 재생수',
  //   columnSeq: 17,
  //   pinLeftYn: false,
  //   width: '200px',
  //   sortIndex: 'videoTouches',
  //   isHelp: true,
  //   helpId: 'videoTouches-element',
  // },
  // {
  //   columnGroupNum: 4,
  //   columnIndex: 'videoUnmute',
  //   columnName: '사운드 ON수',
  //   columnSeq: 18,
  //   pinLeftYn: false,
  //   width: '200px',
  //   sortIndex: 'videoUnmute',
  //   isHelp: true,
  //   helpId: 'videoUnmute-element',
  // },
  // {
  //   columnGroupNum: 4,
  //   columnIndex: 'videoPlay5Seconds',
  //   columnName: '5초 재생수',
  //   columnSeq: 19,
  //   pinLeftYn: false,
  //   width: '200px',
  //   sortIndex: 'videoPlay5Seconds',
  //   isHelp: true,
  //   helpId: 'videoPlay5Seconds-element',
  // },
  // {
  //   columnGroupNum: 4,
  //   columnIndex: 'videoPlay10Seconds',
  //   columnName: '10초 재생수',
  //   columnSeq: 20,
  //   pinLeftYn: false,
  //   width: '200px',
  //   sortIndex: 'videoPlay10Seconds',
  //   isHelp: true,
  //   helpId: 'videoPlay10Seconds-element',
  // },
  // {
  //   columnGroupNum: 4,
  //   columnIndex: 'videoPlay15Seconds',
  //   columnName: '15초 재생수',
  //   columnSeq: 21,
  //   pinLeftYn: false,
  //   width: '200px',
  //   sortIndex: 'videoPlay15Seconds',
  //   isHelp: true,
  //   helpId: 'videoPlay15Seconds-element',
  // },
  // {
  //   columnGroupNum: 4,
  //   columnIndex: 'videoPlay30Seconds',
  //   columnName: '30초 재생수',
  //   columnSeq: 22,
  //   pinLeftYn: false,
  //   width: '200px',
  //   sortIndex: 'videoPlay30Seconds',
  //   isHelp: true,
  //   helpId: 'videoPlay30Seconds-element',
  // },
  // {
  //   columnGroupNum: 4,
  //   columnIndex: 'videoPlay60Seconds',
  //   columnName: '60초 재생수',
  //   columnSeq: 23,
  //   pinLeftYn: false,
  //   width: '200px',
  //   sortIndex: 'videoPlay60Seconds',
  //   isHelp: true,
  //   helpId: 'videoPlay60Seconds-element',
  // },
  // {
  //   columnGroupNum: 4,
  //   columnIndex: 'videoPlay25Percent',
  //   columnName: '25% 재생수',
  //   columnSeq: 24,
  //   pinLeftYn: false,
  //   width: '200px',
  //   sortIndex: 'videoPlay25Percent',
  //   isHelp: true,
  //   helpId: 'videoPlay25Percent-element',
  // },
  // {
  //   columnGroupNum: 4,
  //   columnIndex: 'videoPlay50Percent',
  //   columnName: '50% 재생수',
  //   columnSeq: 25,
  //   pinLeftYn: false,
  //   width: '200px',
  //   sortIndex: 'videoPlay50Percent',
  //   isHelp: true,
  //   helpId: 'videoPlay50Percent-element',
  // },
  // {
  //   columnGroupNum: 4,
  //   columnIndex: 'videoPlay75Percent',
  //   columnName: '75% 재생수',
  //   columnSeq: 26,
  //   pinLeftYn: false,
  //   width: '200px',
  //   sortIndex: 'videoPlay75Percent',
  //   isHelp: true,
  //   helpId: 'videoPlay75Percent-element',
  // },
  // {
  //   columnGroupNum: 4,
  //   columnIndex: 'videoPlay100Percent',
  //   columnName: '100% 재생수',
  //   columnSeq: 27,
  //   pinLeftYn: false,
  //   width: '200px',
  //   sortIndex: 'videoPlay100Percent',
  //   isHelp: true,
  //   helpId: 'videoPlay100Percent-element',
  // },
];
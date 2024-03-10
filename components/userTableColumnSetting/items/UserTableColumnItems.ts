export interface groupColumnObj {
  column_group_name: string;
  column_group_no: number;
}
export interface columnObj {
  id: number;
  column_default: 'Y' | 'N';
  column_group_no: number;
  column_index: string;
  column_name: string;
  column_rate: number;
  column_seq: number;
  column_type: 'F' | 'V'; // 'F' 고정 , 'V' 가변
}

// 항목들
export const columnItems: Array<columnObj> = [
  {
    id: 1,
    column_default: 'Y',
    column_group_no: 1,
    column_index: 'cost',
    column_name: '비용',
    column_rate: 0,
    column_seq: 0,
    column_type: 'V',
  },
  {
    id: 2,
    column_default: 'Y',
    column_group_no: 2,
    column_index: 'impression',
    column_name: '노출수',
    column_rate: 0,
    column_seq: 1,
    column_type: 'V',
  },
  {
    id: 3,
    column_default: 'Y',
    column_group_no: 2,
    column_index: 'click',
    column_name: '클릭수',
    column_rate: 0,
    column_seq: 2,
    column_type: 'V',
  },
  {
    id: 4,
    column_default: 'Y',
    column_group_no: 2,
    column_index: 'clickRate',
    column_name: '클릭률',
    column_rate: 0,
    column_seq: 3,
    column_type: 'V',
  },
  {
    id: 5,
    column_default: 'N',
    column_group_no: 2,
    column_index: 'reach',
    column_name: '도달수',
    column_rate: 0,
    column_seq: 4,
    column_type: 'V',
  },
  {
    id: 6,
    column_default: 'N',
    column_group_no: 3,
    column_index: 'signup_1d',
    column_name: '회원가입 (1일)',
    column_rate: 0,
    column_seq: 5,
    column_type: 'V',
  },
  {
    id: 7,
    column_default: 'N',
    column_group_no: 3,
    column_index: 'purchase_1d',
    column_name: '구매 (1일)',
    column_rate: 0,
    column_seq: 6,
    column_type: 'V',
  },
  {
    id: 8,
    column_default: 'N',
    column_group_no: 3,
    column_index: 'view_cart_7d',
    column_name: '장바구니 보기 (7일)',
    column_rate: 0,
    column_seq: 8,
    column_type: 'V',
  },
  {
    id: 9,
    column_default: 'N',
    column_group_no: 3,
    column_index: 'signup_7d',
    column_name: '회원가입 (7일)',
    column_rate: 0,
    column_seq: 9,
    column_type: 'V',
  },
  {
    id: 10,
    column_default: 'N',
    column_group_no: 3,
    column_index: 'purchase_7d',
    column_name: '구매 (7일)',
    column_rate: 0,
    column_seq: 10,
    column_type: 'V',
  },
  {
    id: 11,
    column_default: 'N',
    column_group_no: 3,
    column_index: 'view_cart_7d',
    column_name: '장바구니 보기 (7일)',
    column_rate: 0,
    column_seq: 11,
    column_type: 'V',
  },
];

// 그룹 항목 설정 컬럼 관련 Array
export const groupColumnItems: Array<groupColumnObj> = [
  { column_group_name: '비용 지표', column_group_no: 1 },
  { column_group_name: '기본 지표', column_group_no: 2 },
  // { column_group_name: 'SDK 전환 지표', column_group_no: 3 },
  // { column_group_name: '동영상 지표', column_group_no: 4 },
];

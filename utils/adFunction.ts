export const adTypeAndGoalFnc = (adTypeName: string, adGoalName: string) => {
  let adTypeAndGoalArr: string[] = [];
  switch (adTypeName) {
    case 'DISPLAY':
      adTypeAndGoalArr = adTypeAndGoalArr.concat('디스플레이');
      break;
    case 'VIDEO':
      adTypeAndGoalArr = adTypeAndGoalArr.concat('동영상');
      break;
  }

  switch (adGoalName) {
    case 'CONVERSION':
      adTypeAndGoalArr = adTypeAndGoalArr.concat('전환');
      break;
    case 'VISITING':
      adTypeAndGoalArr = adTypeAndGoalArr.concat('방문');
      break;
    case 'REACH':
      adTypeAndGoalArr = adTypeAndGoalArr.concat('도달');
      break;
    case 'VIEW':
      adTypeAndGoalArr = adTypeAndGoalArr.concat('조회');
      break;
  }
  return adTypeAndGoalArr;
};

export const dashboardStatus = (status: string) => {
  let result = '';
  switch (status) {
    case 'READY':
      result = '집행 예정';
      break;
    case 'LIVE':
      result = '집행 중';
      break;
    case 'FINISHED':
      result = '집행 완료';
      break;
    case 'OFF':
      result = '사용자OFF';
      break;
    case 'DELETED':
      result = '삭제';
      break;
    case 'ADMIN_STOP':
      result = '관리자 정지';
      break;
    // case 'EXCEED_DAILY_BUDGET':
    //   result = '캠페인 일 예산 초과';
    //   break;
    // case 'PAUSED':
    //   result = '일시중지';
    //   break;
    // case 'NO_AVAILABLE_CREATIVE':
    //   result = '집행 가능한 소재가 없음';
    //   break;
    // case 'CANCELED':
    //   result = '계약해지';
    //   break;
    // case 'SYSTEM_CONFIG_EXTERNAL_SERVICE_STOP':
    //   result = '연결 서비스 제한으로 운영불가인 상태';
    //   break;
    // case 'ADACCOUNT_UNAVAILABLE':
    //   result = '광고계정 운영불가';
    //   break;
  }
  return result;
};

export const creativeStatus = (status: string) => {
  let result = '';
  switch (status) {
    case 'OPERATING':
      result = '운영가능';
      break;
    case 'UNAPPROVED':
      result = '심사미승인';
      break;
    // case 'INVALID_DATE':
    //   result = '기간오류';
    //   break;
    case 'ADMIN_STOP':
      result = '관리자정지';
      break;
    case 'OFF':
      result = '사용자OFF';
      break;
    case 'DELETED':
      result = '삭제';
      break;
    // case 'ADGROUP_UNAVAILABLE':
    //   result = '광고그룹 운영불가';
    //   break;
  }
  return result;
};

export const creativeReviewStatus = (status: string) => {
  let result = '';
  switch (status) {
    case 'APPROVED':
      result = '승인';
      break;
    case 'WAITING':
      result = '심사중';
      break;
    case 'REJECTED':
      result = '심사보류';
      break;
    case 'MODIFICATION_WAITING':
      result = '수정사항 심사중';
      break;
    case 'MODIFICATION_REJECTED':
      result = '수정사항 심사보류';
      break;
  }
  return result;
};

export const adAccountAllRequestStatus = (status: string) => {
  let result = '';
  switch (status) {
    case 'N':
      result = '요청';
      break;
    case 'Y':
      result = '수락';
      break;
    case 'R':
      result = '거부';
      break;
    case 'C':
      result = '요청 취소';
      break;
  }
  return result;
};

export const createFormat = (format: string) => {
  let createFormatArr: string[] = [];
  switch (format) {
    case 'IMAGE_BANNER':
      createFormatArr = createFormatArr.concat('이미지', '배너');
      break;
    case 'IMAGE_NATIVE':
      createFormatArr = createFormatArr.concat('이미지', '네이티브');
      break;
    case 'VIDEO_NATIVE':
      createFormatArr = createFormatArr.concat('비디오', '네이티브');
      break;
    case 'SERVICE_CONTENT':
      createFormatArr = createFormatArr.concat('콘텐츠');
      break;
  }
  return createFormatArr;
};

export const filterCheckBoxResult = (checkBoxVal: string[]) => {
  let filterResultStr = '';
  for (let i = 0; i < checkBoxVal.length; i++) {
    filterResultStr = filterResultStr + checkBoxVal[i] + ',';
  }
  filterResultStr = filterResultStr.slice(0, -1);
  return filterResultStr;
};

export const getFilterParamsUrl = (urlFilterQueryArr: string[]) => {
  let resultStr = '';
  for (let i = 0; i < urlFilterQueryArr.length; i++) {
    resultStr = resultStr + urlFilterQueryArr[i] + '+';
  }
  return resultStr;
};

export const adAccountStatus = (config: string, adminStop: boolean, outOfBalance: boolean): string => {
  if (adminStop === true) {
    return '관리자정지';
  } else {
    if (config === 'ON' && outOfBalance === false) return '운영중';
    else if (config === 'ON' && outOfBalance === true) return '운영불가(잔액부족)';
    else if (config === 'OFF' && outOfBalance === false) return '사용자OFF';
    else if (config === 'OFF' && outOfBalance === true) return '사용자OFF,잔액부족';
    else if (config === 'DEL') return '삭제';
    else return '-';
  }
};

export const memberTypeFnc = (memberType: 'MASTER' | 'OPERATOR' | 'MEMBER') => {
  let result = '';
  switch (memberType) {
    case 'MASTER':
      result = '마스터';
      break;
    case 'OPERATOR':
      result = '운영자';
      break;
    case 'MEMBER':
      result = '멤버';
      break;
  }
  return result;
};

export const creditSummaryFnc = (status: string) => {
  let result = '';
  switch (status) {
    case 'charge':
      result = '충전';
      break;
    case 'refund':
      result = '환불';
      break;
    case 'campaign_budget':
      result = '예산변경';
      break;
    case 'campaign_finish':
      result = '캠페인만료';
      break;
  }
  return result;
};

export const refundStatusFnc = (status: string) => {
  let result = '';
  switch (status) {
    case 'Y':
      result = '환불완료';
      break;
    case 'N':
      result = '환불요청';
      break;
    case 'R':
      result = '환불불가';
      break;
  }
  return result;
};

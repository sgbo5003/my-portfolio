export const descriptionItems: { name: string; description: string }[] = [
  {
    name: 'campaignStatus',
    description:
      '캠페인의 게재와 관련된 현재 상태를 의미합니다. 상위 광고계정의 상태를 고려하여 현재 캠페인의 최종 운영 상태를 표기합니다.',
  },
  {
    name: 'campaignBudget',
    description:
      // eslint-disable-next-line max-len
      '캠페인 하위 모든 광고그룹에서 설정한 기간 예산의 합 또는 캠페인에 설정된 일 예산을 의미합니다. 일 예산의 경우, 하위 광고그룹 내 과금방식 및 입찰금액에 따라 일 예산을 초과하는 과금이 발생할 수 있습니다.',
  },
  {
    name: 'campaignPeriod',
    description: '캠페인 하위 광고그룹(삭제 제외)의 가장 빠른 시작일부터 가장 늦은 종료일을 의미합니다.',
  },
  {
    name: 'adGroupStatus',
    description:
      '광고그룹의 게재와 관련된 현재 상태를 의미합니다. 상위 광고계정, 캠페인의 상태를 고려하여 현재 광고그룹의 최종 운영 상태를 표기합니다.',
  },
  {
    name: 'adGroupBudget',
    description:
      '해당 광고그룹에서 설정한 예산으로, 설정한 집행단위 동안 소진할 금액을 의미합니다. 일 예산의 경우, 광고그룹에 설정한 일 예산 및 입찰금액에 따라 초과 과금이 발생할 수 있습니다.',
  },
  {
    name: 'adGroupPeriod',
    description: '광고그룹의 시작일과 종료일을 의미합니다.',
  },
  {
    name: 'creativeStatus',
    description:
      '소재의 게재와 관련된 현재 상태를 의미합니다. 상위 광고계정, 캠페인, 광고그룹의 상태 및 소재의 심사 상태를 고려하여 현재 소재의 최종 운영 상태를 표기합니다.',
  },
  {
    name: 'judgeStatus',
    description: '소재의 심사와 관련된 현재 상태를 의미합니다.',
  },
  {
    name: 'cost',
    description:
      '지출된 광고비로서 VAT 포함금액을 의미합니다. 게재 중인 광고는 추정값이 표시 될 수 있으며 그에 따라 소수점이 일부 노출 될 수 있습니다.',
  },
  {
    name: 'impression',
    description: '광고가 노출된 횟수를 의미합니다.',
  },
  {
    name: 'click',
    description: '광고가 클릭된 횟수를 의미합니다.',
  },
  {
    name: 'ctr',
    description: '클릭수를 노출수로 나눈 값을 의미합니다. (클릭률(%)=클릭수/노출수*100)',
  },
  {
    name: 'reach',
    description: '광고를 한번 이상 본 사람 수를 의미합니다.',
  },
  {
    name: 'videoPlay3Seconds',
    description: '광고가 3초 이상 재생된 횟수를 의미합니다.',
  },
  {
    name: 'cpm',
    description: '비용을 노출수로 나눈 값을 의미합니다. (노출당 비용=비용/노출수)',
  },
  {
    name: 'cpc',
    description: '비용을 클릭수로 나눈 값을 의미합니다. (클릭당 비용=비용/클릭수)',
  },
  {
    name: 'reachRate',
    description: '비용을 도달수로 나눈 값을 의미합니다. (도달당 비용=비용/도달수)',
  },
  {
    name: 'videoPlayRate',
    description: '비용을 동영상 재생수로 나눈 값을 의미합니다. (재생당 비용=비용/재생수)',
  },
  {
    name: 'signUpDay1',
    description: '광고 클릭 후, 1일(24시간) 이내 발생한 회원가입수를 의미합니다.',
  },
  {
    name: 'viewCartDay1',
    description: '광고 클릭 후, 1일(24시간) 이내 장바구니를 확인해본 횟수를 의미합니다.',
  },
  {
    name: 'purchaseDay1',
    description: '광고 클릭 후, 1일(24시간) 이내 발생한 구매건수를 의미합니다.',
  },
  {
    name: 'signUpDay7',
    description: '광고 클릭 후, 7일 이내에 발생한 회원가입수를 의미합니다.',
  },
  {
    name: 'viewCartDay7',
    description: '광고 클릭 후, 7일 이내에 장바구니를 확인해본 횟수를 의미합니다.',
  },
  {
    name: 'purchaseDay7',
    description: '광고 클릭 후, 7일 이내에 발생한 구매건수를 의미합니다.',
  },
  {
    name: 'videoAutoPlay',
    description: '동영상이 자동 재생된 횟수를 의미합니다.',
  },
  {
    name: 'videoTouches',
    description: '동영상이 터치 재생된 횟수를 의미합니다.',
  },
  {
    name: 'videoUnmute',
    description: '스피커 버튼을 선택해서 사운드를 활성화한 횟수를 의미합니다.',
  },
  {
    name: 'videoPlay5Seconds',
    description: '동영상이 5초 재생된 횟수를 의미합니다.',
  },
  {
    name: 'videoPlay10Seconds',
    description: '동영상이 10초 재생된 횟수를 의미합니다.',
  },
  {
    name: 'videoPlay15Seconds',
    description: '동영상이 15초 재생된 횟수를 의미합니다.',
  },
  {
    name: 'videoPlay30Seconds',
    description: '동영상이 30초 재생된 횟수를 의미합니다.',
  },
  {
    name: 'videoPlay60Seconds',
    description: '동영상이 60초 재생된 횟수를 의미합니다.',
  },
  {
    name: 'videoPlay25Percent',
    description: '동영상이 25% 재생된 횟수를 의미합니다.',
  },
  {
    name: 'videoPlay50Percent',
    description: '동영상이 50% 재생된 횟수를 의미합니다.',
  },
  {
    name: 'videoPlay75Percent',
    description: '동영상이 75% 재생된 횟수를 의미합니다.',
  },
  {
    name: 'videoPlay100Percent',
    description: '동영상이 100% 재생된 횟수를 의미합니다.',
  },
];

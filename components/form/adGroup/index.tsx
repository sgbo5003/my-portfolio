import { FieldArray, Form, Formik } from 'formik';
import * as fnc from '../../../utils/commonFunction';
import { addDays } from 'date-fns';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styles from '../adGroup/AdGroup.module.scss';
import { AiOutlineClose } from 'react-icons/ai';
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from 'react-icons/md';
import DeviceAndMedia from './deviceAndMedia';
import Strategy from './strategy';
import Name from './name';
import AdGroupButton from './button';
import Modal from '../../modal';
import AdGroup from './adGroup';

export interface adGroupFormValues {
  genderCheck: Array<string>; // 광고그룹 > 데모 그래픽 > 성별 checkbox 관련
  ageCheck: Array<string>; // 광고그룹 > 데모 그래픽 > 나이 checkbox 관련
  onlyAdult: boolean; // 광고그룹 > 데모 그래픽 > 나이 제한 업종 설정 checkbox 관련
  fullDeviceDisplay: string; // 광고그룹 > 디바이스 > radio 관련 (모든 디바이스 or 상세 설정)
  deviceType: Array<DeviceResponseProps2>; // 광고그룹 > 디바이스 > 상세 설정 > checkbox 관련 (PC, 모바일(Android, IOS))
  onlyWifiDisplay: boolean; // 광고그룹 > 디바이스 > 상세 설정 > 디바이스 환경 설정 >  checkbox 관련 (wifi 설정)
  allMedia: string; // 광고그룹 > 매체 > radio 관련 (모든 매체 or 상세 설정)
  mediaType: Array<MediaResponseProps>; // 광고그룹 > 매체 > 상세 설정 > checkbox 관련 앙코르쳇
  bidStrategy: string; // 광고그룹 > 입찰 방식 > radio 관련 (수동입찰 or 자동입찰)
  pacingType: string; // 광고그룹 > 입찰 방식 > 수동입찰 > radio 관련 (CPC or CPM or CPV)
  bidAmount: string; // 광고그룹 > 입찰 방식 > 입찰금액 > input 관련
  dailyBudgetAmount: string; // 광고그룹 > 일 예산 > input 관련
  adGroupStartDate: string; // 광고그룹 > 집행기간 > 일자 > 시작일
  adGroupEndDate: string | null; // 광고그룹 > 집행기간 > 일자 > 종료일
  adGroupDateSettingCheck: boolean; // 광고그룹 > 집행기간 > 일자 > 미설정 checkbox
  hasDetailTime: string;
  lateNightTargeting: boolean; // 광고그룹 > 집행기간 > 시간 제한 소재 설정 > checkbox 관련 (심야 타게팅)
  pacing: string; // 광고그룹 > 게재방식 > radio 관련 (빠른 게재 or 일반 게재)
  adGroupName: string; // 광고그룹 > 광고그룹 이름 input 관련
  schedule: boolean[][];
}

export interface MyFormValues {
  adGroup: adGroupFormValues[];
}

export interface MediaResponseProps {
  id: number;
  name: string;
}
export interface DeviceResponseProps2 {
  id: number;
  name: string;
  type: string;
}
export interface TargetResultType {
  subTitle: string;
  subIndex: string;
}

const cellsItems: boolean[][] = [
  [false, false, false, false, false, false, false, false],
  [false, true, true, true, true, true, true, true], // 00시
  [false, true, true, true, true, true, true, true], // 01시
  [false, true, true, true, true, true, true, true], // 02시
  [false, true, true, true, true, true, true, true], // 03시
  [false, true, true, true, true, true, true, true], // 04시
  [false, true, true, true, true, true, true, true], // 05시
  [false, true, true, true, true, true, true, true], // 06시
  [false, true, true, true, true, true, true, true], // 07시
  [false, true, true, true, true, true, true, true], // 08시
  [false, true, true, true, true, true, true, true], // 09시
  [false, true, true, true, true, true, true, true], // 10시
  [false, true, true, true, true, true, true, true], // 11시
  [false, true, true, true, true, true, true, true], // 12시
  [false, true, true, true, true, true, true, true], // 13시
  [false, true, true, true, true, true, true, true], // 14시
  [false, true, true, true, true, true, true, true], // 15시
  [false, true, true, true, true, true, true, true], // 16시
  [false, true, true, true, true, true, true, true], // 17시
  [false, true, true, true, true, true, true, true], // 18시
  [false, true, true, true, true, true, true, true], // 19시
  [false, true, true, true, true, true, true, true], // 20시
  [false, true, true, true, true, true, true, true], // 21시
  [false, true, true, true, true, true, true, true], // 22시
  [false, true, true, true, true, true, true, true], // 23시
];

const categoryAndTargetResult = [
  {
    subTitle: '1',
    subIndex: '2',
  },
  {
    subTitle: '1',
    subIndex: '2',
  },
];

const initialValues: MyFormValues = {
  adGroup: [
    {
      genderCheck: ['T'],
      ageCheck: [''],
      onlyAdult: false,
      fullDeviceDisplay: 'Y', // Y: 가능한 모든 디바이스 노출 , N: 상세 설정
      deviceType: [], // PC, 모바일
      onlyWifiDisplay: false,
      allMedia: 'Y',
      mediaType: [], // 매체
      // eslint-disable-next-line max-len
      // bidStrategy: categoryAndTargetResult[1].subIndex == 'VIEW' ? 'MANUAL' : 'AUTO', // 입찰방식 AUTO: 자동입찰, MANUAL: 수동입찰
      bidStrategy: 'MANUAL',
      // bidAmount: categoryAndTargetResult[1].subIndex == 'VIEW' ? '20' : '0', // 입찰금액
      bidAmount: '0.150', // 입찰금액
      dailyBudgetAmount: '10.000',
      adGroupStartDate: fnc.dateAsYYYYMMDD(addDays(new Date(), 1)).replace(/-/gi, ''),
      adGroupEndDate: fnc
        .dateAsYYYYMMDD(new Date(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()))
        .replace(/-/gi, ''),
      adGroupDateSettingCheck: false,
      hasDetailTime: 'N',
      lateNightTargeting: false,
      // pacing: categoryAndTargetResult[1].subIndex == 'VIEW' ? 'QUICK' : 'NORMAL',
      pacing: 'NORMAL',
      // pacingType: categoryAndTargetResult[1].subIndex == 'VIEW' ? 'CPV' : '',
      pacingType: 'CPC',
      adGroupName:
        // categoryAndTargetResult[0].subTitle +
        // '_' +
        // categoryAndTargetResult[1].subTitle +
        // '_' +
        // fnc.dateAsYYYYMMDDHHMM(new Date()).replace(/-/gi, ''),
        // categoryAndTargetResult[0].subTitle + '_' + fnc.dateAsYYYYMMDDHHMM(new Date()).replace(/-/gi, ''),
        '',
      schedule: cellsItems,
    },
  ],
};

const adGroupInitialValue: adGroupFormValues = {
  genderCheck: ['T'],
  ageCheck: [''],
  onlyAdult: false,
  fullDeviceDisplay: 'Y', // Y: 가능한 모든 디바이스 노출 , N: 상세 설정
  deviceType: [], // PC, 모바일
  onlyWifiDisplay: false,
  allMedia: 'Y',
  mediaType: [], // 매체
  // eslint-disable-next-line max-len
  // bidStrategy: categoryAndTargetResult[1].subIndex == 'VIEW' ? 'MANUAL' : 'AUTO', // 입찰방식 AUTO: 자동입찰, MANUAL: 수동입찰
  bidStrategy: 'MANUAL',
  // bidAmount: categoryAndTargetResult[1].subIndex == 'VIEW' ? '20' : '0', // 입찰금액
  bidAmount: '0.150', // 입찰금액
  dailyBudgetAmount: '10.000',
  adGroupStartDate: fnc.dateAsYYYYMMDD(addDays(new Date(), 1)).replace(/-/gi, ''),
  adGroupEndDate: fnc
    .dateAsYYYYMMDD(new Date(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()))
    .replace(/-/gi, ''),
  adGroupDateSettingCheck: false,
  hasDetailTime: 'N',
  lateNightTargeting: false,
  // pacing: categoryAndTargetResult[1].subIndex == 'VIEW' ? 'QUICK' : 'NORMAL',
  pacing: 'NORMAL',
  // pacingType: categoryAndTargetResult[1].subIndex == 'VIEW' ? 'CPV' : '',
  pacingType: 'CPC',
  adGroupName:
    // categoryAndTargetResult[0].subTitle +
    // '_' +
    // categoryAndTargetResult[1].subTitle +
    // '_' +
    // fnc.dateAsYYYYMMDDHHMM(new Date()).replace(/-/gi, ''),
    categoryAndTargetResult[0].subTitle + '_' + fnc.dateAsYYYYMMDDHHMM(new Date()).replace(/-/gi, ''),
  schedule: cellsItems,
};

const adGroupValidationSchema = Yup.object({
  adGroup: Yup.array().of(
    Yup.object({
      // bidAmount: Yup.number()
      //   .when('pacingType', (pacingType, schema) =>
      //     schema.test({
      //       test: (value: string) => {
      //         if (pacingType === 'CPC') {
      //           if (Number(value) >= 0.01 && Number(value) <= 100) {
      //             return true;
      //           } else {
      //             return false;
      //           }
      //         } else if (pacingType === 'CPM') {
      //           if (Number(value) >= 0.1 && Number(value) <= 100) {
      //             return true;
      //           } else {
      //             return false;
      //           }
      //         }
      //       },
      //       message: pacingType === 'CPC' ? '0.01 이상 100 이하로 입력하세요.' : '0.1 이상 100 이하로 입력하세요.',
      //     }),
      //   )
      //   .notRequired(),
      dailyBudgetAmount: Yup.number()
        .min(10, '10 이상 300,000 이하로 입력하세요.')
        .max(300000, '10 이상 300,000 이하로 입력하세요.')
        .required('예산을 입력하세요.'),
      adGroupName: Yup.string().max(50).required(),
      // adGroupStartDate: Yup.string()
      //   .when('adGroupEndDate', (adGroupEndDate, schema) =>
      //     schema.test({
      //       test: (value: string) => {
      //         if (adGroupEndDate != null) {
      //           if (Number(value) > Number(adGroupEndDate)) {
      //             return false;
      //           } else {
      //             return true;
      //           }
      //         } else {
      //           return value;
      //         }
      //       },
      //       message: '시작일은 종료일보다 앞서야 합니다.',
      //     }),
      //   )
      //   .notRequired(),
      // adGroupEndDate: Yup.string().nullable(true),
    }),
  ),
});

const AdGroupPage = () => {
  const [cancelModalOn, setCancelModalOn] = useState<boolean>(false); // 취소 버튼 클릭 시 모달
  const [mediaData, setMediaData] = useState<Array<MediaResponseProps>>([]);
  // 광고 그룹 > 매체 > data 관련
  const [deviceData, setDeviceData] = useState<Array<DeviceResponseProps2>>([]);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values, { setStatus, setSubmitting, setFieldError }) => {
        // console.log('values', values);
      }}
      validationSchema={adGroupValidationSchema}
      validateOnChange={false}
      validateOnBlur={false}
      enableReinitialize={true}
    >
      {({ values, handleSubmit, handleChange, setValues, errors }) => (
        <Form onSubmit={handleSubmit}>
          <FieldArray name="adGroup">
            {({ remove, push }) => (
              <>
                {values.adGroup?.map((adGroupItem, adGroupIdx) => (
                  <AdGroup
                    categoryAndTargetResult={categoryAndTargetResult}
                    key={adGroupIdx}
                    adGroupIdx={adGroupIdx}
                    myForm={values}
                    handleChange={handleChange}
                    setValues={setValues}
                    remove={remove}
                    errors={errors}
                    mediaData={mediaData}
                    deviceData={deviceData}
                  />
                ))}
                <div className={styles.reform_page_btn}>
                  <div className={styles.inner_btn}>
                    <AdGroupButton
                      setCancelModalOn={setCancelModalOn}
                      push={push}
                      adGroupInitialValue={adGroupInitialValue}
                      myForm={values}
                    />
                  </div>
                </div>
              </>
            )}
          </FieldArray>
        </Form>
      )}
    </Formik>
  );
};

export default AdGroupPage;

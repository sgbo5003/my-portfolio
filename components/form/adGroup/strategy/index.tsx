import { FormikErrors } from 'formik';
import { Dispatch, SetStateAction } from 'react';
import styles from '../strategy/Strategy.module.scss';
import BiddingMethod from './biddingMethod';
import DailyBudget from './dailyBudget';
import PublicationMethod from './publicationMethod';
import Schedule from './schedule';

const Strategy = (props: {
  adGroupIdx: number;
  myForm: MyFormValues;
  handleChange: (e: React.ChangeEvent<any>) => void;
  setValues: (values: React.SetStateAction<MyFormValues>) => void;
  categoryAndTargetResult: Array<TargetResultType>;
  errors: FormikErrors<MyFormValues>;
  scheduleDisplayFlag: boolean;
  setScheduleDisplayFlag: Dispatch<SetStateAction<boolean>>;
  startDate: Date;
  setStartDate: Dispatch<SetStateAction<Date>>;
  endDate: Date;
  setEndDate: Dispatch<SetStateAction<Date>>;
}) => {
  const {
    adGroupIdx,
    myForm,
    handleChange,
    setValues,
    categoryAndTargetResult,
    errors,
    scheduleDisplayFlag,
    setScheduleDisplayFlag,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
  } = props;

  return (
    <>
      <div className={styles.reform_area_adgroup}>
        <h4 className={styles.reform_tit_adgroup}>집행 전략 설정</h4>
      </div>
      <BiddingMethod
        adGroupIdx={adGroupIdx}
        myForm={myForm}
        handleChange={handleChange}
        setValues={setValues}
        categoryAndTargetResult={categoryAndTargetResult}
        errors={errors}
      />
      <DailyBudget
        adGroupIdx={adGroupIdx}
        myForm={myForm}
        handleChange={handleChange}
        setValues={setValues}
        errors={errors}
      />
      <Schedule
        adGroupIdx={adGroupIdx}
        myForm={myForm}
        handleChange={handleChange}
        setValues={setValues}
        errors={errors}
        scheduleDisplayFlag={scheduleDisplayFlag}
        setScheduleDisplayFlag={setScheduleDisplayFlag}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />
      {/* <PublicationMethod
        adGroupIdx={adGroupIdx}
        myForm={myForm}
        handleChange={handleChange}
        setValues={setValues}
        categoryAndTargetResult={categoryAndTargetResult}
      /> */}
    </>
  );
};

export default Strategy;

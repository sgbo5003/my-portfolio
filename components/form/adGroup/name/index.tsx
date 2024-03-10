import { FormikErrors } from 'formik';
import styles from '../name/Name.module.scss';
import AdGroupName from './adGroupName';
import { MyFormValues } from '..';

const Name = (props: {
  adGroupIdx: number;
  myForm: MyFormValues;
  handleChange: (e: React.ChangeEvent<any>) => void;
  errors: FormikErrors<MyFormValues>;
}) => {
  const { adGroupIdx, myForm, handleChange, errors } = props;

  return (
    <>
      <div className={styles.reform_area_adgroup}>
        <h4 className={styles.reform_tit_adgroup}>이름 설정</h4>
      </div>
      <AdGroupName adGroupIdx={adGroupIdx} myForm={myForm} handleChange={handleChange} errors={errors} />
    </>
  );
};

export default Name;

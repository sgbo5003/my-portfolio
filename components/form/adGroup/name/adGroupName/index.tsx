import { FormikErrors } from 'formik';
import { useRouter } from 'next/router';
import styles from '../adGroupName/AdGroupName.module.scss';

const AdGroupName = (props: {
  adGroupIdx: number;
  myForm: MyFormValues;
  handleChange: (e: React.ChangeEvent<any>) => void;
  errors: FormikErrors<MyFormValues>;
}) => {
  const { adGroupIdx, myForm, handleChange, errors } = props;
  const router = useRouter();
  const { campaignId, adGroupId } = router.query;

  return (
    <div
      className={
        styles.reform_area_card +
        ' ' +
        (errors.adGroup?.[adGroupIdx]
          ? (errors.adGroup[adGroupIdx] as unknown as adGroupFormValues).adGroupName && styles.making_error
          : '')
      }
    >
      <h4 className={styles.reform_subtit_card}>광고그룹 이름</h4>
      <div className={styles.reform_con_card}>
        <div className={styles.reform_tit_card}>
          {errors.adGroup?.[adGroupIdx]
            ? (errors.adGroup[adGroupIdx] as unknown as adGroupFormValues).adGroupName && (
                <span className={styles.reform_txt_error}>필수 입력 항목입니다.</span>
              )
            : ''}
        </div>
        <div className={styles.reform_item_card + ' m-t-0-i'}>
          <span
            className={
              styles.box_inptxt +
              ' ' +
              styles.on_inp +
              ' ' +
              '' +
              (errors.adGroup?.[adGroupIdx]
                ? (errors.adGroup[adGroupIdx] as unknown as adGroupFormValues).adGroupName && styles.in_error
                : '')
            }
          >
            <span className={styles.num_byte}>
              <span className="screen_out">작성가능한 총 텍스트 수</span>
              {50 - myForm.adGroup[adGroupIdx].adGroupName.length}
            </span>
            <span className={styles.inner_inp}>
              <label htmlFor={`adGroupName_${adGroupIdx}`} className={styles.lab_txt}></label>
              <input
                type="text"
                id={`adGroupName_${adGroupIdx}`}
                name={`adGroup[${adGroupIdx}].adGroupName`}
                className={styles.inp_txt}
                value={myForm.adGroup[adGroupIdx].adGroupName}
                placeholder="광고그룹명을 입력해 주세요."
                onChange={(e) => {
                  handleChange(e);
                }}
                maxLength={50}
                tabIndex={undefined}
              />
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default AdGroupName;

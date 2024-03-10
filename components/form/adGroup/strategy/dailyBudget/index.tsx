import { FormikErrors } from 'formik';
import { BiHelpCircle } from 'react-icons/bi';
import styles from '../dailyBudget/DailyBudget.module.scss';
import * as fnc from '../../../../../utils/commonFunction';
import { useState } from 'react';
import { useRouter } from 'next/router';

const DailyBudget = (props: {
  adGroupIdx: number;
  myForm: MyFormValues;
  handleChange: (e: React.ChangeEvent<any>) => void;
  setValues: (values: React.SetStateAction<MyFormValues>) => void;
  errors: FormikErrors<MyFormValues>;
}) => {
  const [dailyBudgetAbsolutePosition, setDailyBudgetAbsolutePosition] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });
  const { adGroupIdx, myForm, handleChange, setValues, errors } = props;
  const router = useRouter();
  const { campaignId, adGroupId } = router.query;
  const [isDailyBudgetBoxOpen, setIsDailyBudgetBoxOpen] = useState<boolean>(false);

  // console.log('111', errors.adGroup?.[adGroupIdx].dailyBudgetAmount);

  return (
    <div
      className={
        // styles.reform_area_card + ' ' + (errors.adGroup?.[adGroupIdx].dailyBudgetAmount && styles.making_error)
        styles.reform_area_card +
        ' ' +
        (errors.adGroup?.[adGroupIdx]
          ? (errors.adGroup[adGroupIdx] as unknown as adGroupFormValues).dailyBudgetAmount && styles.making_error
          : '')
        // (errors.adGroup?.[adGroupIdx].dailyBudgetAmount ? styles.making_error : '')
        // styles.reform_area_card
      }
    >
      <h4 className={styles.reform_subtit_card}>
        일 예산
        <span
          id="dailyBudget-element"
          onMouseOver={() => {
            setIsDailyBudgetBoxOpen(true);
            fnc.getAbsolutePosition(document.getElementById('dailyBudget-element'), setDailyBudgetAbsolutePosition);
          }}
          onMouseLeave={() => setIsDailyBudgetBoxOpen(false)}
        >
          <a className={styles.link_help + ' link_g'}>
            <BiHelpCircle size={15} color="rgb(218 218 218)" />
          </a>
        </span>
      </h4>
      <div className={styles.reform_con_card}>
        <div className={styles.reform_tit_card}>
          <span className={styles.reform_txt_error}>
            {errors.adGroup?.[adGroupIdx] &&
              (errors.adGroup?.[adGroupIdx] as unknown as adGroupFormValues).dailyBudgetAmount}
          </span>
        </div>
        <div className={styles.reform_item_card + ' m-t-0-i'}>
          <div className={styles.box_budgetset}>
            <span
              className={
                styles.box_inptxt +
                ' ' +
                styles.reform_inp_num +
                ' ' +
                styles.align_r +
                '' +
                ' ' +
                (errors.adGroup?.[adGroupIdx]
                  ? (errors.adGroup[adGroupIdx] as unknown as adGroupFormValues).dailyBudgetAmount && styles.in_error
                  : '')
              }
            >
              <span className={styles.inner_inp}>
                <label htmlFor={`dailyBudgetAmount_${adGroupIdx}`} className={styles.lab_txt}></label>
                <input
                  type="text"
                  id={`dailyBudgetAmount_${adGroupIdx}`}
                  name={`adGroup[${adGroupIdx}].dailyBudgetAmount`}
                  className={styles.inp_txt}
                  value={myForm.adGroup[adGroupIdx].dailyBudgetAmount.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  onChange={(e) => {
                    const { value } = e.target;
                    let checkArr = value.split('.');
                    if (checkArr.length > 2) {
                      return;
                    }
                    let pattern = /^\d*[.]\d{4}$/;
                    if (pattern.test(value.replace(/,/g, ''))) {
                      return;
                    }
                    const onlyNumber = value.replace(/[^-\.0-9]/g, '');
                    setValues({
                      campaign: { ...myForm.campaign },
                      adGroup: myForm.adGroup.map((item, idx) =>
                        idx == adGroupIdx ? { ...item, dailyBudgetAmount: onlyNumber.replace(/,/g, '') } : item,
                      ),
                    });
                  }}
                  maxLength={11}
                  tabIndex={undefined}
                />
              </span>
            </span>
            {/* {!(
              campaignId !== undefined &&
              adGroupId !== undefined &&
              (adGroupUpdateDetailResponse?.status === 'FINISHED' ||
                adGroupUpdateDetailResponse?.status === 'ADMIN_STOP')
            ) && (
              <span className={styles.box_btnnum}>
                <a
                  className={styles.btn_gw}
                  onClick={() => {
                    setValues({
                      campaign: { ...myForm.campaign },
                      adGroup: myForm.adGroup.map((item, idx) =>
                        idx == adGroupIdx
                          ? {
                              ...item,
                              dailyBudgetAmount: String(
                                (Number(myForm.adGroup[adGroupIdx].dailyBudgetAmount) + 10).toFixed(3),
                              ),
                            }
                          : item,
                      ),
                    });
                  }}
                >
                  <span className={styles.inner_g}>
                    <span className={styles.ico_add2}>+</span>
                    $10
                  </span>
                </a>
                <a
                  className={styles.btn_gw}
                  onClick={() => {
                    setValues({
                      campaign: { ...myForm.campaign },
                      adGroup: myForm.adGroup.map((item, idx) =>
                        idx == adGroupIdx
                          ? {
                              ...item,
                              dailyBudgetAmount: String(
                                (Number(myForm.adGroup[adGroupIdx].dailyBudgetAmount) + 100).toFixed(3),
                              ),
                            }
                          : item,
                      ),
                    });
                  }}
                >
                  <span className={styles.inner_g}>
                    <span className={styles.ico_add2}>+</span>
                    $100
                  </span>
                </a>
              </span>
            )} */}
          </div>
        </div>
        <p className={styles.reform_txt_num}>
          ${fnc.addCommas(Number(myForm.adGroup[adGroupIdx].dailyBudgetAmount))}
          <span style={{ color: '#999', fontSize: '12px' }}>(VAT 포함)</span>
        </p>
      </div>
    </div>
  );
};

export default DailyBudget;

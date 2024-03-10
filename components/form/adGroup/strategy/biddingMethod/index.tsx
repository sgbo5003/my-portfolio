import { FormikErrors } from 'formik';
import { BiHelpCircle } from 'react-icons/bi';
import styles from '../biddingMethod/BiddingMethod.module.scss';
import * as fnc from '../../../../../utils/commonFunction';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { MyFormValues, TargetResultType, adGroupFormValues } from '../..';

const BiddingMethod = (props: {
  adGroupIdx: number;
  myForm: MyFormValues;
  handleChange: (e: React.ChangeEvent<any>) => void;
  setValues: (values: React.SetStateAction<MyFormValues>) => void;
  categoryAndTargetResult: Array<TargetResultType>;
  errors: FormikErrors<MyFormValues>;
}) => {
  const { adGroupIdx, myForm, handleChange, setValues, categoryAndTargetResult, errors } = props;
  const router = useRouter();
  const { campaignId, adGroupId } = router.query;
  const [bidMethodAbsolutePosition, setBidMethodAbsolutePosition] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });
  const [autoBidAbsolutePosition, setAutoBidAbsolutePosition] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });
  const [cpcAbsolutePosition, setCpcAbsolutePosition] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });
  const [cpmAbsolutePosition, setCpmAbsolutePosition] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });
  const [cpvAbsolutePosition, setCpvAbsolutePosition] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });
  const [isBidMethodBoxOpen, setIsBidMethodBoxOpen] = useState<boolean>(false);
  const [isAutoBidBoxOpen, setIsAutoBidBoxOpen] = useState<boolean>(false);
  const [isCpcBoxOpen, setIsCpcBoxOpen] = useState<boolean>(false);
  const [isCpmBoxOpen, setIsCpmBoxOpen] = useState<boolean>(false);
  const [isCpvBoxOpen, setIsCpvBoxOpen] = useState<boolean>(false);

  return (
    <>
      <div
        className={
          styles.reform_area_card +
          ' ' +
          (errors.adGroup?.[adGroupIdx]
            ? (errors.adGroup[adGroupIdx] as unknown as adGroupFormValues).bidAmount && styles.making_error
            : '')
        }
      >
        <h4 className={styles.reform_subtit_card}>
          입찰방식
          <span
            id="bidMethod-element"
            onMouseOver={() => {
              setIsBidMethodBoxOpen(true);
              fnc.getAbsolutePosition(document.getElementById('bidMethod-element'), setBidMethodAbsolutePosition);
            }}
            onMouseLeave={() => setIsBidMethodBoxOpen(false)}
          >
            <a className={styles.link_help + ' link_g'}>
              <BiHelpCircle size={15} color="rgb(218 218 218)" />
            </a>
          </span>
        </h4>
        <div className={styles.reform_con_card}>
          <div className={styles.reform_tit_card}>
            <span className={styles.reform_txt_error}>
              {errors.adGroup?.[adGroupIdx] && (errors.adGroup?.[adGroupIdx] as unknown as adGroupFormValues).bidAmount}
            </span>
            <strong className="screen_out">입찰방식 선택 목록</strong>
            {/* <ul className={styles.reform_list_radiocheck + ' ' + styles.reform_list_float}>
              {categoryAndTargetResult[1].subIndex != 'CONVERSION' && (
                <li>
                  <span className="box_radioinp">
                    <input
                      type="radio"
                      name={`adGroup[${adGroupIdx}].bidStrategy`}
                      id={`MANUAL_${adGroupIdx}`}
                      // className="inp_radio"
                      value="MANUAL"
                      checked={myForm.adGroup[adGroupIdx].bidStrategy == 'MANUAL' ? true : false}
                      onChange={(e) => {
                        console.log('pacingType', myForm.adGroup[adGroupIdx].pacingType);
                        setValues({
                          campaign: { ...myForm.campaign },
                          adGroup: myForm.adGroup.map((item, idx) =>
                            idx == adGroupIdx
                              ? {
                                  ...item,
                                  bidStrategy: e.target.value,
                                  pacingType: 'CPC',
                                  bidAmount: categoryAndTargetResult[1].subIndex == 'VISITING' ? '200' : '0',
                                }
                              : item,
                          ),
                        });
                      }}
                    />
                    <label htmlFor={`MANUAL_${adGroupIdx}`} className="lab_radio">
                      수동입찰
                    </label>
                  </span>
                </li>
              )}
              {categoryAndTargetResult[1].subIndex != 'VIEW' && (
                <li>
                  <span className="box_radioinp">
                    <input
                      type="radio"
                      name={`adGroup[${adGroupIdx}].bidStrategy`}
                      id={`AUTO_${adGroupIdx}`}
                      // className="inp_radio"
                      value="AUTO"
                      checked={myForm.adGroup[adGroupIdx].bidStrategy == 'AUTO' ? true : false}
                      onChange={(e) => {
                        setValues({
                          campaign: { ...myForm.campaign },
                          adGroup: myForm.adGroup.map((item, idx) =>
                            idx == adGroupIdx
                              ? {
                                  ...item,
                                  bidStrategy: e.target.value,
                                  pacingType: '',
                                  bidAmount: '0',
                                }
                              : item,
                          ),
                        });
                      }}
                    />
                    <label htmlFor={`AUTO_${adGroupIdx}`} className="lab_radio">
                      자동입찰
                    </label>
                  </span>
                  <span
                    id="autoBid-element"
                    onMouseOver={() => {
                      setIsAutoBidBoxOpen(true);
                      fnc.getAbsolutePosition(document.getElementById('autoBid-element'), setAutoBidAbsolutePosition);
                    }}
                    onMouseLeave={() => setIsAutoBidBoxOpen(false)}
                  >
                    <a className={styles.link_help + ' link_g'}>
                      <BiHelpCircle size={15} color="rgb(218 218 218)" />
                    </a>
                  </span>
                </li>
              )}
            </ul> */}
            <div className={styles.reform_box_radiocheck}>
              <strong className="screen_out">입찰방식 선택 목록</strong>
              {myForm.adGroup[adGroupIdx].bidStrategy == 'AUTO' ? (
                <div className={styles.reform_list_radiocheck}>
                  <li>
                    <span className="box_radioinp">
                      <input
                        type="radio"
                        name={`adGroup[${adGroupIdx}].autoBidSelect`}
                        id={`MAXIMUM_${adGroupIdx}`}
                        // className="inp_radio"
                        checked={true}
                        onChange={handleChange}
                      />
                      <label htmlFor={`MAXIMUM_${adGroupIdx}`} className="lab_radio">
                        {categoryAndTargetResult[1].subIndex == 'CONVERSION' ? '전환수 최대화' : '클릭수 최대화'}
                      </label>
                    </span>
                    <p className={styles.reform_txt_radio}>
                      광고그룹 일 예산 내에서 최대한 많은{' '}
                      {categoryAndTargetResult[1].subIndex == 'CONVERSION' ? '전환' : '클릭'}을 발생시켜 광고 효율을
                      높이도록 입찰금액을 자동으로 설정합니다.
                    </p>
                  </li>
                </div>
              ) : (
                <>
                  <div className={styles.reform_list_radiocheck + ' ' + styles.reform_list_float}>
                    {categoryAndTargetResult[1].subIndex == 'VIEW' ? (
                      <li>
                        <span className="box_radioinp">
                          <input
                            type="radio"
                            name={`adGroup[${adGroupIdx}].pacingType`}
                            id={`CPV_${adGroupIdx}`}
                            // className="inp_radio"
                            value="CPV"
                            checked={myForm.adGroup[adGroupIdx].pacingType == 'CPV' ? true : false}
                            onChange={handleChange}
                          />
                          <label htmlFor={`CPV_${adGroupIdx}`} className="lab_radio">
                            CPV
                          </label>
                        </span>
                        <span
                          id="cpv-element"
                          onMouseOver={() => {
                            setIsCpvBoxOpen(true);
                            fnc.getAbsolutePosition(document.getElementById('cpv-element'), setCpvAbsolutePosition);
                          }}
                          onMouseLeave={() => setIsCpvBoxOpen(false)}
                        >
                          <a className={styles.link_help + ' link_g'}>
                            <BiHelpCircle size={15} color="rgb(218 218 218)" />
                          </a>
                        </span>
                      </li>
                    ) : (
                      <>
                        <li>
                          <span className="box_radioinp">
                            <input
                              type="radio"
                              name={`adGroup[${adGroupIdx}].pacingType`}
                              id={`CPC_${adGroupIdx}`}
                              // className="inp_radio"
                              value="CPC"
                              checked={myForm.adGroup[adGroupIdx].pacingType == 'CPC' ? true : false}
                              onChange={(e) => {
                                setValues({
                                  adGroup: myForm.adGroup.map((item, idx) =>
                                    idx == adGroupIdx
                                      ? { ...item, bidAmount: '0.150', pacingType: e.target.value }
                                      : item,
                                  ),
                                });
                              }}
                            />
                            <label htmlFor={`CPC_${adGroupIdx}`} className="lab_radio">
                              CPC
                            </label>
                          </span>
                          <span
                            id="cpc-element"
                            onMouseOver={() => {
                              setIsCpcBoxOpen(true);
                              fnc.getAbsolutePosition(document.getElementById('cpc-element'), setCpcAbsolutePosition);
                            }}
                            onMouseLeave={() => setIsCpcBoxOpen(false)}
                          >
                            <a className={styles.link_help + ' link_g'}>
                              <BiHelpCircle size={15} color="rgb(218 218 218)" />
                            </a>
                          </span>
                        </li>
                        <li>
                          <span className="box_radioinp">
                            <input
                              type="radio"
                              name={`adGroup[${adGroupIdx}].pacingType`}
                              id={`CPM_${adGroupIdx}`}
                              // className="inp_radio"
                              value="CPM"
                              checked={myForm.adGroup[adGroupIdx].pacingType == 'CPM' ? true : false}
                              onChange={(e) => {
                                setValues({
                                  adGroup: myForm.adGroup.map((item, idx) =>
                                    idx == adGroupIdx
                                      ? { ...item, bidAmount: '1.000', pacingType: e.target.value }
                                      : item,
                                  ),
                                });
                              }}
                            />
                            <label htmlFor={`CPM_${adGroupIdx}`} className="lab_radio">
                              CPM
                            </label>
                          </span>
                          <span
                            id="cpm-element"
                            onMouseOver={() => {
                              setIsCpmBoxOpen(true);
                              fnc.getAbsolutePosition(document.getElementById('cpm-element'), setCpmAbsolutePosition);
                            }}
                            onMouseLeave={() => setIsCpmBoxOpen(false)}
                          >
                            <a className={styles.link_help + ' link_g'}>
                              <BiHelpCircle size={15} color="rgb(218 218 218)" />
                            </a>
                          </span>
                        </li>
                      </>
                    )}
                  </div>
                  <div className={styles.reform_subbox_radiocheck + ' p-l-20-i'}>
                    <div className={styles.reform_area_adbid}>
                      <div className={styles.reform_tit_card}>
                        <strong className={styles.reform_tit_detail}>입찰금액</strong>
                      </div>
                      <div className={styles.reform_item_card + ' m-t-0-i'}>
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
                              ? (errors.adGroup[adGroupIdx] as unknown as adGroupFormValues).bidAmount &&
                                styles.in_error
                              : '')
                          }
                        >
                          <span className={styles.inner_inp}>
                            <label htmlFor={`bidAmount_${adGroupIdx}`} className={styles.lab_txt}></label>
                            <input
                              type="text"
                              id={`bidAmount_${adGroupIdx}`}
                              name={`adGroup[${adGroupIdx}].bidAmount`}
                              className={styles.inp_txt}
                              value={myForm.adGroup[adGroupIdx].bidAmount.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                              onChange={(e) => {
                                const { value } = e.target;
                                const checkArr = value.split('.');
                                if (checkArr.length > 2) {
                                  return;
                                }
                                const pattern = /^\d*[.]\d{4}$/;
                                if (pattern.test(value.replace(/,/g, ''))) {
                                  return;
                                }
                                const onlyNumber = value.replace(/[^-\.0-9]/g, '');
                                setValues({
                                  adGroup: myForm.adGroup.map((item, idx) =>
                                    idx == adGroupIdx ? { ...item, bidAmount: onlyNumber.replace(/,/g, '') } : item,
                                  ),
                                });
                              }}
                              maxLength={7}
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
                                          bidAmount: String(
                                            (Number(myForm.adGroup[adGroupIdx].bidAmount) + 0.01).toFixed(3),
                                          ),
                                        }
                                      : item,
                                  ),
                                });
                              }}
                            >
                              <span className={styles.inner_g}>
                                <span className={styles.ico_add2}>+</span>
                                $0.01
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
                                          bidAmount: String(
                                            (Number(myForm.adGroup[adGroupIdx].bidAmount) + 0.1).toFixed(3),
                                          ),
                                        }
                                      : item,
                                  ),
                                });
                              }}
                            >
                              <span className={styles.inner_g}>
                                <span className={styles.ico_add2}>+</span>
                                $0.1
                              </span>
                            </a>
                          </span>
                        )} */}
                      </div>
                      <p className={styles.reform_txt_num}>
                        ${fnc.addCommas(Number(myForm.adGroup[adGroupIdx].bidAmount))}
                      </p>
                      <p className={styles.reform_desc_radiocheck}>
                        선택한 입찰방식별 지불 가능한 입찰금액을 입력하세요. 실제 과금시 VAT가 추가됩니다.
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BiddingMethod;

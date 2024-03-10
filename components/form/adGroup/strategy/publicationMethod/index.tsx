import { useState } from 'react';
import { BiHelpCircle } from 'react-icons/bi';
import styles from '../publicationMethod/PublicationMethod.module.scss';
import * as fnc from '../../../../../utils/commonFunction';
import { MyFormValues, TargetResultType } from '../..';

const PublicationMethod = (props: {
  adGroupIdx: number;
  myForm: MyFormValues;
  handleChange: (e: React.ChangeEvent<any>) => void;
  setValues: (values: React.SetStateAction<MyFormValues>) => void;
  categoryAndTargetResult: Array<TargetResultType>;
}) => {
  const [publicationMethodAbsolutePosition, setPublicationMethodAbsolutePosition] = useState<{
    top: number;
    left: number;
  }>({
    top: 0,
    left: 0,
  });
  const [quickAbsolutePosition, setQuickAbsolutePosition] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });
  const [normalAbsolutePosition, setNormalAbsolutePosition] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });
  const [isPublicationMethodBoxOpen, setIsPublicationMethodBoxOpen] = useState<boolean>(false);
  const [isQuickBoxOpen, setIsQuickBoxOpen] = useState<boolean>(false);
  const [isNormalBoxOpen, setIsNormalBoxOpen] = useState<boolean>(false);
  const { adGroupIdx, myForm, handleChange, setValues, categoryAndTargetResult } = props;
  return (
    <div className={styles.reform_area_card}>
      <h4 className={styles.reform_subtit_card}>
        게재방식
        <span
          id="publicationmethod-element"
          onMouseOver={() => {
            setIsPublicationMethodBoxOpen(true);
            fnc.getAbsolutePosition(
              document.getElementById('publicationmethod-element'),
              setPublicationMethodAbsolutePosition,
            );
          }}
          onMouseLeave={() => setIsPublicationMethodBoxOpen(false)}
        >
          <a className={styles.link_help + ' link_g'}>
            <BiHelpCircle size={15} color="rgb(218 218 218)" />
          </a>
        </span>
      </h4>
      <div className={styles.reform_con_card}>
        <div className={styles.reform_tit_card}></div>
        {categoryAndTargetResult[1].subIndex == 'VIEW' ? (
          <div className={styles.reform_item_card + ' m-t-0-i'}>
            <ul className={styles.reform_list_radiocheck}>
              <li>
                <span className={styles.box_checkinp + ' m-l-0-i'}>
                  <input
                    type="radio"
                    name={`adGroup[${adGroupIdx}].pacing`}
                    id={`inpRadiopacingQUICK_${adGroupIdx}`}
                    className={styles.inp_check}
                    value="QUICK"
                    checked={myForm.adGroup[adGroupIdx].pacing == 'QUICK' ? true : false}
                    onChange={handleChange}
                  />
                  <label htmlFor={`inpRadiopacingQUICK_${adGroupIdx}`} className={styles.lab_check}>
                    빠른 게재
                  </label>
                </span>
                <span
                  id="quick-element"
                  onMouseOver={() => {
                    setIsQuickBoxOpen(true);
                    fnc.getAbsolutePosition(document.getElementById('quick-element'), setQuickAbsolutePosition);
                  }}
                  onMouseLeave={() => setIsQuickBoxOpen(false)}
                >
                  <a className={styles.link_help + ' link_g'}>
                    <BiHelpCircle size={15} color="rgb(218 218 218)" />
                  </a>
                </span>
              </li>
              <li className="m-t-0-i">
                <span className={styles.box_checkinp + ' m-l-0-i'}>
                  <input
                    type="radio"
                    name={`adGroup[${adGroupIdx}].pacing`}
                    id={`inpRadiopacingNORMAL_${adGroupIdx}`}
                    className={styles.inp_check}
                    value="NORMAL"
                    checked={myForm.adGroup[adGroupIdx].pacing == 'NORMAL' ? true : false}
                    onChange={handleChange}
                  />
                  <label htmlFor={`inpRadiopacingNORMAL_${adGroupIdx}`} className={styles.lab_check}>
                    일반 게재
                  </label>
                </span>
                <span
                  id="normal-element"
                  onMouseOver={() => {
                    setIsNormalBoxOpen(true);
                    fnc.getAbsolutePosition(document.getElementById('normal-element'), setNormalAbsolutePosition);
                  }}
                  onMouseLeave={() => setIsNormalBoxOpen(false)}
                >
                  <a className={styles.link_help + ' link_g'}>
                    <BiHelpCircle size={15} color="rgb(218 218 218)" />
                  </a>
                </span>
              </li>
            </ul>
          </div>
        ) : (
          <div>현재 설정된 광고그룹에서는 지원하지 않습니다.</div>
        )}
      </div>
      {isPublicationMethodBoxOpen && (
        <span
          className="help_box"
          style={{
            left: `${publicationMethodAbsolutePosition.left + 5}px`,
            top: `${publicationMethodAbsolutePosition.top + 20}px`,
          }}
        >
          예산을 사용하려는 목적에 따라 게재방식을 설정할 수 있습니다. 단, 자동입찰 광고그룹인 경우, 게재방식도 시스템이
          자동으로 운영합니다.
        </span>
      )}
      {isQuickBoxOpen && (
        <span
          className="help_box"
          style={{
            left: `${quickAbsolutePosition.left + 5}px`,
            top: `${quickAbsolutePosition.top + 20}px`,
          }}
        >
          광고그룹에 설정된 일 예산을 최대한 빠르게 소진하도록 광고를 노출하는 방식입니다. 설정한 일 예산 및 입찰금액에
          따라 초과 과금이 발생할 수 있습니다.
        </span>
      )}
      {isNormalBoxOpen && (
        <span
          className="help_box"
          style={{
            left: `${normalAbsolutePosition.left + 5}px`,
            top: `${normalAbsolutePosition.top + 20}px`,
          }}
        >
          광고그룹에 설정된 일 예산을 바탕으로 시간대별로 고려된 예산을 초과하지 않도록 예산을 분할하여 광고 노출을
          제어하는 방식입니다. 단, 설정한 일 예산 및 입찰금액에 따라 초과 과금이 발생할 수 있습니다.
        </span>
      )}
    </div>
  );
};

export default PublicationMethod;

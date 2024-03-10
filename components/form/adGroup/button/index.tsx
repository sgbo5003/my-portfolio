import { useRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react';
import { AiFillPlusCircle } from 'react-icons/ai';
import styles from '../button/AdGroupButton.module.scss';
import { MyFormValues, adGroupFormValues } from '..';
const AdGroupButton = (props: {
  setCancelModalOn: Dispatch<SetStateAction<boolean>>;
  push: (obj: any) => void;
  adGroupInitialValue: adGroupFormValues;
  myForm: MyFormValues;
}) => {
  const { setCancelModalOn, push, adGroupInitialValue, myForm } = props;
  const router = useRouter();
  const { adGroupId, campaignId, adaccountId } = router.query;

  return (
    <>
      {adGroupId == undefined && myForm.adGroup.length < 5 && (
        <span className={styles.reform_btn_making}>
          <a className={'btn_gb ' + styles.btn_gb + ' gb_bl ' + styles.gb_bl} onClick={() => push(adGroupInitialValue)}>
            <span className={'inner_g ' + styles.inner_g}>
              <span className={styles.ico_comm + ' m-r-5'}>
                <AiFillPlusCircle size={20} />
              </span>
              광고그룹 추가
            </span>
          </a>
        </span>
      )}
      <>
        <button type="button" className="btn_gb" onClick={() => setCancelModalOn(true)}>
          <span className="inner_g">취소</span>
        </button>
        <button type="submit" className="btn_gb gb_bl m-l-10">
          <span className="inner_g">저장</span>
        </button>
      </>
    </>
  );
};

export default AdGroupButton;

import { useRouter } from 'next/router';
import { BsExclamationCircleFill } from 'react-icons/bs';
import styles from '../media/Media.module.scss';
import { MediaResponseProps, MyFormValues } from '../..';
const Media = (props: {
  adGroupIdx: number;
  myForm: MyFormValues;
  handleChange: (e: React.ChangeEvent<any>) => void;
  setValues: (values: React.SetStateAction<MyFormValues>) => void;
  mediaData: Array<MediaResponseProps>;
}) => {
  const { adGroupIdx, myForm, handleChange, setValues, mediaData } = props;
  const router = useRouter();
  const { campaignId, adGroupId } = router.query;

  return (
    <div className={styles.reform_area_card}>
      <h4 className={styles.reform_subtit_card}>매체</h4>
      <div className={styles.reform_con_card}>
        <div className={styles.reform_tit_card}></div>
        <div className={styles.reform_item_card + ' m-t-5-i'}>
          <ul className={styles.reform_list_radiocheck}>
            <li>
              <span className={styles.box_checkinp + ' m-t-0-i m-l-0-i'}>
                <input
                  type="radio"
                  name={`adGroup[${adGroupIdx}].allMedia`}
                  id={`mediaAll_${adGroupIdx}`}
                  className={styles.inp_check}
                  value="Y"
                  checked={myForm.adGroup[adGroupIdx].allMedia == 'Y' ? true : false}
                  onChange={(e) => {
                    handleChange(e);
                    setValues({
                      adGroup: myForm.adGroup.map((item, idx) =>
                        idx == adGroupIdx ? { ...item, allMedia: e.target.value, mediaType: mediaData } : item,
                      ),
                    });
                  }}
                />
                <label htmlFor={`mediaAll_${adGroupIdx}`} className={styles.lab_check}>
                  가능한 모든 디바이스 노출
                </label>
              </span>
            </li>
            <li className="m-t-0-i">
              <span className={styles.box_checkinp + ' m-l-0-i'}>
                <input
                  type="radio"
                  name={`adGroup[${adGroupIdx}].allMedia`}
                  id={`mediaDetail_${adGroupIdx}`}
                  className={styles.inp_check}
                  value="N"
                  checked={myForm.adGroup[adGroupIdx].allMedia == 'N' ? true : false}
                  onChange={(e) => {
                    handleChange(e);
                    setValues({
                      adGroup: myForm.adGroup.map((item, idx) =>
                        idx == adGroupIdx ? { ...item, allMedia: e.target.value, mediaType: mediaData } : item,
                      ),
                    });
                  }}
                />
                <label htmlFor={`mediaDetail_${adGroupIdx}`} className={styles.lab_check}>
                  상세 설정
                </label>
              </span>
            </li>
          </ul>
          {myForm.adGroup[adGroupIdx].allMedia == 'N' && (
            <div className={styles.box_info3}>
              <span className={styles.ico_comm}>
                <BsExclamationCircleFill className="m-r-5" />
              </span>
              광고가 노출되는 매체를 많이 선택할수록 설정한 광고목표에 도달할 수 있는 가능성이 높아집니다.
            </div>
          )}
        </div>
        {myForm.adGroup[adGroupIdx].allMedia == 'N' && (
          <div className={styles.reform_item_card}>
            <div className={styles.reform_box_radiocheck}>
              <ul className={styles.reform_list_radiocheck}>
                {mediaData.map((mediaItem, idx) => (
                  <li key={idx} className="m-t-0-i">
                    <span className={styles.box_checkinp + ' m-l-0-i m-t-0-i'}>
                      <input
                        type="checkbox"
                        name={`adGroup[${adGroupIdx}].mediaType`}
                        id={`${mediaItem.name + '_' + adGroupIdx}`}
                        className={styles.inp_check}
                        value={mediaItem.id}
                        checked={myForm.adGroup[adGroupIdx].mediaType.some((el) => el.id == mediaItem.id)}
                        onChange={(e) => {
                          if (e.target.checked == true) {
                            // const newArr = myForm.adGroup[adGroupIdx].mediaType.concat(e.target.value);
                            const newArr1: Array<MediaResponseProps> = [];
                            mediaData.map((item) => {
                              if (String(item.id) == e.target.value) {
                                return newArr1.push(item);
                              }
                            });
                            const newArr2 = myForm.adGroup[adGroupIdx].mediaType.concat(newArr1);
                            setValues({
                              adGroup: myForm.adGroup.map((item, idx) =>
                                idx == adGroupIdx ? { ...item, mediaType: newArr2 } : item,
                              ),
                            });
                          } else {
                            const newArr = myForm.adGroup[adGroupIdx].mediaType.filter(
                              (el) => String(el.id) !== e.target.value,
                            );
                            if (newArr.length == 0) {
                              return;
                            }
                          }
                        }}
                      />
                      <label htmlFor={`${mediaItem.name + '_' + adGroupIdx}`} className={styles.lab_check}>
                        {mediaItem.name}
                      </label>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Media;

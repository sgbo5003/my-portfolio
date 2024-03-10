import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from 'react-icons/md';
import styles from '../device/Device.module.scss';

interface InputProps {
  // checkbox, radio props
  inputId: string;
  value: string;
  label: string;
}

const Device = (props: {
  adGroupIdx: number;
  myForm: MyFormValues;
  handleChange: (e: React.ChangeEvent<any>) => void;
  setValues: (values: React.SetStateAction<MyFormValues>) => void;
  deviceData: Array<DeviceResponseProps2>;
  adGroupUpdateDetailResponse: AdGroupUpdateDetailResponse | undefined;
}) => {
  const { adGroupIdx, myForm, handleChange, setValues, deviceData, adGroupUpdateDetailResponse } = props;
  // 광고그룹 > 디바이스 > 디바이스 환경 설정 > display 관련
  const router = useRouter();
  const { campaignId, adGroupId } = router.query;
  const [deviceDisplayFlag, setDeviceDisplayFlag] = useState<boolean>(false);

  const deviceRadioItems: InputProps[] = [
    { inputId: 'deviceALL', value: 'Y', label: '가능한 모든 디바이스 노출' },
    { inputId: 'deviceDetail', value: 'N', label: '상세 설정' },
  ];

  const deviceItems: InputProps[] = [
    { inputId: 'PC', value: 'P', label: 'Pc' },
    { inputId: 'MOBILE', value: 'M', label: '모바일' },
  ];

  return (
    <div className={styles.reform_area_card}>
      <h4 className={styles.reform_subtit_card}>디바이스</h4>
      <div className={styles.reform_con_card}>
        <div className={styles.reform_tit_card}></div>
        <div className={styles.reform_item_card + ' m-t-0-i'}>
          <div className={styles.reform_list_radiocheck}>
            {deviceRadioItems.map((deviceRadioItem, idx) => (
              <li className={`${idx == 1 ? 'm-t-0-i' : ''}`} key={idx}>
                <span className={styles.box_checkinp + ' m-l-0-i'}>
                  <input
                    type="radio"
                    name={`adGroup[${adGroupIdx}].fullDeviceDisplay`}
                    id={`${deviceRadioItem.inputId + '_' + adGroupIdx}`}
                    className={styles.inp_check}
                    value={deviceRadioItem.value}
                    checked={myForm.adGroup[adGroupIdx].fullDeviceDisplay == deviceRadioItem.value ? true : false}
                    onChange={(e) => {
                      handleChange(e);
                      setValues({
                        campaign: { ...myForm.campaign },
                        adGroup: myForm.adGroup.map((item, idx) =>
                          idx == adGroupIdx
                            ? {
                                ...item,
                                fullDeviceDisplay: e.target.value,
                                deviceType: deviceData,
                              }
                            : item,
                        ),
                      });
                    }}
                    disabled={
                      campaignId !== undefined &&
                      adGroupId !== undefined &&
                      (adGroupUpdateDetailResponse?.status === 'FINISHED' ||
                        adGroupUpdateDetailResponse?.status === 'ADMIN_STOP')
                        ? true
                        : false
                    }
                  />
                  <label htmlFor={`${deviceRadioItem.inputId + '_' + adGroupIdx}`} className={styles.lab_check}>
                    {deviceRadioItem.label}
                  </label>
                </span>
              </li>
            ))}
          </div>
        </div>
        {myForm.adGroup[adGroupIdx].fullDeviceDisplay == 'N' && (
          <div className={styles.reform_item_card}>
            <div className={styles.reform_box_radiocheck}>
              <ul className={styles.reform_list_radiocheck}>
                {deviceItems.map((deviceItem, idx) => (
                  <React.Fragment key={idx}>
                    <li className={`${idx != 0 ? 'm-t-0-i' : ''}`}>
                      <span className={styles.box_checkinp + ' m-t-0-i m-l-0-i'}>
                        <input
                          type="checkbox"
                          name={`adGroup[${adGroupIdx}].deviceType`}
                          id={`${deviceItem.inputId + '_' + adGroupIdx}`}
                          value={deviceItem.value}
                          className={styles.inp_check}
                          checked={myForm.adGroup[adGroupIdx].deviceType.some((el) => el.type == deviceItem.value)}
                          onChange={(e) => {
                            if (e.target.checked == true) {
                              const newArr1: Array<DeviceResponseProps2> = [];
                              deviceData.map((item) => {
                                if (item.type == deviceItem.value) {
                                  return newArr1.push(item);
                                }
                              });
                              const newArr2 = myForm.adGroup[adGroupIdx].deviceType.concat(newArr1);
                              setValues({
                                campaign: { ...myForm.campaign },
                                adGroup: myForm.adGroup.map((item, idx) =>
                                  idx == adGroupIdx ? { ...item, deviceType: newArr2 } : item,
                                ),
                              });
                            } else {
                              const newArr = myForm.adGroup[adGroupIdx].deviceType.filter(
                                (el) => el.type !== e.target.value,
                              );
                              if (newArr.length == 0) {
                                return;
                              }
                              setValues({
                                campaign: { ...myForm.campaign },
                                adGroup: myForm.adGroup.map((item, idx) =>
                                  idx == adGroupIdx ? { ...item, deviceType: newArr } : item,
                                ),
                              });
                            }
                          }}
                          disabled={
                            campaignId !== undefined &&
                            adGroupId !== undefined &&
                            (adGroupUpdateDetailResponse?.status === 'FINISHED' ||
                              adGroupUpdateDetailResponse?.status === 'ADMIN_STOP')
                              ? true
                              : false
                          }
                        />
                        <label htmlFor={`${deviceItem.inputId + '_' + adGroupIdx}`} className={styles.lab_check}>
                          {deviceItem.label}
                        </label>
                      </span>
                    </li>
                    {myForm.adGroup[adGroupIdx].deviceType.some((el) => el.type == 'M') && deviceItem.value == 'M' && (
                      <>
                        <div className={styles.reform_subbox_radiocheck + ' p-10-0-i'}>
                          <ul className={styles.reform_list_radiocheck}>
                            {deviceData.map((deviceDataItem, idx) => {
                              if (deviceDataItem.type == 'M') {
                                return (
                                  <li key={idx} className={`${idx > 1 ? 'm-t-0-i' : ''}`}>
                                    <span className={styles.box_checkinp + ' ' + (idx > 1 ? 'm-t-0-i' : '')}>
                                      <input
                                        type="checkbox"
                                        name={`adGroup[${adGroupIdx}].deviceType`}
                                        id={`${deviceDataItem.name + '_' + adGroupIdx}`}
                                        className={styles.inp_check}
                                        value={deviceDataItem.name}
                                        checked={myForm.adGroup[adGroupIdx].deviceType.some(
                                          (el) => el.name == deviceDataItem.name,
                                        )}
                                        onChange={(e) => {
                                          if (e.target.checked == true) {
                                            const newArr1: Array<DeviceResponseProps2> = [];
                                            deviceData.map((item) => {
                                              if (item.name == deviceDataItem.name) {
                                                return newArr1.push(item);
                                              }
                                            });
                                            const newArr2 = myForm.adGroup[adGroupIdx].deviceType.concat(newArr1);
                                            setValues({
                                              campaign: { ...myForm.campaign },
                                              adGroup: myForm.adGroup.map((item, idx) =>
                                                idx == adGroupIdx ? { ...item, deviceType: newArr2 } : item,
                                              ),
                                            });
                                          } else {
                                            const newArr = myForm.adGroup[adGroupIdx].deviceType.filter(
                                              (el) => el.name !== e.target.value,
                                            );
                                            if (newArr.length < 1) {
                                              return;
                                            }
                                            setValues({
                                              campaign: { ...myForm.campaign },
                                              adGroup: myForm.adGroup.map((item, idx) =>
                                                idx == adGroupIdx ? { ...item, deviceType: newArr } : item,
                                              ),
                                            });
                                          }
                                        }}
                                        disabled={
                                          campaignId !== undefined &&
                                          adGroupId !== undefined &&
                                          (adGroupUpdateDetailResponse?.status === 'FINISHED' ||
                                            adGroupUpdateDetailResponse?.status === 'ADMIN_STOP')
                                            ? true
                                            : false
                                        }
                                      />
                                      <label
                                        htmlFor={`${deviceDataItem.name + '_' + adGroupIdx}`}
                                        className={styles.lab_check}
                                      >
                                        {deviceDataItem.name}
                                      </label>
                                    </span>
                                  </li>
                                );
                              }
                            })}
                          </ul>
                        </div>
                        {/* <li className="m-t-0-i">
                          <div className={styles.reform_item_card}>
                            <div className={styles.reform_box_time}>
                              <a
                                className={styles.reform_link_card}
                                onClick={() => setDeviceDisplayFlag(!deviceDisplayFlag)}
                              >
                                <span className="inner_g">
                                  디바이스 환경 설정
                                  {deviceDisplayFlag ? (
                                    <MdOutlineKeyboardArrowUp size={25} className="m-b-5" />
                                  ) : (
                                    <MdOutlineKeyboardArrowDown size={25} className="m-b-5" />
                                  )}
                                </span>
                              </a>
                              {deviceDisplayFlag && (
                                <div className={styles.reform_subbox_radiocheck + ' p-10-0-i'}>
                                  <span className={styles.box_checkinp}>
                                    <input
                                      type="checkbox"
                                      name={`adGroup[${adGroupIdx}].onlyWifiDisplay`}
                                      id={`checkDevice_${adGroupIdx}`}
                                      className={styles.inp_check}
                                      checked={myForm.adGroup[adGroupIdx].onlyWifiDisplay}
                                      onChange={handleChange}
                                    />
                                    <label htmlFor={`checkDevice_${adGroupIdx}`} className={styles.lab_check}>
                                      WIFI에서만 노출
                                    </label>
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </li> */}
                      </>
                    )}
                  </React.Fragment>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Device;

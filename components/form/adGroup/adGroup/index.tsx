import { useState } from 'react';
import styles from '../../adGroup/AdGroup.module.scss';
import { AiOutlineClose } from 'react-icons/ai';
import DeviceAndMedia from '../deviceAndMedia';
import Strategy from '../strategy';
import Name from '../name';
import Modal from '../../../modal';
import { addDays } from 'date-fns';
import Swal from 'sweetalert2';

const AdGroup = (props: {
  categoryAndTargetResult: Array<TargetResultType>;
  adGroupIdx: number;
  myForm: MyFormValues;
  handleChange: (e: React.ChangeEvent<any>) => void;
  setValues: (values: React.SetStateAction<MyFormValues>) => void;
  remove<T>(index: number): T | undefined;
  errors: FormikErrors<MyFormValues>;
  mediaData: Array<MediaResponseProps>;
  deviceData: Array<DeviceResponseProps2>;
}) => {
  const {
    categoryAndTargetResult,
    adGroupIdx,
    myForm,
    handleChange,
    setValues,
    remove,
    errors,
    mediaData,
    deviceData,
  } = props;

  const [adGroupDisplay, setAdGroupDisplay] = useState<Array<number>>([]); // 광고그룹 display 관련
  const [cancelModalOn, setCancelModalOn] = useState<boolean>(false); // 취소 버튼 클릭 시 모달
  const [scheduleDisplayFlag, setScheduleDisplayFlag] = useState<boolean>(false);
  const [startDate, setStartDate] = useState(addDays(new Date(), 1));
  const [endDate, setEndDate] = useState(
    new Date(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()),
  );

  return (
    <div
      className={
        styles.reform_group_border +
        (adGroupDisplay.includes(adGroupIdx) ? ' ' + styles.hide_all : ' m-b-5') +
        ` ${adGroupIdx}`
      }
    >
      <div className={styles.reform_area_making}>
        <div className="screen_out">광고그룹</div>
        <div className={styles.dsp_tit}>
          <div className={styles.tit_dsp}>
            <h3 className={styles.reform_tit_subject}>
              {/* 광고그룹 */}
              {`광고그룹${adGroupIdx + 1}`}
            </h3>
            <div className={styles.tit_delbtn}>
              <a className={styles.btn_making_del2} onClick={() => setCancelModalOn(true)}>
                <AiOutlineClose color="rgb(169 169 169)" size={18} className="m-l-5" style={{ marginTop: '4px' }} />
              </a>
            </div>
          </div>
          {/* {!adGroupDisplay.includes(adGroupIdx) && (
                        <div className={styles.f_right + (adGroupId !== undefined ? ' ' + styles.nobtn : '')}>
                          <a href="#!" className={styles.link_help5}>
                            <span className={styles.ico_comm}>
                              <IoInformationCircle size={20} className="m-r-3" />
                            </span>
                            도움말
                          </a>
                        </div>
                      )} */}
        </div>

        <div
          className={
            styles.reform_group_card +
            (adGroupDisplay.includes(adGroupIdx) ? ' ' + styles.hide_all_desc : '') +
            (adGroupDisplay.includes(adGroupIdx) && errors.adGroup?.[adGroupIdx]
              ? (errors.adGroup[adGroupIdx] as unknown as adGroupFormValues).dailyBudgetAmount &&
                ' ' + styles.making_error
              : '')
          }
        >
          {adGroupDisplay.includes(adGroupIdx) ? (
            <>
              <p className={styles.reform_desc_card}>{myForm.adGroup[adGroupIdx].adGroupName}</p>
              {errors.adGroup?.[adGroupIdx]
                ? (errors.adGroup[adGroupIdx] as unknown as adGroupFormValues).dailyBudgetAmount && (
                    <span className={styles.reform_txt_error}>설정 정보 오류</span>
                  )
                : ''}
            </>
          ) : (
            <>
              {/* <Audience
                            categoryAndTargetResult={categoryAndTargetResult}
                            sdkSelectOptions={sdkSelectOptions}
                            setSdkSelectOptions={setSdkSelectOptions}
                            sdkOptionsInfo={sdkOptionsInfo}
                            adGroupIdx={adGroupIdx}
                            myForm={myForm}
                            handleChange={handleChange}
                            setValues={setValues}
                          /> */}
              <DeviceAndMedia
                adGroupIdx={adGroupIdx}
                myForm={myForm}
                handleChange={handleChange}
                setValues={setValues}
                mediaData={mediaData}
                deviceData={deviceData}
              />
              <Strategy
                adGroupIdx={adGroupIdx}
                myForm={myForm}
                handleChange={handleChange}
                setValues={setValues}
                categoryAndTargetResult={categoryAndTargetResult}
                errors={errors}
                scheduleDisplayFlag={scheduleDisplayFlag}
                setScheduleDisplayFlag={setScheduleDisplayFlag}
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
              />
              <Name adGroupIdx={adGroupIdx} myForm={myForm} handleChange={handleChange} errors={errors} />
            </>
          )}
        </div>
      </div>
      <Modal
        isOpen={cancelModalOn}
        setIsOpen={setCancelModalOn}
        headerBorderBottom={false}
        height={'200'}
        width={'420'}
        bodyTextAlign={'center'}
      >
        <strong className={styles.tit_layer}>광고그룹 삭제</strong>
        <p className={styles.txt_layer}>선택한 광고그룹을 삭제하시겠습니까?</p>
        <div className={styles.btn_group}>
          <button
            type="button"
            className="btn_gm"
            onClick={() => {
              setCancelModalOn(false);
            }}
          >
            <span className="inner_g">취소</span>
          </button>
          <button
            type="button"
            className="btn_gm gm_bl m-l-10"
            onClick={() => {
              if (adGroupIdx == 0) {
                const Toast = Swal.mixin({
                  toast: true,
                  position: 'bottom-right',
                  showConfirmButton: false,
                  timer: 1500,
                  timerProgressBar: true,
                  // didOpen: (toast) => {
                  //   toast.addEventListener('mouseenter', Swal.stopTimer);
                  //   toast.addEventListener('mouseleave', Swal.resumeTimer);
                  // },
                });
                Toast.fire({
                  icon: 'warning',
                  title: `광고그룹이 한개일시 삭제할 수 없습니다.`,
                }).then((result) => {
                  setCancelModalOn(false);
                });
              } else {
                setCancelModalOn(false);
                remove(adGroupIdx);
              }
            }}
          >
            <span className="inner_g">확인</span>
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default AdGroup;

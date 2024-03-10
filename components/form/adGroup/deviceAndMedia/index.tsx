import styles from '../deviceAndMedia/DeviceAndMedia.module.scss';
import Device from './device';
import Media from './media';
const DeviceAndMedia = (props: {
  adGroupIdx: number;
  myForm: MyFormValues;
  handleChange: (e: React.ChangeEvent<any>) => void;
  setValues: (values: React.SetStateAction<MyFormValues>) => void;
  mediaData: Array<MediaResponseProps>;
  deviceData: Array<DeviceResponseProps2>;
}) => {
  const { adGroupIdx, myForm, handleChange, setValues, mediaData, deviceData } = props;

  return (
    <>
      <div className={styles.reform_area_adgroup}>
        <h4 className={styles.reform_tit_adgroup}>{`집행 대상 설정 > 매체 및 디바이스`}</h4>
      </div>
      <Device
        adGroupIdx={adGroupIdx}
        myForm={myForm}
        handleChange={handleChange}
        setValues={setValues}
        deviceData={deviceData}
      />
      <Media
        adGroupIdx={adGroupIdx}
        myForm={myForm}
        handleChange={handleChange}
        setValues={setValues}
        mediaData={mediaData}
      />
    </>
  );
};

export default DeviceAndMedia;

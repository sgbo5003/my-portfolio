import styles from '../button/CamaignGroupSaveButton.module.scss';
interface CampaignButtonProps {
  title: string;
  type: 'button' | 'submit' | 'reset' | undefined;
  handleOnCancelBtnClick: () => void;
  handleOnCreateBtnClick?: () => void;
  handleOnCreateBtnSubmit?: () => void;
}

const CamaignGroupSaveButton = ({
  title,
  type,
  handleOnCancelBtnClick,
  handleOnCreateBtnClick,
  handleOnCreateBtnSubmit,
}: CampaignButtonProps) => {
  return (
    <div className={styles.reform_page_btn}>
      <div className={styles.inner_btn}>
        <button type="button" className="btn_gb f-left" onClick={handleOnCancelBtnClick}>
          <span className="inner_g">취소</span>
        </button>
        <button
          type={type}
          className="btn_gb gb_bl f-left m-l-10"
          onClick={handleOnCreateBtnClick}
          onSubmit={handleOnCreateBtnSubmit}
        >
          <span className="inner_g">{title}</span>
        </button>
      </div>
    </div>
  );
};
export default CamaignGroupSaveButton;

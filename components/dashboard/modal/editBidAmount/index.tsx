import { Dispatch, SetStateAction } from 'react';
import styles from '../editBidAmount/EditBidAmountModal.module.scss';

const EditBidAmountModal = (props: { setEditBidAmountModalOn: Dispatch<SetStateAction<boolean>> }) => {
  const { setEditBidAmountModalOn } = props;

  return (
    <div className={styles.modifybudget_wrap + ' basic_layer'}>
      <div className={styles.layer_body + ' layer_body'}>
        <p className={styles.txt_copy}>
          수정할 입찰방식과 금액을 입력하세요.
          <br />
          선택한 입찰방식과 일치한 광고그룹만 입력한 값으로 일괄 수정됩니다.
        </p>
        <br />
        <strong className={styles.tit_copy}>
          입찰금액 수정 가능한 광고그룹<span className="color-326edc">1</span>개
        </strong>
        <table className={styles.tbl_layer}>
          <caption className={styles.hide_caption}>수정할 입찰금액 정보 표</caption>
          <colgroup>
            <col width={160} />
            <col />
          </colgroup>
          <tbody>
            <tr className={styles.tr_box2}>
              <th scope="row">입찰방식</th>
              <td>
                <div className={styles.inner_cell}>
                  <div className={styles.wrap_selinp}>
                    <span className={styles.box_radioinp + ' box_radioinp'}>
                      <input type="radio" name="CPM" id="CPM" />
                      <label htmlFor="CPM" className={styles.lab_radio + ' lab_radio'}>
                        CPM
                      </label>
                    </span>
                  </div>
                </div>
              </td>
            </tr>
            <tr className={styles.tr_box2}>
              <th scope="row">캠페인 유형</th>
              <td>
                <div className={styles.inner_cell}>
                  <div className={styles.wrap_selinp}>
                    <span className={styles.box_radioinp + ' box_radioinp'}>
                      <input type="radio" name="DISPLAY" id="DISPLAY" />
                      <label htmlFor="DISPLAY" className={styles.lab_radio + ' lab_radio'}>
                        디스플레이
                      </label>
                    </span>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">입찰금액</th>
              <td>
                <div className={styles.inner_cell}>
                  <span className={styles.box_inptxt + ' box_inptxt reform_inp_num align_r'}>
                    <span className="inner_inp">
                      <label htmlFor="bidAmountInp"></label>
                      <input
                        type="text"
                        id="bidAmountInp"
                        name="bidAmountInp"
                        maxLength={13}
                        className="inp_txt"
                        inputMode="numeric"
                      />
                    </span>
                  </span>
                  <span className={styles.box_btnnum + ' box_btnnum'}>
                    <a className="btn_gw">
                      <span className="inner_g">
                        <span className="ico_add2">+</span>10원
                      </span>
                    </a>
                    <a className="btn_gw">
                      <span className="inner_g">
                        <span className="ico_add2">+</span>100원
                      </span>
                    </a>
                  </span>
                  <p className={styles.reform_txt_num}>원</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="layer_foot">
        <div className="btn_group">
          <button type="button" className="btn_gm">
            <span className="inner_g">취소</span>
          </button>
          <button type="submit" className="btn_gm gm_bl">
            <span className="inner_g">저장</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditBidAmountModal;

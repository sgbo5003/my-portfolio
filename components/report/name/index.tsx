import { FormikErrors } from 'formik';
import { useState } from 'react';
import { InitialFormValueProps } from '../../../pages/report';

const CustomReportName = (props: {
  values: InitialFormValueProps;
  handleChange: (e: React.ChangeEvent<any>) => void;
  errors: FormikErrors<InitialFormValueProps>;
}) => {
  const { values, handleChange, errors } = props;
  const [reportNameFocus, setReportNameFocus] = useState<boolean>(false);

  return (
    <>
      <h4 className="subtit_subject" style={{ marginTop: '10px' }}>
        맞춤보고서 이름
      </h4>
      <div className="itembox_wrap">
        <table className="itembox_set itembox_set_type3">
          <colgroup>
            <col />
            <col />
          </colgroup>
          <tbody>
            <tr>
              <th scope="row">
                <div className="inner_cell">맞춤보고서 이름</div>
              </th>
              <td>
                <div className="inner_cell">
                  <span
                    className={`box_inptxt box_reportname ${errors.reportName ? 'in_error' : ''} ${
                      reportNameFocus ? 'on' : ''
                    } `}
                  >
                    <span className="num_byte">{50 - values.reportName.length}</span>
                    <span className="inner_inp">
                      <label htmlFor="inpCustomNameTxt" className="lab_txt">
                        {values.reportName == '' && <>맞춤보고서 이름을 입력하세요.</>}
                      </label>
                      <input
                        id="inpCustomNameTxt"
                        name="reportName"
                        type="text"
                        className="inp_txt"
                        value={values.reportName}
                        maxLength={50}
                        onChange={handleChange}
                        onFocus={() => setReportNameFocus(true)}
                        onBlur={() => setReportNameFocus(false)}
                      />
                    </span>
                  </span>
                  {errors.reportName && <p className="txt_error">맞춤보고서 이름을 입력하세요.</p>}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CustomReportName;

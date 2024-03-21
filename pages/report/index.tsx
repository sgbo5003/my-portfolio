import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import * as fnc from '../../utils/commonFunction';
import { subDays } from 'date-fns';
import { useFormik } from 'formik';
// import PaginationButton from '@components/common/paginationButton';
import {
  adaccountHeaderColumns,
  costIndicatorHeaderColumns,
  HeaderColumnsType,
  responseAdAccountDailyDataContent,
  responseAdAccountDataContent,
  responseAdGroupDailyDataContent,
  responseAdGroupDailyDataContent2,
  responseAdGroupDataContent,
  responseCampaignDailyDataContent,
  responseCampaignDailyDataContent2,
  responseCampaignDataContent,
  responseCreativeDailyDataContent,
  responseCreativeDailyDataContent2,
  responseCreativeDataContent,
} from '../../components/report/items/CustomReportItems';
import * as Yup from 'yup';
import CustomReportHead from '../../components/report/head';
import CustomReportTable, { CustomReportAdAccountSearchResponse } from '../../components/report/table';
import CustomReportName from '../../components/report/name';
// import { api } from '@api/index';
// import { PageDto } from '@api/dto';
import ReactLoading from 'react-loading';
import { TableNode } from '@table-library/react-table-library/table';
import { GetStaticPaths } from 'next';

export interface InitialFormValueProps {
  categorySelectVal: { id: number; label: string; value: string };
  statusCheckVal: string[];
  indicatorCheckVal: string[];
  reportName: string;
}

export interface PageDto<T> {
  totalPage: number;
  currentPage: number;
  totalCount: number;
  currentCount: number;
  isFirst: boolean;
  isLast: boolean;
  hasNext: boolean;
  isEmpty: boolean;
  sort: { empty: boolean; sorted: boolean; unsorted: boolean };
  content: T[];
}

const initData: PageDto<CustomReportAdAccountSearchResponse> = {
  content: [],
  isFirst: true,
  totalPage: 0,
  currentCount: 0,
  currentPage: 1,
  hasNext: false,
  isEmpty: true,
  isLast: true,
  sort: {
    sorted: false,
    empty: true,
    unsorted: true,
  },
  totalCount: 0,
};

const CustomReportPage = () => {
  const router = useRouter();
  const { adaccountId, page } = router.query;
  const [pageSize, setPageSize] = useState(5);

  const [reportDate, setReportDate] = useState<Array<{ startDate: string; endDate: string }>>([
    { startDate: fnc.dateAsYYYYMMDD(subDays(new Date(), 7)), endDate: fnc.dateAsYYYYMMDD(new Date()) },
  ]);

  const adaccountHeaderColumns: HeaderColumnsType[] = [
    {
      columnIndex: 'reportDate',
      columnName: '기간',
      width: '20%',
    },
    {
      columnIndex: 'impression',
      columnName: '노출수',
      width: '20%',
    },
    {
      columnIndex: 'click',
      columnName: '클릭',
      width: '20%',
    },
    {
      columnIndex: 'ctr',
      columnName: '클릭률',
      width: '20%',
    },
    {
      columnIndex: 'cost',
      columnName: '비용',
      width: '20%',
    },
  ];

  const initialValues: InitialFormValueProps = {
    categorySelectVal: { id: 1, label: '광고계정', value: 'AD_ACCOUNT' },
    statusCheckVal: ['ON', 'OFF', 'DEL'],
    indicatorCheckVal: ['costIndicator', 'defaultIndicator'],
    reportName: '',
  };

  const validationSchema = Yup.object({
    reportName: Yup.string().max(50, '최대 50자 이하로 입력해주세요.').required('맞춤보고서 이름을 입력하세요.'),
  });

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values, { setSubmitting }) => {
      // const submitObj: CustomReportSaveRequest = {
      //   adAccountId: Number(adaccountId),
      //   name: values.reportName,
      //   reportLevel: values.categorySelectVal.value,
      //   configs: values.statusCheckVal,
      //   indicators:
      //     values.categorySelectVal.value === 'AD_ACCOUNT'
      //       ? ['costIndicator', 'defaultIndicator']
      //       : values.indicatorCheckVal,
      //   startDate: reportDate[0].startDate.replace(/-/gi, ''),
      //   endDate: reportDate[0].endDate.replace(/-/gi, ''),
      // };
      // // console.log('submitObj', submitObj);
      // try {
      //   setSubmitting(true);
      //   await api.post('/report/custom', submitObj);
      //   await router.replace(`/${adaccountId}/report/customreport/all`);
      // } catch (e) {
      //   // ErrorFunc(e);
      // }
    },
  });
  const [headerColumns, setHeaderColumns] = useState<Array<HeaderColumnsType>>(
    adaccountHeaderColumns.concat(costIndicatorHeaderColumns),
  );
  const [gridTamplateColumns, setGridTemplateColumns] = useState<string>('');
  const [customReportResponse, setCustomReportResponse] =
    useState<PageDto<CustomReportAdAccountSearchResponse>>(initData);
  const [customReportTableData, setCustomReportTableData] = useState<{
    nodes: any[];
  }>({ nodes: [] });
  const [loading, setLoading] = useState(false);

  const getCustomReportAdAccountSearch = async (
    categoryVal: string,
    startDate: string,
    endDate: string,
    statusVal: string[],
  ) => {
    // setLoading(true);
    // try {
    //   const response = await api.post<PageDto<CustomReportAdAccountSearchResponse>>(
    //     `/report/custom/${
    //       categoryVal === 'CAMPAIGN'
    //         ? 'campaigns'
    //         : categoryVal === 'AD_GROUP'
    //         ? 'adGroups'
    //         : categoryVal === 'CREATIVE'
    //         ? 'creatives'
    //         : 'adAccounts'
    //     }`,
    //     {
    //       adAccountId: adaccountId,
    //       reportLevel: categoryVal === '' ? formik.values.categorySelectVal.value : categoryVal,
    //       configs: statusVal,
    //       indicators: formik.values.indicatorCheckVal,
    //       startDate,
    //       endDate,
    //     },
    //     {
    //       params: {
    //         page: page ?? 1,
    //         size: pageSize,
    //       },
    //     },
    //   );
    //   // console.log('response1', response.data);
    //   response.data.content = [
    //     {
    //       id: 1,
    //       adAccountId: 1,
    //       adAccountName: 'ac1',
    //       adTypeAndGoal: null,
    //       campaignId: null,
    //       campaignName: null,
    //       campaignUserConfig: null,
    //       adGroupId: null,
    //       adGroupName: null,
    //       adGroupUserConfig: null,
    //       creativeId: null,
    //       creativeName: null,
    //       creativeUserConfig: null,
    //       representativeId: null,
    //       startDate: 20221228,
    //       endDate: 20230109,
    //       report: {
    //         cost: 1393448,
    //         impression: 1118680,
    //         click: 6287,
    //         reach: 0,
    //         videoAutoPlay: 0,
    //         videoTouches: 0,
    //         videoUnmute: 0,
    //         videoPlay3Seconds: 0,
    //         videoPlay5Seconds: 0,
    //         videoPlay10Seconds: 0,
    //         videoPlay15Seconds: 0,
    //         videoPlay30Seconds: 0,
    //         videoPlay60Seconds: 0,
    //         videoPlay25Percent: 0,
    //         videoPlay50Percent: 0,
    //         videoPlay75Percent: 0,
    //         videoPlay100Percent: 0,
    //         signUpDay1: 0,
    //         signUpDay7: 0,
    //         purchaseDay1: 0,
    //         purchaseDay7: 0,
    //         viewCartDay1: 0,
    //         viewCartDay7: 0,
    //         ctr: 0,
    //         cpm: 124,
    //         cpc: 22163,
    //         reachRate: 0,
    //         videoPlayRate: 0,
    //       },
    //     },
    //   ];
    //   response.data.content = response.data.content.map((item: any) => ({ ...item, depthActive: false }));
    //   console.log('response.data.content', response.data.content);
    //   await setCustomReportResponse(response.data);
    //   await setLoading(false);
    //   await setCustomReportTableData({ nodes: response.data.content });
    // } catch (e) {
    //   //   ErrorFunc(e);
    // }
    let responseDataContent =
      categoryVal === 'CAMPAIGN'
        ? responseCampaignDataContent
        : categoryVal === 'AD_GROUP'
        ? responseAdGroupDataContent
        : categoryVal === 'CREATIVE'
        ? responseCreativeDataContent
        : responseAdAccountDataContent;
    responseDataContent = responseDataContent.map((item: any) => ({ ...item, depthActive: false }));
    await setCustomReportTableData({ nodes: responseDataContent });
  };

  const getCustomReportAdAccountDailySearch = async (item: TableNode, idx: number) => {
    // try {
    //   let requestObj = {};
    //   if (formik.values.categorySelectVal.value === 'AD_ACCOUNT') {
    //     requestObj = {
    //       adAccountId: item.adAccountId,
    //       startDate: item.startDate,
    //       endDate: item.endDate,
    //     };
    //   } else if (formik.values.categorySelectVal.value === 'CAMPAIGN') {
    //     requestObj = {
    //       campaignId: item.campaignId,
    //       startDate: item.startDate,
    //       endDate: item.endDate,
    //     };
    //   } else if (formik.values.categorySelectVal.value === 'AD_GROUP') {
    //     requestObj = {
    //       adGroupId: item.adGroupId,
    //       startDate: item.startDate,
    //       endDate: item.endDate,
    //     };
    //   } else if (formik.values.categorySelectVal.value === 'CREATIVE') {
    //     requestObj = {
    //       creativeId: item.creativeId,
    //       startDate: item.startDate,
    //       endDate: item.endDate,
    //     };
    //   }
    //   const response = await api.post<PageDto<CustomReportAdAccountSearchResponse>>(
    //     `/report/custom/${
    //       formik.values.categorySelectVal.value === 'CAMPAIGN'
    //         ? 'campaigns'
    //         : formik.values.categorySelectVal.value === 'AD_GROUP'
    //         ? 'adGroups'
    //         : formik.values.categorySelectVal.value === 'CREATIVE'
    //         ? 'creatives'
    //         : 'adAccounts'
    //     }/daily`,
    //     requestObj,
    //   );
    //   // console.log('response2', response.data);
    //   response.data.content = response.data.content.map((item: any) => ({ ...item, depth: 2 }));
    //   const newArr = JSON.parse(JSON.stringify([...customReportTableData.nodes]));
    //   newArr.map((newArrItem: any, newArrIdx: number) => {
    //     if (idx === newArrIdx) {
    //       return (newArrItem.depthActive = !newArrItem.depthActive);
    //     }
    //   });
    //   for (let i = 0; i < response.data.content.length; i++) {
    //     newArr.splice(idx + 1, 0, response.data.content[i]);
    //     idx++;
    //   }
    //   setCustomReportTableData({ nodes: newArr });
    // } catch (e) {
    //   //   ErrorFunc(e);
    // }
    // console.log('idx', idx);
    let responseDataContent =
      formik.values.categorySelectVal.value === 'CAMPAIGN'
        ? idx === 0
          ? responseCampaignDailyDataContent
          : responseCampaignDailyDataContent2
        : formik.values.categorySelectVal.value === 'AD_GROUP'
        ? idx === 0
          ? responseAdGroupDailyDataContent
          : responseAdGroupDailyDataContent2
        : formik.values.categorySelectVal.value === 'CREATIVE'
        ? idx === 0
          ? responseCreativeDailyDataContent
          : responseCreativeDailyDataContent2
        : responseAdAccountDailyDataContent;
    responseDataContent = responseDataContent.map((item: any) => ({ ...item, depth: 2 }));
    const newArr = JSON.parse(JSON.stringify([...customReportTableData.nodes]));
    newArr.map((newArrItem: any, newArrIdx: number) => {
      if (idx === newArrIdx) {
        return (newArrItem.depthActive = !newArrItem.depthActive);
      }
    });
    for (let i = 0; i < responseDataContent.length; i++) {
      newArr.splice(idx + 1, 0, responseDataContent[i]);
      idx++;
    }
    setCustomReportTableData({ nodes: newArr });
  };

  useEffect(() => {
    let newString = '';
    for (let i = 0; i < adaccountHeaderColumns.length; i++) {
      newString += adaccountHeaderColumns[i].width + ' ';
    }
    setGridTemplateColumns(newString);
    setHeaderColumns(adaccountHeaderColumns);
  }, []);

  useEffect(() => {
    if (!router.isReady) return;
    getCustomReportAdAccountSearch(
      formik.values.categorySelectVal.value,
      reportDate[0].startDate.replace(/-/gi, ''),
      reportDate[0].endDate.replace(/-/gi, ''),
      formik.values.statusCheckVal,
    );
  }, [router.isReady, page, pageSize]);

  return (
    <div className="report_wrap">
      <form onSubmit={formik.handleSubmit}>
        <div className="dsp_tit">
          <div className="tit_dsp">
            <h3 className="tit_subject">맞춤보고서 만들기</h3>
            <strong className="sub_title">사용자1</strong>
            <span className="sub_code">1</span>
            <div className="f_right f-right">
              {/* <a href="#!" className="link_help5">
                <span>
                  <IoInformationCircle size={20} className="m-r-3" />
                </span>
                도움말
              </a> */}
            </div>
          </div>
        </div>
        <div className="set_table">
          <CustomReportHead
            values={formik.values}
            setValues={formik.setValues}
            handleChange={formik.handleChange}
            setCustomReportTableData={setCustomReportTableData}
            setGridTemplateColumns={setGridTemplateColumns}
            headerColumns={headerColumns}
            setHeaderColumns={setHeaderColumns}
            reportDate={reportDate}
            setReportDate={setReportDate}
            getCustomReportAdAccountSearch={getCustomReportAdAccountSearch}
          />
          {loading ? (
            <div className="tbl_g">
              <div className="table_loading_area">
                <ReactLoading type={'bubbles'} color={'#326edc'} width={80} height={80} className="loading_bubble" />
              </div>
            </div>
          ) : (
            <>
              <CustomReportTable
                values={formik.values}
                headerColumns={headerColumns}
                gridTamplateColumns={gridTamplateColumns}
                customReportTableData={customReportTableData}
                setCustomReportTableData={setCustomReportTableData}
                getCustomReportAdAccountDailySearch={getCustomReportAdAccountDailySearch}
              />
              <div className="set_foot">
                <div className="paging_wrap">
                  <div className="inner_paging">
                    {/* <PaginationButton
                      totalPage={customReportResponse.totalPage}
                      currentPage={customReportResponse.currentPage}
                      totalCount={customReportResponse.totalCount}
                      size={pageSize}
                      baseUrl={`/${adaccountId}/report/customreport`}
                      params={''}
                    /> */}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        <CustomReportName values={formik.values} handleChange={formik.handleChange} errors={formik.errors} />
        <div className="page_btn">
          <div className="inner_btn">
            <a className="btn_gb" onClick={() => router.replace(`/${adaccountId}/report/customreport/all`)}>
              <span className="inner_g">취소</span>
            </a>
            <button type="submit" className="btn_gb gb_bl">
              <span className="inner_g">저장</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CustomReportPage;

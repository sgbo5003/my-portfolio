import { useEffect, useRef, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { MdClose, MdKeyboardArrowRight } from 'react-icons/md';
import { useFormik } from 'formik';
// import { AxiosError } from 'axios';
// import { ErrorDto } from '@api/dto';
import { useRouter } from 'next/router';
import * as adFnc from '../../utils/adFunction';
import {
  checkboxListItems,
  CheckboxListProps,
  filter1DepthItems,
  Filter1DepthProps,
  filter2DepthItems,
  Filter2DepthProps,
  filter3DepthItems,
  Filter3DepthProps,
  filterSelectRangeOptions,
} from './items/FilterItems';

interface FilterRequestProps {
  filter_index: string;
  filter1_depth_id?: number;
  inpType: string;
  inpTitle: string;
}

interface FilterFormValues {
  inpValue: string; // input box
  checkboxValue: string[]; // checkbox
  selectValue: { label: string; value: string }; // 이상, ge || 이하, le || 같음, eq
}

interface FilterResultProps {
  filter_index: string;
  range: string;
  value: string;
  valueLabel: string;
  title: string;
}

const Filter = () => {
  const router = useRouter();
  const { page, filter } = router.query;
  const [filterSearchBoxFocus, setFilterSearchBoxFocus] = useState<boolean>(false);
  const [filterSearchInpFocus, setFilterSearchInpFocus] = useState<boolean>(false);
  const [filter1depthActive, setFilter1depthActive] = useState<Filter1DepthProps | undefined>({
    id: 0,
    filter_name: '',
    filter_index: '',
    has2depth: false,
  });
  const [filter2depthActive, setFilter2depthActive] = useState<Filter2DepthProps>({
    id: 0,
    filter1_depth_id: 0,
    filter_name: '',
    filter_index: '',
    has3depth: false,
  });
  const [filter3depthActive, setFilter3depthActive] = useState<Filter3DepthProps>({
    id: 0,
    filter1_depth_id: 0,
    filter2_depth_id: 0,
    filter_name: '',
    filter_index: '',
    formatTitle: '',
  });
  const [depth2FormatOn, setDepth2FormatOn] = useState<boolean>(false);
  const [filterFormat, setFilterFormat] = useState<FilterRequestProps>({
    filter_index: '',
    filter1_depth_id: 0,
    inpType: '',
    inpTitle: '',
  });
  const [filterFormatInpFocus, setFilterFormatInpFocus] = useState<boolean>(false);
  const [filterResult, setFilterResult] = useState<Array<FilterResultProps>>([]);
  const [filterHeight, setFilterHeight] = useState(47);
  const [filterWidth, setFilterWidth] = useState(30);
  const [showFilterSelect, setShowFilterSelect] = useState<boolean>(false); // 필터 select display 관련
  const filterSearchBoxRef = useRef<HTMLDivElement>(null);
  const filterSearchSpanRef = useRef<HTMLSpanElement>(null);
  const filterDivRef = useRef<HTMLDivElement>(null);
  const filterFormatDivRef = useRef<HTMLDivElement>(null);
  const filterResultDivRef = useRef<HTMLDivElement>(null);
  const filterSelectRef = useRef<HTMLDivElement>(null);

  const filter1DepthItems: Array<Filter1DepthProps> = [
    { id: 1, filter_name: '이름', filter_index: 'name', has2depth: true },
    { id: 2, filter_name: 'ON/OFF', filter_index: 'status', has2depth: true },
  ];

  const filter3DepthItems: Array<Filter3DepthProps> = [
    {
      id: 1,
      filter1_depth_id: 8,
      filter2_depth_id: 13,
      filter_name: '비용',
      filter_index: 'campaign.campaign_indicator.COST',
      inpType: 'I&P(N)&S',
      formatTitle: '캠페인 비용',
    },
  ];

  const checkboxListItems: Array<CheckboxListProps> = [
    {
      id: 1,
      inpId: 'check|filterCondition|onOff|ON',
      inpLabel: 'ON',
      inpValue: 'ON',
      inpType: 'S(ON/OFF)',
    },
    {
      id: 2,
      inpId: 'check|filterCondition|onOff|OFF',
      inpLabel: 'OFF',
      inpValue: 'OFF',
      inpType: 'S(ON/OFF)',
    },
  ];

  const filterSelectRangeOptions: { label: string; value: string }[] = [
    { label: '이상', value: 'GTE' },
    { label: '이하', value: 'LTE' },
    { label: '같음', value: 'EQ' },
  ];

  const initialValues: FilterFormValues = {
    inpValue: '',
    checkboxValue: [],
    selectValue: { label: '이상', value: 'GTE' },
  };

  const formik = useFormik({
    initialValues,
    // validationSchema: signupSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      // console.log('values', values);
      // console.log('filterFormat', filterFormat);
      let subTitleStr = '';
      if (
        filterFormat.inpType === 'S(ON/OFF)' ||
        filterFormat.inpType === 'S(CAMPAIGNSTATUS)' ||
        filterFormat.inpType === 'S(ADGROUPSTATUS)' ||
        filterFormat.inpType === 'S(CREATIVESTATUS)'
      ) {
        filter1DepthItems.map((item) => {
          if (item.id === filterFormat.filter1_depth_id) {
            return (subTitleStr = item.filter_name);
          }
        });
      }
      let selectValStr = '';
      let selectValLabelStr = '';
      if (
        filterFormat.inpType === 'S(ON/OFF)' ||
        filterFormat.inpType === 'S(CAMPAIGNSTATUS)' ||
        filterFormat.inpType === 'S(ADGROUPSTATUS)' ||
        filterFormat.inpType === 'S(CREATIVESTATUS)' ||
        filterFormat.inpType === 'S(CREATIVEREVIEWSTATUS)' ||
        filterFormat.inpType === 'S(CAMPAIGNTYPE)' ||
        filterFormat.inpType === 'S(CAMPAIGNGOAL)' ||
        filterFormat.inpType === 'S(CREATIVETYPE)'
      ) {
        // console.log(formik.values.checkboxValue);
        formik.values.checkboxValue.map((checkboxValueItem) => {
          checkboxListItems.map((checkboxListItem) => {
            if (checkboxListItem.inpType === filterFormat.inpType && checkboxValueItem === checkboxListItem.inpValue) {
              return (selectValStr = selectValStr + checkboxListItem.inpLabel + ',');
            }
          });
          checkboxListItems.map((checkboxListItem) => {
            if (checkboxListItem.inpType === filterFormat.inpType && checkboxValueItem === checkboxListItem.inpValue) {
              return (selectValLabelStr = selectValLabelStr + checkboxListItem.inpValue + ',');
            }
          });
          if (checkboxValueItem === 'DELETED') {
            selectValStr = `삭제,`;
            selectValLabelStr = 'DELETED,';
          }
        });
        selectValStr = selectValStr.slice(0, -1);
        selectValLabelStr = selectValLabelStr.slice(0, -1);
      }
      let isExists = false; // 이미 필터링에 같은 항목이 존재하는지 여부
      let isExistsFilterIdx = 0; // 이미 필터링에 같은 항목이 존재한다면 해당 idx 값
      filterResult.map((filterResultItem, idx) => {
        if (filterFormat.filter_index === filterResultItem.filter_index) {
          isExists = true;
          isExistsFilterIdx = idx;
          return (filterResultItem.value =
            filterFormat.inpType === 'I' || filterFormat.inpType === 'I&P(C)' || filterFormat.inpType === 'I&P(N)&S'
              ? formik.values.inpValue.replace(/ /g, '')
              : filterFormat.inpType === 'S(ON/OFF)' ||
                filterFormat.inpType === 'S(CAMPAIGNSTATUS)' ||
                filterFormat.inpType === 'S(ADGROUPSTATUS)' ||
                filterFormat.inpType === 'S(CREATIVESTATUS)' ||
                filterFormat.inpType === 'S(CREATIVEREVIEWSTATUS)' ||
                filterFormat.inpType === 'S(CAMPAIGNTYPE)' ||
                filterFormat.inpType === 'S(CAMPAIGNGOAL)' ||
                filterFormat.inpType === 'S(CREATIVETYPE)'
              ? selectValStr
              : '');
        }
      });
      filterResult.map((filterResultItem, idx) => {
        if (filterFormat.filter_index === filterResultItem.filter_index) {
          isExists = true;
          isExistsFilterIdx = idx;
          return (filterResultItem.valueLabel =
            filterFormat.inpType === 'I' || filterFormat.inpType === 'I&P(C)' || filterFormat.inpType === 'I&P(N)&S'
              ? formik.values.inpValue.replace(/ /g, '')
              : filterFormat.inpType === 'S(ON/OFF)' ||
                filterFormat.inpType === 'S(CAMPAIGNSTATUS)' ||
                filterFormat.inpType === 'S(ADGROUPSTATUS)' ||
                filterFormat.inpType === 'S(CREATIVESTATUS)' ||
                filterFormat.inpType === 'S(CREATIVEREVIEWSTATUS)' ||
                filterFormat.inpType === 'S(CAMPAIGNTYPE)' ||
                filterFormat.inpType === 'S(CAMPAIGNGOAL)' ||
                filterFormat.inpType === 'S(CREATIVETYPE)'
              ? selectValLabelStr
              : '');
        }
      });
      if (!isExists) {
        setFilterResult(
          filterResult.concat([
            {
              filter_index: filterFormat.filter_index,
              range:
                filterFormat.inpType === 'I&P(N)&S'
                  ? formik.values.selectValue.value
                  : filterFormat.inpType === 'I'
                  ? 'contain'
                  : filterFormat.inpType === 'I&P(C)'
                  ? 'eq'
                  : 'any',
              value:
                filterFormat.inpType === 'I' || filterFormat.inpType === 'I&P(C)' || filterFormat.inpType === 'I&P(N)&S'
                  ? formik.values.inpValue.replace(/ /g, '')
                  : filterFormat.inpType === 'S(ON/OFF)' ||
                    filterFormat.inpType === 'S(CAMPAIGNSTATUS)' ||
                    filterFormat.inpType === 'S(ADGROUPSTATUS)' ||
                    filterFormat.inpType === 'S(CREATIVESTATUS)' ||
                    filterFormat.inpType === 'S(CREATIVEREVIEWSTATUS)' ||
                    filterFormat.inpType === 'S(CAMPAIGNTYPE)' ||
                    filterFormat.inpType === 'S(CAMPAIGNGOAL)' ||
                    filterFormat.inpType === 'S(CREATIVETYPE)'
                  ? selectValStr
                  : '',
              valueLabel:
                filterFormat.inpType === 'I' || filterFormat.inpType === 'I&P(C)' || filterFormat.inpType === 'I&P(N)&S'
                  ? formik.values.inpValue.replace(/ /g, '')
                  : filterFormat.inpType === 'S(ON/OFF)' ||
                    filterFormat.inpType === 'S(CAMPAIGNSTATUS)' ||
                    filterFormat.inpType === 'S(ADGROUPSTATUS)' ||
                    filterFormat.inpType === 'S(CREATIVESTATUS)' ||
                    filterFormat.inpType === 'S(CREATIVEREVIEWSTATUS)' ||
                    filterFormat.inpType === 'S(CAMPAIGNTYPE)' ||
                    filterFormat.inpType === 'S(CAMPAIGNGOAL)' ||
                    filterFormat.inpType === 'S(CREATIVETYPE)'
                  ? selectValLabelStr
                  : '',
              title: `${filterFormat.inpTitle}${' '}${subTitleStr}`,
            },
          ]),
        );
      } else {
        // console.log('filterResult232', filterResult);
        setFilterResult(filterResult);
      }

      try {
        setSubmitting(true);
        let routerPathStr = '';
        if (filterResult.length < 1) {
          routerPathStr = `${filterFormat.filter_index}-${
            filterFormat.inpType === 'I&P(N)&S'
              ? formik.values.selectValue.value
              : filterFormat.inpType === 'I'
              ? 'contain'
              : filterFormat.inpType === 'I&P(C)'
              ? 'eq'
              : 'any'
          }~${
            formik.values.inpValue !== '' || formik.values.checkboxValue.length > 0
              ? `${
                  filterFormat.inpType === 'I' ||
                  filterFormat.inpType === 'I&P(C)' ||
                  filterFormat.inpType === 'I&P(N)&S'
                    ? formik.values.inpValue.replace(/ /g, '')
                    : filterFormat.inpType === 'S(ON/OFF)' ||
                      filterFormat.inpType === 'S(CAMPAIGNSTATUS)' ||
                      filterFormat.inpType === 'S(ADGROUPSTATUS)' ||
                      filterFormat.inpType === 'S(CREATIVESTATUS)' ||
                      filterFormat.inpType === 'S(CREATIVEREVIEWSTATUS)' ||
                      filterFormat.inpType === 'S(CAMPAIGNTYPE)' ||
                      filterFormat.inpType === 'S(CAMPAIGNGOAL)' ||
                      filterFormat.inpType === 'S(CREATIVETYPE)'
                    ? adFnc.filterCheckBoxResult(formik.values.checkboxValue)
                    : ''
                }`
              : ''
          }`;
          // console.log('routerPathStr', routerPathStr);
        } else {
          routerPathStr =
            '+' +
            `${filterFormat.filter_index}-${
              filterFormat.inpType === 'I&P(N)&S'
                ? formik.values.selectValue.value
                : filterFormat.inpType === 'I'
                ? 'contain'
                : filterFormat.inpType === 'I&P(C)'
                ? 'eq'
                : 'any'
            }~${
              formik.values.inpValue !== '' || formik.values.checkboxValue.length > 0
                ? `${
                    filterFormat.inpType === 'I' ||
                    filterFormat.inpType === 'I&P(C)' ||
                    filterFormat.inpType === 'I&P(N)&S'
                      ? formik.values.inpValue.replace(/ /g, '')
                      : filterFormat.inpType === 'S(ON/OFF)' ||
                        filterFormat.inpType === 'S(CAMPAIGNSTATUS)' ||
                        filterFormat.inpType === 'S(ADGROUPSTATUS)' ||
                        filterFormat.inpType === 'S(CREATIVESTATUS)' ||
                        filterFormat.inpType === 'S(CREATIVEREVIEWSTATUS)' ||
                        filterFormat.inpType === 'S(CAMPAIGNTYPE)' ||
                        filterFormat.inpType === 'S(CAMPAIGNGOAL)' ||
                        filterFormat.inpType === 'S(CREATIVETYPE)'
                      ? adFnc.filterCheckBoxResult(formik.values.checkboxValue)
                      : ''
                  }`
                : ''
            }`;
        }
        // console.log('routerPathStr', routerPathStr);
        if (filter !== undefined) {
          const filterArr = String(filter).split(' ');
          const filterStr = filterArr.join('+');
          let pageChangeRouterPathStr = decodeURI(router.asPath.replace(`page=${page}`, 'page=1'));
          if (!isExists) {
            pageChangeRouterPathStr = pageChangeRouterPathStr.replace(filterStr, filterStr + routerPathStr);
          } else {
            pageChangeRouterPathStr = pageChangeRouterPathStr.replace(
              filterArr[isExistsFilterIdx],
              // eslint-disable-next-line max-len
              `${filterResult[isExistsFilterIdx].filter_index}-${filterResult[isExistsFilterIdx].range}~${filterResult[isExistsFilterIdx].valueLabel}`,
            );
          }
          await router.push(pageChangeRouterPathStr);
        } else {
          if (router.asPath.includes('?')) {
            let pageChangeRouterPathStr = router.asPath + `&filter=${routerPathStr}`;
            pageChangeRouterPathStr = pageChangeRouterPathStr.replace(`page=${page}`, 'page=1');
            await router.push(pageChangeRouterPathStr);
          } else {
            await router.push(router.asPath + `?filter=${routerPathStr}`);
          }
        }
      } catch (e) {
        // const error = e as AxiosError<ErrorDto>;
        // setStatus(error.response?.data.errorMessage);
        setSubmitting(false);
      }
      setDepth2FormatOn(false);
      setFilterFormat({
        filter_index: '',
        filter1_depth_id: 0,
        inpType: '',
        inpTitle: '',
      });
    },
  });

  useEffect(() => {
    if (filter !== undefined) {
      let filterResultArr: FilterResultProps[] = [];
      // console.log('String(filter)', filter);
      const filterArr = String(filter).split(' ');
      // console.log('filterArr', filterArr);
      for (let i = 0; i < filterArr.length; i++) {
        const filterArr2 = filterArr[i].split('-');
        // console.log('filterArr2', filterArr2);
        if (filterArr2.some((el) => el === '')) {
          return;
        }
        const filterArr3 = filterArr2[1].split('~');
        const filterArr4 = filterArr3[1].split(',');
        let filterFormatTitle = '';
        let filterValue = '';

        filter1DepthItems.map((filter1DepthItem) => {
          if (filter1DepthItem.filter_index === filterArr2[0]) {
            filterFormatTitle = filter1DepthItem.filter_name + ' ';
            if (
              filter1DepthItem.inpType === 'S(CREATIVEREVIEWSTATUS)' ||
              filter1DepthItem.inpType === 'S(CAMPAIGNTYPE)' ||
              filter1DepthItem.inpType === 'S(CAMPAIGNGOAL)' ||
              filter1DepthItem.inpType === 'S(CREATIVETYPE)'
            ) {
              filterArr4.map((filterArr4Item) => {
                checkboxListItems.map((checkboxListItem) => {
                  if (
                    checkboxListItem.inpType === filter1DepthItem.inpType &&
                    checkboxListItem.inpValue === filterArr4Item
                  ) {
                    return (filterValue = filterValue + checkboxListItem.inpLabel + ',');
                  }
                });
              });
              filterValue = filterValue.slice(0, -1);
            }
          }
        });

        filter2DepthItems.map((filter2DepthItem) => {
          if (filter2DepthItem.filter_index === filterArr2[0]) {
            if (
              filter2DepthItem.inpType === 'S(ON/OFF)' ||
              filter2DepthItem.inpType === 'S(CAMPAIGNSTATUS)' ||
              filter2DepthItem.inpType === 'S(ADGROUPSTATUS)' ||
              filter2DepthItem.inpType === 'S(CREATIVESTATUS)'
            ) {
              filter1DepthItems.map((filter1DepthItem) => {
                if (filter1DepthItem.id === filter2DepthItem.filter1_depth_id) {
                  filterFormatTitle = filter2DepthItem.filter_name + ' ' + filter1DepthItem.filter_name;
                }
              });
              filterArr4.map((filterArr4Item) => {
                checkboxListItems.map((checkboxListItem) => {
                  if (
                    checkboxListItem.inpType === filter2DepthItem.inpType &&
                    checkboxListItem.inpValue === filterArr4Item
                  ) {
                    return (filterValue = filterValue + checkboxListItem.inpLabel + ',');
                  }
                });
              });
              filterValue = filterValue.slice(0, -1);
            } else {
              filterFormatTitle = filter2DepthItem.filter_name + ' ';
              filterValue = filterArr3[1];
            }
          }
        });
        filter3DepthItems.map((filter3DepthItem) => {
          if (filter3DepthItem.filter_index === filterArr2[0]) {
            filterFormatTitle = filter3DepthItem.formatTitle + ' ';
            filterValue = filterArr3[1];
          }
        });
        if (filterArr4[0] === 'DELETED') {
          filterValue = '삭제';
        }
        filterResultArr = filterResultArr.concat([
          {
            filter_index: filterArr2[0],
            range: filterArr3[0],
            value: filterValue,
            valueLabel: filterArr3[1],
            title: filterFormatTitle,
          },
        ]);
      }
      setFilterResult(filterResultArr);
    }
  }, [filter]);

  const handleClickOutSide = (e: any) => {
    if (filterSearchBoxRef && !filterSearchBoxRef.current?.contains(e.target)) {
      // focus out
      setFilterFormatInpFocus(false);
      if (filterDivRef && !filterDivRef.current?.contains(e.target)) {
        setFilterSearchInpFocus(false);
        setFilter1depthActive({ id: 0, filter_name: '', filter_index: '', has2depth: false });
        setFilter2depthActive({ id: 0, filter1_depth_id: 0, filter_name: '', filter_index: '', has3depth: false });
        setFilter3depthActive({
          id: 0,
          filter1_depth_id: 0,
          filter2_depth_id: 0,
          filter_name: '',
          filter_index: '',
          formatTitle: '',
        });
        if (filterFormatDivRef && !filterFormatDivRef.current?.contains(e.target)) {
          setFilterSearchBoxFocus(false);
          setDepth2FormatOn(false);
          formik.setValues(initialValues);
        }
      } else {
        setFilterSearchInpFocus(true);
        setFilterSearchBoxFocus(true);
      }
    } else {
      // focus in
      setFilterSearchBoxFocus(true);
      setDepth2FormatOn(false);
      formik.setValues(initialValues);
      if (filterSearchSpanRef && !filterSearchSpanRef.current?.contains(e.target)) {
        setFilterSearchInpFocus(false);
      } else {
        console.log(
          'filterSearchSpanRef.current?.getBoundingClientRect().top',
          filterSearchSpanRef.current?.getBoundingClientRect().top,
        );
        // 조건에 filterSearchSpanRef.current?.getBoundingClientRect().top 앞에 위치한 것들은 모바일 크기 기준 (사이드바 형태가 바뀌었을때)
        // if (
        //   filterSearchSpanRef.current?.getBoundingClientRect().top === 112 ||
        //   filterSearchSpanRef.current?.getBoundingClientRect().top === 132
        // ) {
        //   setFilterHeight(47);
        // } else if (
        //   filterSearchSpanRef.current?.getBoundingClientRect().top === 146 ||
        //   filterSearchSpanRef.current?.getBoundingClientRect().top === 166
        // ) {
        //   setFilterHeight(84);
        // } else if (
        //   filterSearchSpanRef.current?.getBoundingClientRect().top === 180 ||
        //   filterSearchSpanRef.current?.getBoundingClientRect().top === 200
        // ) {
        //   setFilterHeight(121);
        // } else if (
        //   filterSearchSpanRef.current?.getBoundingClientRect().top === 214 ||
        //   filterSearchSpanRef.current?.getBoundingClientRect().top === 234
        // ) {
        //   setFilterHeight(158);
        // } else if (
        //   filterSearchSpanRef.current?.getBoundingClientRect().top === 248 ||
        //   filterSearchSpanRef.current?.getBoundingClientRect().top === 268
        // ) {
        //   setFilterHeight(195);
        // } else if (
        //   filterSearchSpanRef.current?.getBoundingClientRect().top === 282 ||
        //   filterSearchSpanRef.current?.getBoundingClientRect().top === 302
        // ) {
        //   setFilterHeight(232);
        // }
        if (filterSearchSpanRef.current?.getBoundingClientRect().left !== undefined) {
          setFilterWidth(
            filterSearchSpanRef.current?.getBoundingClientRect().left - (document.body.clientWidth - 1080) / 2,
          );
        }
      }
    }
    if (filterSelectRef && !filterSelectRef.current?.contains(e.target)) {
      setShowFilterSelect(false);
    }
  };

  // console.log('filterHeight', filterHeight, filterWidth);

  const filter1DepthHoverCheckFnc = (mouseEvent: string, filter1DepthItem?: Filter1DepthProps) => {
    if (mouseEvent === 'mouseEnter') {
      setFilter1depthActive(filter1DepthItem);
      setFilter2depthActive({
        id: 0,
        filter_name: '',
        filter1_depth_id: 0,
        filter_index: '',
        has3depth: false,
      });
      setFilter3depthActive({
        id: 0,
        filter_name: '',
        filter1_depth_id: 0,
        filter2_depth_id: 0,
        filter_index: '',
        formatTitle: '',
      });
    } else if (mouseEvent === 'mouseLeave') {
      setFilter1depthActive({ id: 0, filter_name: '', filter_index: '', has2depth: false });
    }
  };

  const filter2DepthHoverCheckFnc = (filter2DepthItem: Filter2DepthProps, mouseEvent: string) => {
    if (mouseEvent === 'mouseEnter') {
      setFilter2depthActive(filter2DepthItem);
      setFilter3depthActive({
        id: 0,
        filter_name: '',
        filter1_depth_id: 0,
        filter2_depth_id: 0,
        filter_index: '',
        formatTitle: '',
      });
    } else if (mouseEvent === 'mouseLeave') {
      setFilter2depthActive({
        id: 0,
        filter_name: '',
        filter1_depth_id: 0,
        filter_index: '',
        has3depth: false,
      });
    }
  };

  const filter3DepthHoverCheckFnc = (filter3DepthItem: Filter3DepthProps, mouseEvent: string) => {
    if (mouseEvent === 'mouseEnter') {
      setFilter3depthActive(filter3DepthItem);
    } else if (mouseEvent === 'mouseLeave') {
      setFilter3depthActive({
        id: 0,
        filter_name: '',
        filter1_depth_id: 0,
        filter2_depth_id: 0,
        filter_index: '',
        formatTitle: '',
      });
    }
  };

  const depth1FormatOpen = (filter1DepthItem: Filter1DepthProps) => {
    setFilterSearchInpFocus(false);
    setDepth2FormatOn(true);
    setFilterFormat({
      filter_index: filter1DepthItem.filter_index,
      inpType: filter1DepthItem.inpType ?? '',
      inpTitle: filter1DepthItem.filter_name,
    });
    filterResult.map((filterResultItem) => {
      if (filter1DepthItem.filter_index === filterResultItem.filter_index) {
        formik.setValues({ ...formik.values, checkboxValue: filterResultItem.valueLabel.split(',') });
      }
    });
  };

  const depth2FormatOpen = (
    depthType: string,
    filter2DepthItem?: Filter2DepthProps,
    filter3DepthItem?: Filter3DepthProps,
  ) => {
    if (depthType === '2') {
      if (filter2DepthItem?.has3depth === false) {
        setFilterFormat({
          filter_index: filter2DepthItem.filter_index,
          filter1_depth_id: filter2DepthItem.filter1_depth_id,
          inpType: filter2DepthItem.inpType ?? '',
          inpTitle: filter2DepthItem.filter_name,
        });
        setFilterSearchInpFocus(false);
        setDepth2FormatOn(true);
        filterResult.map((filterResultItem) => {
          if (filter2DepthItem.filter_index === filterResultItem.filter_index) {
            if (filter2DepthItem.inpType === 'I' || filter2DepthItem.inpType === 'I&P(C)') {
              formik.setValues({ ...formik.values, inpValue: filterResultItem.valueLabel });
            } else {
              formik.setValues({ ...formik.values, checkboxValue: filterResultItem.valueLabel.split(',') });
            }
          }
        });
      }
    } else {
      setFilterSearchInpFocus(false);
      setDepth2FormatOn(true);
      setFilterFormat({
        filter_index: filter3DepthItem?.filter_index ?? '',
        filter1_depth_id: filter3DepthItem?.filter1_depth_id,
        inpType: filter3DepthItem?.inpType ?? '',
        inpTitle: filter3DepthItem?.formatTitle ?? '',
      });
      let selectRangeVal: { label: string; value: string } = { label: '', value: '' };
      // console.log('filterResult', filterResult);
      filterResult.map((filterResultItem) => {
        if (filter3DepthItem?.filter_index === filterResultItem.filter_index) {
          filterSelectRangeOptions.map((filterSelectRangeItem: { label: string; value: string }) => {
            if (filterSelectRangeItem.value === filterResultItem.range) {
              selectRangeVal = { label: filterSelectRangeItem.label, value: filterSelectRangeItem.value };
            }
          });
          formik.setValues({ ...formik.values, inpValue: filterResultItem.valueLabel, selectValue: selectRangeVal });
        }
      });
    }
  };

  const deleteFilterResultItem = (filterResultItem: FilterResultProps, index: number) => {
    setFilterResult(filterResult.filter((el, idx) => idx != index));
    let filterStr = adFnc.getFilterParamsUrl(String(filter).split(' ')).slice(0, -1);
    filterStr = filterStr.replace(
      `${filterResultItem.filter_index}-${filterResultItem.range}~${filterResultItem.valueLabel}`,
      '',
    );
    if (filterStr.startsWith('+') === true) {
      filterStr = filterStr.substring(1);
    }
    if (filterStr.endsWith('+') === true) {
      filterStr = filterStr.slice(0, filterStr.length - 1);
    }
    filterStr = filterStr.replace('++', '+');
    let pageChangeRouterPathStr = decodeURI(router.asPath.replace(`page=${page}`, 'page=1'));
    const filterArr = String(filter).split(' ');
    const filterJoinStr = filterArr.join('+');
    if (filterStr === '') {
      if (pageChangeRouterPathStr.includes('?filter')) {
        pageChangeRouterPathStr = pageChangeRouterPathStr.replace(`?filter=${filter}`, filterStr);
        pageChangeRouterPathStr = pageChangeRouterPathStr.replace('&', '?');
      } else {
        pageChangeRouterPathStr = pageChangeRouterPathStr.replace(`&filter=${filter}`, filterStr);
      }
      router.push(pageChangeRouterPathStr);
    } else {
      pageChangeRouterPathStr = pageChangeRouterPathStr.replace(filterJoinStr, filterStr);
      router.push(pageChangeRouterPathStr);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutSide);
    return () => {
      document.removeEventListener('mousedown', handleClickOutSide);
    };
  });

  return (
    <>
      <div className="wrap_search h-36">
        <strong className="screen_out">필터 검색</strong>
        <div className="group_adsearch" ref={filterSearchBoxRef}>
          <div className="inner_adsearch" style={{ cursor: 'pointer' }}>
            <ul className="list_adsearch">
              {filterResult.map((filterResultItem: FilterResultProps, idx: number) => (
                <li key={idx}>
                  <div className="box_adsearch" ref={filterResultDivRef}>
                    <a className="btn_adsearch">
                      <span>
                        {filterResultItem.title} {filterResultItem.range === 'contain' ? `포함 ` : ' '}
                        <span className="fw_bold">
                          {filterResultItem.value}{' '}
                          {filterResultItem.range === 'GTE'
                            ? `이상 `
                            : filterResultItem.range === 'LTE'
                            ? `이하 `
                            : filterResultItem.range === 'EQ' &&
                              filterResultItem.filter_index !== 'campaignIds' &&
                              filterResultItem.filter_index !== 'adGroupIds' &&
                              filterResultItem.filter_index !== 'creativeIds'
                            ? `같음 `
                            : ' '}
                        </span>
                      </span>
                    </a>
                    <a className="btn_del" onClick={() => deleteFilterResultItem(filterResultItem, idx)}>
                      <MdClose size={16} color={'rgb(158 158 158)'} />
                    </a>
                  </div>
                </li>
              ))}
              {filterSearchBoxFocus && (
                <li>
                  <span className="box_inptxt" ref={filterSearchSpanRef}>
                    <span className="inner_inp">
                      <label className="screen_out" htmlFor="filter_inp">
                        검색필터 정보를 검색하세요.
                      </label>
                      <input
                        className="inp_txt"
                        type="text"
                        id="filter_inp"
                        name="filter_inp"
                        maxLength={50}
                        autoComplete="off"
                        onFocus={() => setFilterSearchInpFocus(true)}
                      />
                    </span>
                  </span>
                </li>
              )}
            </ul>
            {!filterSearchBoxFocus && filterResult.length < 1 && (
              <>
                <p className="lab_txt">캠페인, 광고그룹, 소재 검색 혹은 필터링</p>
                <a className="btn_search">
                  <span className="ico_comm">
                    <BiSearch size={20} />
                  </span>
                </a>
              </>
            )}
          </div>
        </div>
        {filterSearchInpFocus && (
          <div
            className="layer_adsearch"
            ref={filterDivRef}
            style={{ top: `${filterHeight}px`, left: `${filterWidth}px` }}
            onMouseLeave={() => filter1DepthHoverCheckFnc('mouseLeave')}
          >
            <div className="inner_g">
              <div className="item_depth">
                <strong className="tit_lyadsearch">필터</strong>
                <ul className="list_lyadsearch">
                  {filter1DepthItems.map((filter1DepthItem: Filter1DepthProps) => (
                    <li
                      key={filter1DepthItem.id}
                      className={filter1depthActive?.filter_index === filter1DepthItem.filter_index ? 'on' : ''}
                      onMouseEnter={() => filter1DepthHoverCheckFnc('mouseEnter', filter1DepthItem)}
                      onClick={() => {
                        if (filter1DepthItem.has2depth === false) {
                          depth1FormatOpen(filter1DepthItem);
                        }
                      }}
                    >
                      <a className="link_searchfilter">
                        {filter1DepthItem.filter_name}
                        {filter1DepthItem.has2depth === true && (
                          <span className="ico_comm">
                            <MdKeyboardArrowRight size={16} />
                          </span>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              {filter1depthActive?.has2depth === true && (
                <div className="item_depth2">
                  <ul className="list_lyadsearch">
                    {filter2DepthItems.map((filter2DepthItem: Filter2DepthProps) => {
                      if (filter1depthActive?.id === filter2DepthItem.filter1_depth_id) {
                        return (
                          <li
                            key={filter2DepthItem.id}
                            className={filter2depthActive.filter_index === filter2DepthItem.filter_index ? 'on' : ''}
                            onMouseEnter={() => filter2DepthHoverCheckFnc(filter2DepthItem, 'mouseEnter')}
                            onClick={() => depth2FormatOpen('2', filter2DepthItem)}
                          >
                            <a className="link_searchfilter">
                              {filter2DepthItem.filter_name}
                              {filter2DepthItem.has3depth === true && (
                                <span className="ico_comm">
                                  <MdKeyboardArrowRight size={16} />
                                </span>
                              )}
                            </a>
                          </li>
                        );
                      }
                    })}
                  </ul>
                </div>
              )}
              {filter2depthActive.has3depth === true && (
                <div className="item_depth3">
                  <ul className="list_lyadsearch">
                    {filter3DepthItems.map((filter3DepthItem: Filter3DepthProps) => {
                      if (filter2depthActive.id === filter3DepthItem.filter2_depth_id) {
                        return (
                          <li
                            key={filter3DepthItem.id}
                            className={filter3depthActive.filter_index === filter3DepthItem.filter_index ? 'on' : ''}
                            onMouseEnter={() => filter3DepthHoverCheckFnc(filter3DepthItem, 'mouseEnter')}
                            onClick={() => depth2FormatOpen('3', undefined, filter3DepthItem)}
                          >
                            <a className="link_searchfilter">{filter3DepthItem.filter_name}</a>
                          </li>
                        );
                      }
                    })}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
        {depth2FormatOn && (
          <div
            className="basic_layer4 layer_inptype layer_boardsearch"
            ref={filterFormatDivRef}
            style={{ top: `${filterHeight}px`, left: `${filterWidth}px` }}
          >
            <div className="inner_basic_layer">
              <form onSubmit={formik.handleSubmit}>
                <strong className="tit_layer">
                  {filterFormat.inpTitle}{' '}
                  {(filterFormat.inpType === 'S(ON/OFF)' ||
                    filterFormat.inpType === 'S(CAMPAIGNSTATUS)' ||
                    filterFormat.inpType === 'S(ADGROUPSTATUS)' ||
                    filterFormat.inpType === 'S(CREATIVESTATUS)') &&
                    filter1DepthItems.map((item) => {
                      if (item.id === filterFormat.filter1_depth_id) {
                        return item.filter_name;
                      }
                    })}
                </strong>
                <div className="con_layer">
                  {(filterFormat.inpType === 'I' || filterFormat.inpType === 'I&P(C)') && (
                    <span className={`box_inptxt ${filterFormatInpFocus ? 'on' : ''}`}>
                      <span className="num_byte">
                        <span className="screen_out">작성가능한 총 텍스트 수</span>
                        {filterFormat.inpType === 'I' ? '50' : ''}
                      </span>
                      <span className="inner_inp">
                        <label className="lab_txt" htmlFor="input|filterCondition">
                          {filterFormat.inpType === 'I&P(C)' && !filterFormatInpFocus && formik.values.inpValue == ''
                            ? '콤마(,)로 구분하여 입력하세요. (최대 10개)'
                            : ''}
                        </label>
                        <input
                          className="inp_txt"
                          type="text"
                          id="input|filterCondition"
                          {...formik.getFieldProps('inpValue')}
                          maxLength={50}
                          autoComplete="on"
                          onFocus={() => setFilterFormatInpFocus(true)}
                          onBlur={() => setFilterFormatInpFocus(false)}
                        />
                      </span>
                    </span>
                  )}
                  {filterFormat.inpType === 'I&P(N)&S' && (
                    <div className="group_numinp">
                      <span className={`box_inptxt reform_inp_num align_r ${filterFormatInpFocus ? 'on' : ''}`}>
                        <span className="inner_inp">
                          <label htmlFor="input|filterCondition|metric|CAMPAIGN_METRIC|cost" className="lab_txt">
                            {!filterFormatInpFocus && formik.values.inpValue == '' && <>숫자를 입력하세요.</>}
                          </label>
                          <input
                            type="text"
                            id="input|filterCondition|metric|CAMPAIGN_METRIC|cost"
                            {...formik.getFieldProps('inpValue')}
                            maxLength={12}
                            className="inp_txt"
                            inputMode="numeric"
                            onFocus={() => setFilterFormatInpFocus(true)}
                            onBlur={() => setFilterFormatInpFocus(false)}
                            onChange={(e) => {
                              formik.setValues({ ...formik.values, inpValue: e.target.value.replace(/[^0-9]/g, '') });
                            }}
                          />
                        </span>
                      </span>
                      <div className={`opt_select ${showFilterSelect ? 'opt_open' : ''}`} ref={filterSelectRef}>
                        <a className="link_selected" onClick={() => setShowFilterSelect(true)}>
                          {formik.values.selectValue.label}
                        </a>
                        <span className="ico_arr"></span>
                        <div className="opt_list">
                          <ul className="list_opt">
                            {filterSelectRangeOptions.map((filterSelectRangeOption, idx) => (
                              <li
                                className={
                                  filterSelectRangeOption.value === formik.values.selectValue.value ? 'on' : ''
                                }
                                key={idx}
                                onClick={() => {
                                  formik.setValues({ ...formik.values, selectValue: filterSelectRangeOption });
                                  setShowFilterSelect(false);
                                }}
                              >
                                <a className="link_option in_active">{filterSelectRangeOption.label}</a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                  {(filterFormat.inpType === 'S(ON/OFF)' ||
                    filterFormat.inpType === 'S(CAMPAIGNSTATUS)' ||
                    filterFormat.inpType === 'S(ADGROUPSTATUS)' ||
                    filterFormat.inpType === 'S(CREATIVESTATUS)' ||
                    filterFormat.inpType === 'S(CREATIVEREVIEWSTATUS)' ||
                    filterFormat.inpType === 'S(CAMPAIGNTYPE)' ||
                    filterFormat.inpType === 'S(CAMPAIGNGOAL)' ||
                    filterFormat.inpType === 'S(CREATIVETYPE)') && (
                    <>
                      <ul className="list_layer">
                        <li>
                          <span className="box_checkinp">
                            <input
                              type="checkbox"
                              name="checkboxValue"
                              id="check|filterCondition|onOff|all"
                              className="inp_check"
                              checked={
                                JSON.stringify(formik.values.checkboxValue) ==
                                JSON.stringify(
                                  filterFormat.inpType === 'S(ON/OFF)'
                                    ? ['ON', 'OFF']
                                    : filterFormat.inpType === 'S(CAMPAIGNSTATUS)'
                                    ? ['READY', 'LIVE', 'FINISHED', 'ADMIN_STOP', 'OFF']
                                    : filterFormat.inpType === 'S(ADGROUPSTATUS)'
                                    ? [
                                        'READY',
                                        'LIVE',
                                        'FINISHED',
                                        'OFF',
                                        'ADMIN_STOP',
                                        // 'SYSTEM_CONFIG_EXTERNAL_SERVICE_STOP',
                                        // 'EXCEED_DAILY_BUDGET',
                                        // 'CANCELED',
                                        // 'PAUSED',
                                        // 'ADACCOUNT_UNAVAILABLE',
                                        // 'NO_AVAILABLE_CREATIVE',
                                      ]
                                    : filterFormat.inpType === 'S(CREATIVESTATUS)'
                                    ? [
                                        'OPERATING',
                                        'UNAPPROVED',
                                        'OFF',
                                        'ADMIN_STOP',
                                        // 'INVALID_DATE',
                                        // 'SYSTEM_CONFIG_VOID',
                                        // 'ADGROUP_UNAVAILABLE',
                                      ]
                                    : filterFormat.inpType === 'S(CREATIVEREVIEWSTATUS)'
                                    ? [
                                        'APPROVED',
                                        'WAITING',
                                        'REJECTED',
                                        // 'MODIFICATION_WAITING',
                                        // 'MODIFICATION_REJECTED',
                                      ]
                                    : filterFormat.inpType === 'S(CAMPAIGNTYPE)'
                                    ? ['DISPLAY', 'VIDEO']
                                    : filterFormat.inpType === 'S(CAMPAIGNGOAL)'
                                    ? ['CONVERSION', 'VISITING', 'REACH', 'VIEW']
                                    : filterFormat.inpType === 'S(CREATIVETYPE)'
                                    ? ['IMAGE_BANNER', 'IMAGE_NATIVE', 'VIDEO_NATIVE']
                                    : [],
                                )
                                  ? true
                                  : false
                              }
                              onChange={(e) => {
                                if (e.target.checked == true) {
                                  formik.setValues({
                                    ...formik.values,
                                    checkboxValue:
                                      filterFormat.inpType === 'S(ON/OFF)'
                                        ? ['ON', 'OFF']
                                        : filterFormat.inpType === 'S(CAMPAIGNSTATUS)'
                                        ? [
                                            'READY',
                                            'LIVE',
                                            'FINISHED',
                                            'OFF',
                                            'ADMIN_STOP',
                                            // 'SYSTEM_CONFIG_EXTERNAL_SERVICE_STOP',
                                            // 'EXCEED_DAILY_BUDGET',
                                            // 'ADACCOUNT_UNAVAILABLE',
                                          ]
                                        : filterFormat.inpType === 'S(ADGROUPSTATUS)'
                                        ? [
                                            'READY',
                                            'LIVE',
                                            'FINISHED',
                                            'OFF',
                                            'ADMIN_STOP',
                                            // 'SYSTEM_CONFIG_EXTERNAL_SERVICE_STOP',
                                            // 'EXCEED_DAILY_BUDGET',
                                            // 'CANCELED',
                                            // 'PAUSED',
                                            // 'ADACCOUNT_UNAVAILABLE',
                                            // 'NO_AVAILABLE_CREATIVE',
                                          ]
                                        : filterFormat.inpType === 'S(CREATIVESTATUS)'
                                        ? [
                                            'OPERATING',
                                            'UNAPPROVED',
                                            'OFF',
                                            'ADMIN_STOP',
                                            // 'INVALID_DATE',
                                            // 'SYSTEM_CONFIG_VOID',
                                            // 'ADGROUP_UNAVAILABLE',
                                          ]
                                        : filterFormat.inpType === 'S(CREATIVEREVIEWSTATUS)'
                                        ? [
                                            'APPROVED',
                                            'WAITING',
                                            'REJECTED',
                                            // 'MODIFICATION_WAITING',
                                            // 'MODIFICATION_REJECTED',
                                          ]
                                        : filterFormat.inpType === 'S(CAMPAIGNTYPE)'
                                        ? ['DISPLAY', 'VIDEO']
                                        : filterFormat.inpType === 'S(CAMPAIGNGOAL)'
                                        ? ['CONVERSION', 'VISITING', 'REACH', 'VIEW']
                                        : filterFormat.inpType === 'S(CREATIVETYPE)'
                                        ? ['IMAGE_BANNER', 'IMAGE_NATIVE', 'VIDEO_NATIVE']
                                        : [],
                                  });
                                } else {
                                  formik.setValues({ ...formik.values, checkboxValue: [] });
                                }
                              }}
                            />
                            <label htmlFor="check|filterCondition|onOff|all" className="lab_check">
                              전체
                            </label>
                          </span>
                        </li>
                      </ul>
                      <ul className="list_layer">
                        {checkboxListItems.map((item) => {
                          if (filterFormat.inpType === item.inpType) {
                            return (
                              <li key={item.id}>
                                <span className="box_checkinp">
                                  <input
                                    type="checkbox"
                                    name="checkboxValue"
                                    id={item.inpId}
                                    className="inp_check"
                                    value={item.inpValue}
                                    checked={formik.values.checkboxValue.includes(item.inpValue)}
                                    onChange={formik.handleChange}
                                  />
                                  <label htmlFor={item.inpId} className="lab_check">
                                    {item.inpLabel}
                                  </label>
                                </span>
                              </li>
                            );
                          }
                        })}
                      </ul>
                      {(filterFormat.inpType === 'S(CAMPAIGNSTATUS)' ||
                        filterFormat.inpType === 'S(ADGROUPSTATUS)' ||
                        filterFormat.inpType === 'S(CREATIVESTATUS)') && (
                        <ul className="list_layer">
                          <li>
                            <span className="box_checkinp">
                              <input
                                type="checkbox"
                                name="checkboxValue"
                                id="check|filter|operationStatus|delete"
                                value="DELETED"
                                className="inp_check"
                                onChange={(e) => {
                                  if (e.target.checked === true) {
                                    formik.setValues({ ...formik.values, checkboxValue: [e.target.value] });
                                  } else {
                                    formik.setValues({ ...formik.values, checkboxValue: [e.target.value] });
                                  }
                                }}
                              />
                              <label htmlFor="check|filter|operationStatus|delete" className="lab_check">
                                삭제
                              </label>
                            </span>
                          </li>
                        </ul>
                      )}
                    </>
                  )}
                </div>
                <div className="btn_group">
                  <button
                    type="button"
                    className="btn_gm"
                    onClick={() => {
                      setDepth2FormatOn(false);
                      setFilterSearchBoxFocus(false);
                      formik.setValues({ ...formik.values, inpValue: '' });
                    }}
                  >
                    <span className="inner_g">취소</span>
                  </button>
                  <button
                    type="submit"
                    className={`btn_gm gm_bl ${
                      formik.values.inpValue !== '' || formik.values.checkboxValue.length > 0 ? '' : 'in_active'
                    }`}
                  >
                    <span className="inner_g">적용</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Filter;

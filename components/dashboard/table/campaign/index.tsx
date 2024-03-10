import { Cell, Row, TableNode } from '@table-library/react-table-library';
import styles from '../campaign/CampaignTable.module.scss';
import * as fnc from '../../../../utils/commonFunction';
import { Dispatch, SetStateAction } from 'react';
import { MdModeEdit } from 'react-icons/md';
import { BsFillBarChartFill } from 'react-icons/bs';
import { useRouter } from 'next/router';
import * as adFnc from '../../../../utils/adFunction';
import { HeaderColumnsType } from '../../../../components/dashboard/table';

const CampaignTable = (props: {
  item: TableNode;
  checkItems: { tableType: string; id: string }[];
  setCheckItems: Dispatch<SetStateAction<{ tableType: string; id: string }[]>>;
  checkFnc: (target: string, tabType: string) => void;
  hoverState: string;
  setHoverState: Dispatch<SetStateAction<string>>;
  adTypeAndGoalArr: Array<string>;
  myIndicatorItems: HeaderColumnsType[];
}) => {
  const { item, checkItems, setCheckItems, checkFnc, hoverState, setHoverState, adTypeAndGoalArr, myIndicatorItems } =
    props;
  const router = useRouter();
  const { adaccountId, table, summary } = router.query;
  return (
    <Row
      item={item}
      onMouseEnter={() => setHoverState(item.id)}
      onMouseLeave={() => setHoverState('')}
      className={
        (hoverState === item.id ? styles.over : '') +
        ' ' +
        (checkItems.some((el) => el.tableType === 'campaign' && el.id === String(item.id)) ? styles.on : '')
      }
    >
      <Cell className={styles.inner_tbl} pinLeft>
        <input
          type="checkbox"
          onChange={(e) => checkFnc(e.target.value, 'campaign')}
          value={item.id}
          checked={checkItems.some((el) => el.tableType === 'campaign' && el.id === String(item.id))}
        />
      </Cell>
      <Cell className={styles.inner_tbl} pinLeft>
        <span className={styles.btn_dash}>
          {/* {!(item.status === 'FINISHED' || item.status === 'ADMIN_STOP') && ( */}
          <span className={styles.link_modify}>
            <a
              className={styles.link_g + ' link_g'}
              // onClick={() => router.push(`/ad/${adaccountId}/campaign_group?campaignId=${item.id}`)}
            >
              <span className={styles.ico_comm}>
                <MdModeEdit size={18} className="m-r-5" />
              </span>
            </a>
          </span>
          {/* )} */}
          <span
            className={
              styles.link_chart +
              (summary !== undefined && String(summary).split('~')[1] == item.id && summary.includes('campaign')
                ? ' ' + styles.show + ' ' + styles.on
                : '')
            }
          >
            <a
              className={styles.link_g + ' link_g'}
              onClick={() => {
                if (summary !== undefined) {
                  let routerPathStr = '';
                  if (summary.includes('campaign')) {
                    const summarySplitArr = String(summary).split('~');
                    if (summarySplitArr[1] == item.id) {
                      if (router.asPath.includes(`?summary=campaign~${item.id}`)) {
                        routerPathStr = router.asPath.replace(`?summary=campaign~${item.id}`, '');
                        routerPathStr = routerPathStr.replace('&', '?');
                        router.push(routerPathStr);
                      } else {
                        routerPathStr = router.asPath.replace(`&summary=campaign~${item.id}`, '');
                        router.push(routerPathStr);
                      }
                    } else {
                      if (router.asPath.includes(`?summary=${summary}`)) {
                        routerPathStr = router.asPath.replace(`?summary=${summary}`, `?summary=campaign~${item.id}`);
                        router.push(routerPathStr);
                      } else {
                        routerPathStr = router.asPath.replace(`&summary=${summary}`, `&summary=campaign~${item.id}`);
                        router.push(routerPathStr);
                      }
                    }
                  } else {
                    if (router.asPath.includes(`?summary=${summary}`)) {
                      routerPathStr = router.asPath.replace(`?summary=${summary}`, `?summary=campaign~${item.id}`);
                      router.push(routerPathStr);
                    } else {
                      routerPathStr = router.asPath.replace(`&summary=${summary}`, `&summary=campaign~${item.id}`);
                      router.push(routerPathStr);
                    }
                  }
                } else {
                  if (router.asPath.includes('?')) {
                    router.push(router.asPath + `&summary=campaign~${item.id}`);
                  } else {
                    router.push(router.asPath + `?summary=campaign~${item.id}`);
                  }
                }
              }}
            >
              <span className={styles.ico_comm}>
                <BsFillBarChartFill
                  size={18}
                  color={
                    summary !== undefined && String(summary).split('~')[1] == item.id && summary.includes('campaign')
                      ? '#4884f1'
                      : ''
                  }
                />
              </span>
            </a>
          </span>
        </span>
        <a
          className="fc_emph"
          onClick={() => {
            let routerPathStr = router.asPath.replace(`table=${table}`, 'table=ad_group');
            if (table !== undefined) {
              if (router.asPath.includes(`?table=${table}`)) {
                routerPathStr = routerPathStr.replace(`?table=${table}`, `?table=ad_group`);
                router.push(routerPathStr);
              } else {
                routerPathStr = routerPathStr.replace(`&table=${table}`, `&table=ad_group`);
                router.push(routerPathStr);
              }
            } else {
              if (router.asPath.includes('?')) {
                router.push(routerPathStr + `&table=ad_group`);
              } else {
                router.push(routerPathStr + `?table=ad_group`);
              }
            }
            let newCheckItems = [...checkItems];
            newCheckItems = newCheckItems.filter((el) => el.tableType !== 'campaign');
            newCheckItems = newCheckItems.concat({ tableType: 'campaign', id: String(item.id) });
            setCheckItems(newCheckItems);
          }}
        >
          {item.name}
        </a>
      </Cell>

      {/* <Cell className={styles.inner_tbl}>{adFnc.dashboardStatus(item.status)}</Cell> */}
      {/* <Cell className={styles.inner_tbl}>{`${adTypeAndGoalArr[0]} X ${adTypeAndGoalArr[1]}`}</Cell> */}
      {/* <Cell className={styles.inner_tbl}>{`${adTypeAndGoalArr[0]}`}</Cell> */}
      <Cell className={styles.inner_tbl}>
        {adTypeAndGoalArr[0] === '디스플레이' ? '디스플레이' : adTypeAndGoalArr[0] === '동영상' ? '동영상' : ''}
      </Cell>
      <Cell className={styles.inner_tbl + ' text-align-r'}>
        {/* {item.dailyBudgetAmount == 0 ? '(일) 미설정' : `(일) ${fnc.addCommas(item.dailyBudgetAmount)}`} */}
        {item.budgetAmount == 0 ? '미설정' : `${item.budgetAmount.toLocaleString()}`}
      </Cell>
      {myIndicatorItems.map((myIndicatorItem, idx) => {
        if (myIndicatorItem.columnIndex === 'cost') {
          return (
            <Cell className={styles.inner_tbl + ' text-align-r'} key={idx}>
              {item.report.cost.toLocaleString()}
            </Cell>
          );
        } else if (myIndicatorItem.columnIndex === 'impression') {
          return (
            <Cell className={styles.inner_tbl + ' text-align-r'} key={idx}>
              {item.report.impression.toLocaleString()}
            </Cell>
          );
        } else if (myIndicatorItem.columnIndex === 'click') {
          return (
            <Cell className={styles.inner_tbl + ' text-align-r'} key={idx}>
              {item.report.click.toLocaleString()}
            </Cell>
          );
        } else if (myIndicatorItem.columnIndex === 'ctr') {
          return (
            <Cell className={styles.inner_tbl + ' text-align-r'} key={idx}>
              {item.report.ctr}%
            </Cell>
          );
        } else if (myIndicatorItem.columnIndex === 'reach') {
          return (
            <Cell className={styles.inner_tbl + ' text-align-r'} key={idx}>
              {item.report.reach}
            </Cell>
          );
        } else if (myIndicatorItem.columnIndex === 'videoPlay3Seconds') {
          return (
            <Cell className={styles.inner_tbl + ' text-align-r'} key={idx}>
              {item.report.videoPlay3Seconds}
            </Cell>
          );
        } else if (myIndicatorItem.columnIndex === 'cpm') {
          return (
            <Cell className={styles.inner_tbl + ' text-align-r'} key={idx}>
              {item.report.cpm.toLocaleString()}
            </Cell>
          );
        } else if (myIndicatorItem.columnIndex === 'cpc') {
          return (
            <Cell className={styles.inner_tbl + ' text-align-r'} key={idx}>
              {item.report.cpc.toLocaleString()}
            </Cell>
          );
        } else if (myIndicatorItem.columnIndex === 'reachRate') {
          return (
            <Cell className={styles.inner_tbl + ' text-align-r'} key={idx}>
              {item.report.reachRate}
            </Cell>
          );
        } else if (myIndicatorItem.columnIndex === 'videoPlayRate') {
          return (
            <Cell className={styles.inner_tbl + ' text-align-r'} key={idx}>
              {item.report.videoPlayRate}
            </Cell>
          );
        } else if (myIndicatorItem.columnIndex === 'signUpDay1') {
          return (
            <Cell className={styles.inner_tbl + ' text-align-r'} key={idx}>
              {item.report.signUpDay1}
            </Cell>
          );
        } else if (myIndicatorItem.columnIndex === 'viewCartDay1') {
          return (
            <Cell className={styles.inner_tbl + ' text-align-r'} key={idx}>
              {item.report.viewCartDay1}
            </Cell>
          );
        } else if (myIndicatorItem.columnIndex === 'purchaseDay1') {
          return (
            <Cell className={styles.inner_tbl + ' text-align-r'} key={idx}>
              {item.report.purchaseDay1}
            </Cell>
          );
        } else if (myIndicatorItem.columnIndex === 'signUpDay7') {
          return (
            <Cell className={styles.inner_tbl + ' text-align-r'} key={idx}>
              {item.report.signUpDay7}
            </Cell>
          );
        } else if (myIndicatorItem.columnIndex === 'viewCartDay7') {
          return (
            <Cell className={styles.inner_tbl + ' text-align-r'} key={idx}>
              {item.report.viewCartDay7}
            </Cell>
          );
        } else if (myIndicatorItem.columnIndex === 'purchaseDay7') {
          return (
            <Cell className={styles.inner_tbl + ' text-align-r'} key={idx}>
              {item.report.purchaseDay7}
            </Cell>
          );
        } else if (myIndicatorItem.columnIndex === 'videoAutoPlay') {
          return (
            <Cell className={styles.inner_tbl + ' text-align-r'} key={idx}>
              {item.report.videoAutoPlay}
            </Cell>
          );
        } else if (myIndicatorItem.columnIndex === 'videoTouches') {
          return (
            <Cell className={styles.inner_tbl + ' text-align-r'} key={idx}>
              {item.report.videoTouches}
            </Cell>
          );
        } else if (myIndicatorItem.columnIndex === 'videoUnmute') {
          return (
            <Cell className={styles.inner_tbl + ' text-align-r'} key={idx}>
              {item.report.videoUnmute}
            </Cell>
          );
        } else if (myIndicatorItem.columnIndex === 'videoPlay5Seconds') {
          return (
            <Cell className={styles.inner_tbl + ' text-align-r'} key={idx}>
              {item.report.videoPlay5Seconds}
            </Cell>
          );
        } else if (myIndicatorItem.columnIndex === 'videoPlay10Seconds') {
          return (
            <Cell className={styles.inner_tbl + ' text-align-r'} key={idx}>
              {item.report.videoPlay10Seconds}
            </Cell>
          );
        } else if (myIndicatorItem.columnIndex === 'videoPlay15Seconds') {
          return (
            <Cell className={styles.inner_tbl + ' text-align-r'} key={idx}>
              {item.report.videoPlay15Seconds}
            </Cell>
          );
        } else if (myIndicatorItem.columnIndex === 'videoPlay30Seconds') {
          return (
            <Cell className={styles.inner_tbl + ' text-align-r'} key={idx}>
              {item.report.videoPlay30Seconds}
            </Cell>
          );
        } else if (myIndicatorItem.columnIndex === 'videoPlay60Seconds') {
          return (
            <Cell className={styles.inner_tbl + ' text-align-r'} key={idx}>
              {item.report.videoPlay60Seconds}
            </Cell>
          );
        } else if (myIndicatorItem.columnIndex === 'videoPlay25Percent') {
          return (
            <Cell className={styles.inner_tbl + ' text-align-r'} key={idx}>
              {item.report.videoPlay25Percent}
            </Cell>
          );
        } else if (myIndicatorItem.columnIndex === 'videoPlay50Percent') {
          return (
            <Cell className={styles.inner_tbl + ' text-align-r'} key={idx}>
              {item.report.videoPlay50Percent}
            </Cell>
          );
        } else if (myIndicatorItem.columnIndex === 'videoPlay75Percent') {
          return (
            <Cell className={styles.inner_tbl + ' text-align-r'} key={idx}>
              {item.report.videoPlay75Percent}
            </Cell>
          );
        } else if (myIndicatorItem.columnIndex === 'videoPlay100Percent') {
          return (
            <Cell className={styles.inner_tbl + ' text-align-r'} key={idx}>
              {item.report.videoPlay100Percent}
            </Cell>
          );
        }
      })}
      <Cell className={styles.inner_tbl}>
        {fnc.dateNumberToString(item.startDate) +
          ' ~ ' +
          (item.adGroupSchedulesLastEndDate == 29991231 ? `종료일 미설정` : fnc.dateNumberToString(item.endDate))}
      </Cell>
    </Row>
  );
};

export default CampaignTable;

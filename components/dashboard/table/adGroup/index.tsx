import { Cell, Row, TableNode } from '@table-library/react-table-library';
import styles from '../adGroup/adGroupTable.module.scss';
import { Dispatch, SetStateAction } from 'react';
import * as fnc from 'utils/commonFunction';
import { MdModeEdit } from 'react-icons/md';
import { BsFillBarChartFill } from 'react-icons/bs';
import * as adFnc from 'utils/adFunction';
import { useRouter } from 'next/router';
import { HeaderColumnsType } from '@components/dashboard/table';
import { useTranslation } from 'next-i18next';

const AdGroupTable = (props: {
  item: TableNode;
  checkItems: { tableType: string; id: string }[];
  setCheckItems: Dispatch<SetStateAction<{ tableType: string; id: string }[]>>;
  checkFnc: (target: string, tabType: string) => void;
  switchFnc: (item: TableNode, tabType: string) => void;
  hoverState: string;
  setHoverState: Dispatch<SetStateAction<string>>;
  myIndicatorItems: HeaderColumnsType[];
}) => {
  const { item, checkItems, setCheckItems, checkFnc, switchFnc, hoverState, setHoverState, myIndicatorItems } = props;
  const router = useRouter();
  const { adaccountId, table, summary } = router.query;
  const { t } = useTranslation(['common', 'dashboard']);
  return (
    <Row
      item={item}
      className={
        (hoverState === item.id ? styles.over : '') +
        ' ' +
        (checkItems.some((el) => el.tableType === 'ad_group' && el.id === String(item.id)) ? styles.on : '')
      }
      onMouseEnter={() => setHoverState(item.id)}
      onMouseLeave={() => setHoverState('')}
    >
      <Cell className={styles.inner_tbl} pinLeft>
        <input
          type="checkbox"
          onChange={(e) => checkFnc(e.target.value, 'ad_group')}
          value={item.id}
          checked={checkItems.some((el) => el.tableType === 'ad_group' && el.id === String(item.id))}
        />
      </Cell>
      <Cell className={styles.inner_tbl} pinLeft>
        <span className={styles.btn_dash}>
          {/* {!(item.status === 'FINISHED' || item.status === 'ADMIN_STOP') && ( */}
          <span className={styles.link_modify}>
            <a
              className={styles.link_g + ' link_g'}
              onClick={() =>
                router.push(`/ad/${adaccountId}/campaign_group?campaignId=${item.campaignId}&adGroupId=${item.id}`)
              }
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
              (summary !== undefined && String(summary).split('~')[1] == item.id && summary.includes('ad_group')
                ? ' ' + styles.show + ' ' + styles.on
                : '')
            }
          >
            <a
              className={styles.link_g + ' link_g'}
              onClick={() => {
                if (summary !== undefined) {
                  let routerPathStr = '';
                  if (summary.includes('ad_group')) {
                    const summarySplitArr = String(summary).split('~');
                    if (summarySplitArr[1] == item.id) {
                      if (router.asPath.includes(`?summary=ad_group~${item.id}`)) {
                        routerPathStr = router.asPath.replace(`?summary=ad_group~${item.id}`, '');
                        routerPathStr = routerPathStr.replace('&', '?');
                        router.push(routerPathStr);
                      } else {
                        routerPathStr = router.asPath.replace(`&summary=ad_group~${item.id}`, '');
                        router.push(routerPathStr);
                      }
                    } else {
                      if (router.asPath.includes(`?summary=${summary}`)) {
                        routerPathStr = router.asPath.replace(`?summary=${summary}`, `?summary=ad_group~${item.id}`);
                        router.push(routerPathStr);
                      } else {
                        routerPathStr = router.asPath.replace(`&summary=${summary}`, `&summary=ad_group~${item.id}`);
                        router.push(routerPathStr);
                      }
                    }
                  } else {
                    if (router.asPath.includes(`?summary=${summary}`)) {
                      routerPathStr = router.asPath.replace(`?summary=${summary}`, `?summary=ad_group~${item.id}`);
                      router.push(routerPathStr);
                    } else {
                      routerPathStr = router.asPath.replace(`&summary=${summary}`, `&summary=ad_group~${item.id}`);
                      router.push(routerPathStr);
                    }
                  }
                } else {
                  if (router.asPath.includes('?')) {
                    router.push(router.asPath + `&summary=ad_group~${item.id}`);
                  } else {
                    router.push(router.asPath + `?summary=ad_group~${item.id}`);
                  }
                }
              }}
            >
              <span className={styles.ico_comm}>
                <BsFillBarChartFill
                  size={18}
                  color={
                    summary !== undefined && String(summary).split('~')[1] == item.id && summary.includes('ad_group')
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
            let routerPathStr = router.asPath.replace(`table=${table}`, 'table=creative');
            if (table !== undefined) {
              if (router.asPath.includes(`?table=${table}`)) {
                routerPathStr = routerPathStr.replace(`?table=${table}`, `?table=creative`);
                router.push(routerPathStr);
              } else {
                routerPathStr = routerPathStr.replace(`&table=${table}`, `&table=creative`);
                router.push(routerPathStr);
              }
            } else {
              if (router.asPath.includes('?')) {
                router.push(routerPathStr + `&table=creative`);
              } else {
                router.push(routerPathStr + `?table=creative`);
              }
            }
            let newCheckItems = [...checkItems];
            newCheckItems = newCheckItems.filter((el) => el.tableType !== 'ad_group');
            newCheckItems = newCheckItems.concat({ tableType: 'ad_group', id: String(item.id) });
            // console.log('newCheckItems', newCheckItems);
            setCheckItems(newCheckItems);
          }}
        >
          {item.name}
        </a>
      </Cell>
      <Cell className={styles.inner_tbl}>
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckChecked"
            value={item.config}
            checked={item.config == 'ON' ? true : false}
            onChange={() => switchFnc(item, 'ad_group')}
          />
          <label className="form-check-label" htmlFor="flexSwitchCheckChecked"></label>
        </div>
      </Cell>
      {/* <Cell className={styles.inner_tbl}>{adFnc.dashboardStatus(item.status)}</Cell> */}
      <Cell className={styles.inner_tbl}>
        {item.status === 'READY'
          ? t('common:dashboardStatus.ready')
          : item.status === 'LIVE'
          ? t('common:dashboardStatus.live')
          : item.status === 'FINISHED'
          ? t('common:dashboardStatus.finished')
          : item.status === 'OFF'
          ? t('common:dashboardStatus.off')
          : item.status === 'DELETED'
          ? t('common:dashboardStatus.deleted')
          : item.status === 'ADMIN_STOP'
          ? t('common:dashboardStatus.adminStop')
          : ''}
      </Cell>
      <Cell className={styles.inner_tbl + ' text-align-r'}>
        {item.dailyBudgetAmount == 0
          ? `(${t('common:day')}) ${t('common:notSet')}`
          : `(${t('common:day')}) ${item.dailyBudgetAmount.toLocaleString()}`}
      </Cell>
      <Cell className={styles.inner_tbl + ' text-align-r'}>
        {item.bidStrategy == 'AUTO' ? t('common:auto') : `(${item.pacingType}) ${item.bidAmount.toLocaleString()}`}
      </Cell>
      <Cell className={styles.inner_tbl}>
        <a
          className="fc_emph"
          onClick={() => {
            router.push(
              // eslint-disable-next-line max-len
              `/dashboard/${adaccountId}?table=campaign&summary=campaign~${item.campaignId}&filter=campaign.ids-eq~${item.campaignId}`,
            );
          }}
        >
          {item.campaignName}
        </a>
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
        {fnc.dateNumberToString(item.scheduleStartDate) +
          ' ~ ' +
          (item.scheduleEndDate == 29991231
            ? `${t('common:endDate')} ${t('common:notSet2')}`
            : fnc.dateNumberToString(item.scheduleEndDate))}
      </Cell>
    </Row>
  );
};

export default AdGroupTable;

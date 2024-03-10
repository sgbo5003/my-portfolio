import { Cell, Row, TableNode } from '@table-library/react-table-library';
import styles from '../creative/CreativeTable.module.scss';
import { Dispatch, SetStateAction } from 'react';
import { MdModeEdit } from 'react-icons/md';
import { BsFillBarChartFill } from 'react-icons/bs';
import { FcRemoveImage } from 'react-icons/fc';
import * as adFnc from 'utils/adFunction';
import { useRouter } from 'next/router';
import { HeaderColumnsType } from '../../table/index';
import { useTranslation } from 'next-i18next';

const CreativeTable = (props: {
  item: TableNode;
  checkItems: { tableType: string; id: string }[];
  checkFnc: (target: string, tabType: string) => void;
  switchFnc: (item: TableNode, tabType: string) => void;
  hoverState: string;
  setHoverState: Dispatch<SetStateAction<string>>;
  myIndicatorItems: HeaderColumnsType[];
}) => {
  const { item, checkItems, checkFnc, switchFnc, hoverState, setHoverState, myIndicatorItems } = props;
  const router = useRouter();
  const { adaccountId, summary } = router.query;
  const { t } = useTranslation(['common', 'dashboard']);

  const onCreativeModifyBtnClick = (item: TableNode) => {
    router.push(
      `/ad/${adaccountId}/creative?campaignId=${item.campaignId}&adGroupId=${item.adGroupId}&creativeId=${item.id}`,
    );
  };
  return (
    <Row
      item={item}
      className={
        (hoverState === item.id ? styles.over : '') +
        ' ' +
        (checkItems.some((el) => el.tableType === 'creative' && el.id === String(item.id)) ? styles.on : '')
      }
      onMouseEnter={() => setHoverState(item.id)}
      onMouseLeave={() => setHoverState('')}
      styles={{ position: 'relative' }}
    >
      <Cell className={styles.inner_tbl} pinLeft>
        <input
          type="checkbox"
          onChange={(e) => checkFnc(e.target.value, 'creative')}
          value={item.id}
          checked={checkItems.some((el) => el.tableType === 'creative' && el.id === String(item.id))}
        />
      </Cell>
      <Cell className={styles.inner_tbl} pinLeft>
        <span className={styles.btn_dash}>
          {/* {!(item.reviewStatus === 'APPROVED' || item.status === 'ADMIN_STOP') && ( */}
          <span className={styles.link_modify}>
            <a className={styles.link_g + ' link_g'} onClick={() => onCreativeModifyBtnClick(item)}>
              <span className={styles.ico_comm}>
                <MdModeEdit size={18} className="m-r-5" />
              </span>
            </a>
          </span>
          {/* )} */}
          <span
            className={
              styles.link_chart +
              (summary !== undefined && String(summary).split('~')[1] == item.id && summary.includes('creative')
                ? ' ' + styles.show + ' ' + styles.on
                : '')
            }
          >
            <a
              className={styles.link_g + ' link_g'}
              onClick={() => {
                if (summary !== undefined) {
                  let routerPathStr = '';
                  if (summary.includes('creative')) {
                    const summarySplitArr = String(summary).split('~');
                    if (summarySplitArr[1] == item.id) {
                      if (router.asPath.includes(`?summary=creative~${item.id}`)) {
                        routerPathStr = router.asPath.replace(`?summary=creative~${item.id}`, '');
                        routerPathStr = routerPathStr.replace('&', '?');
                        router.push(routerPathStr);
                      } else {
                        routerPathStr = router.asPath.replace(`&summary=creative~${item.id}`, '');
                        router.push(routerPathStr);
                      }
                    } else {
                      if (router.asPath.includes(`?summary=${summary}`)) {
                        routerPathStr = router.asPath.replace(`?summary=${summary}`, `?summary=creative~${item.id}`);
                        router.push(routerPathStr);
                      } else {
                        routerPathStr = router.asPath.replace(`&summary=${summary}`, `&summary=creative~${item.id}`);
                        router.push(routerPathStr);
                      }
                    }
                  } else {
                    if (router.asPath.includes(`?summary=${summary}`)) {
                      routerPathStr = router.asPath.replace(`?summary=${summary}`, `?summary=creative~${item.id}`);
                      router.push(routerPathStr);
                    } else {
                      routerPathStr = router.asPath.replace(`&summary=${summary}`, `&summary=creative~${item.id}`);
                      router.push(routerPathStr);
                    }
                  }
                } else {
                  if (router.asPath.includes('?')) {
                    router.push(router.asPath + `&summary=creative~${item.id}`);
                  } else {
                    router.push(router.asPath + `?summary=creative~${item.id}`);
                  }
                }
              }}
            >
              <span className={styles.ico_comm}>
                <BsFillBarChartFill
                  size={18}
                  color={
                    summary !== undefined && String(summary).split('~')[1] == item.id && summary.includes('creative')
                      ? '#4884f1'
                      : ''
                  }
                />
              </span>
            </a>
          </span>
        </span>
        <a className={styles.link_thumb + ' ' + styles.thumb_bnr}>
          {item.fileType === 'IMAGE' ? (
            item.url === '' || item.url === undefined || item.url === null ? (
              <FcRemoveImage style={{ width: '100%', height: '100%' }} />
            ) : (
              <img src={`${item.url}`} style={{ width: '100%', height: '100%' }} />
            )
          ) : item.fileType === 'VIDEO' ? (
            <video controls width={'100%'} height={'100%'}>
              <source src={`${item.url}`} type="video/mp4" />
            </video>
          ) : (
            <div>
              <FcRemoveImage style={{ width: '100%', height: '100%' }} />
            </div>
          )}
        </a>
        <span className={styles.txt_dash}>{item.name}</span>
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
            onChange={() => switchFnc(item, 'creative')}
          />
          <label className="form-check-label" htmlFor="flexSwitchCheckChecked"></label>
        </div>
      </Cell>
      {/* <Cell className={styles.inner_tbl}>{adFnc.creativeStatus(item.status)}</Cell> */}
      <Cell className={styles.inner_tbl}>
        {item.status === 'OPERATING'
          ? t('common:creativeStatus.operating')
          : item.status === 'UNAPPROVED'
          ? t('common:creativeStatus.unapproved')
          : item.status === 'OFF'
          ? t('common:creativeStatus.off')
          : item.status === 'DELETED'
          ? t('common:creativeStatus.deleted')
          : item.status === 'ADMIN_STOP'
          ? t('common:creativeStatus.adminStop')
          : ''}
      </Cell>
      {/* <Cell className={styles.inner_tbl}>{adFnc.creativeReviewStatus(item.reviewStatus)}</Cell> */}
      <Cell className={styles.inner_tbl}>
        {item.reviewStatus === 'APPROVED'
          ? t('common:creativeReviewStatus.approved')
          : item.reviewStatus === 'WAITING'
          ? t('common:creativeReviewStatus.waiting')
          : item.reviewStatus === 'REJECTED'
          ? t('common:creativeReviewStatus.rejected')
          : item.reviewStatus === 'MODIFICATION_WAITING'
          ? t('common:creativeReviewStatus.modificationWaiting')
          : item.reviewStatus === 'MODIFICATION_REJECTED'
          ? t('common:creativeReviewStatus.modificationRejected')
          : ''}
      </Cell>
      <Cell className={styles.inner_tbl}>
        <a
          className="fc_emph"
          onClick={() => {
            router.push(
              // eslint-disable-next-line max-len
              `/dashboard/${adaccountId}?table=ad_group&summary=ad_group~${item.adGroupId}&filter=adGroup.ids-eq~${item.adGroupId}`,
            );
          }}
        >
          {item.adGroupName}
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
    </Row>
  );
};

export default CreativeTable;

import { useRouter } from 'next/router';
import React, { SetStateAction, useState, Dispatch } from 'react';
import styles from '../categoryAndTarget/CategoryAndTarget.module.scss';
import { AiFillHome } from 'react-icons/ai';
import { BsFillCheckCircleFill, BsFillDisplayFill, BsFillHandIndexFill, BsFillPlayFill } from 'react-icons/bs';
import { FaExchangeAlt } from 'react-icons/fa';
import { IoInformationCircle } from 'react-icons/io5';
import { RiVideoFill } from 'react-icons/ri';
import CamaignGroupSaveButton from '../../button';
import { selectItemType } from '../../../pages/form';
// import CamaignGroupSaveButton from '../button';

const CategoryAndTarget = (props: {
  categoryItems: Array<selectItemType>;
  targetItems: Array<selectItemType>;
  categoryCheckItems: Array<string>;
  setCategoryCheckItems: Dispatch<SetStateAction<Array<string>>>;
  targetCheckItems: Array<string>;
  setTargetCheckItems: Dispatch<SetStateAction<Array<string>>>;
  setCancelModalOn: Dispatch<SetStateAction<boolean>>;
  categoryCheckFlag: boolean;
  targetCheckFlag: boolean;
  saveCampaign: () => void;
}) => {
  const {
    categoryItems,
    targetItems,
    categoryCheckItems,
    setCategoryCheckItems,
    targetCheckItems,
    setTargetCheckItems,
    setCancelModalOn,
    categoryCheckFlag,
    targetCheckFlag,
    saveCampaign,
  } = props;
  const router = useRouter();
  const [guidCheck, setGuideCheck] = useState<string>(''); // 가이드 display check
  const [guidCheckArr, setGuideCheckArr] = useState<Array<string>>([]); // 가이드 display check Array

  const guideItems = [
    {
      mainType: 'category',
      subType: 'DISPLAY',
      mainTitle: '디스플레이',
      icon: <BsFillDisplayFill />,
      description: `다양한 크리에이티브를 활용하여, 광고솔루션의 핵심 서비스, 주요 파트너 서비스를 중심으로 한 많은 지면에
      광고를 노출합니다. 광고주 최적의 오디언스를 찾아줄 다양한 타겟 옵션을 통하여 광고의 효율을 높일 수
      있습니다.`,
      platformAllTxt: `다음, 네트워크`,
      platformMobileTxt: `(모바일) 스토리, 서비스`,
      chargingTxt: `CPC, CPM, CPA`,
      creative: ['이미지 네이티브', '이미지 카탈로그'],
      supportCategory: '',
    },
    {
      mainType: 'category',
      subType: 'VIDEO',
      mainTitle: '동영상',
      icon: <RiVideoFill />,
      description: '설명2',
      platformAllTxt: `다음, 네트워크`,
      platformMobileTxt: `스토리`,
      chargingTxt: `CPV`,
      creative: ['동영상 네이티브'],
      supportCategory: '',
    },
    {
      mainType: 'target',
      subType: 'CONVERSION',
      mainTitle: '전환',
      icon: <FaExchangeAlt />,
      description: '설명3',
      platformAllTxt: ``,
      platformMobileTxt: ``,
      chargingTxt: ``,
      creative: [],
      supportCategory: '비즈보드, 디스플레이',
    },
    {
      mainType: 'target',
      subType: 'VISITING',
      mainTitle: '방문',
      icon: <AiFillHome />,
      description: '설명4',
      platformAllTxt: ``,
      platformMobileTxt: ``,
      chargingTxt: ``,
      creative: [],
      supportCategory: '비즈보드, 디스플레이, 스폰서드 보드',
    },
    {
      mainType: 'target',
      subType: 'REACH',
      mainTitle: '도달',
      icon: <BsFillHandIndexFill />,
      description: '설명5',
      platformAllTxt: ``,
      platformMobileTxt: ``,
      chargingTxt: ``,
      creative: [],
      supportCategory: '비즈보드, 비즈보드 CPT, 앙코르톡 채널, 다음쇼핑',
    },
    {
      mainType: 'target',
      subType: 'VIEW',
      mainTitle: '조회',
      icon: <BsFillPlayFill />,
      description: '설명6',
      platformAllTxt: ``,
      platformMobileTxt: ``,
      chargingTxt: ``,
      creative: [],
      supportCategory: '동영상',
    },
  ];

  const checkboxCheckFnc = (e: any, type: string) => {
    let newCategoryCheckItems = [...categoryCheckItems];
    let newTargetCheckItems = [...targetCheckItems];
    const newGuideCheckItems = [...guidCheckArr];
    if (type == 'category') {
      // newCategoryCheckItems = [];
      if (newCategoryCheckItems.includes(e.target.value)) {
        // 값이 이미 포함되어 있다면
        setCategoryCheckItems(newCategoryCheckItems.filter((el) => el !== e.target.value));
      } else {
        if (newCategoryCheckItems.length > 0) {
          newCategoryCheckItems = [];
        }
        newCategoryCheckItems.push(e.target.value);
        setCategoryCheckItems(newCategoryCheckItems);
      }
    } else if (type == 'target') {
      if (newTargetCheckItems.includes(e.target.value)) {
        // 값이 이미 포함되어 있다면
        setTargetCheckItems(newTargetCheckItems.filter((el) => el !== e.target.value));
      } else {
        if (newTargetCheckItems.length > 0) {
          newTargetCheckItems = [];
        }
        newTargetCheckItems.push(e.target.value);
        setTargetCheckItems(newTargetCheckItems);
      }
    }
    if (e.target.checked) {
      newGuideCheckItems.push(e.target.value);
      setGuideCheckArr(newGuideCheckItems);
    } else {
      setGuideCheckArr(newGuideCheckItems.filter((el) => el !== e.target.value));
    }
  };

  const guideCheckFnc = (subIndex: string, mouseEvent: string) => {
    if (mouseEvent == 'mouseEnter') {
      setGuideCheck(subIndex);
    } else if (mouseEvent == 'mouseLeave') {
      setGuideCheck(subIndex);
    }
    if (guidCheckArr.length > 0) {
      if (mouseEvent == 'mouseEnter') {
        setGuideCheck(subIndex);
      } else if (mouseEvent == 'mouseLeave') {
        setGuideCheck(guidCheckArr[guidCheckArr.length - 1]);
      }
    }
  };

  return (
    <>
      <div className={styles.reform_group_divide + ' m-b-20'}>
        <div className={styles.dsp_tit}>
          <div className={styles.tit_dsp}>
            <h3 className={styles.reform_tit_subject}>유형과 목표</h3>
            {/* <h3 className={styles.reform_tit_subject}>{t('common:type')}</h3> */}
          </div>
        </div>
        <div className={styles.reform_box_select}>
          {categoryItems.map((item, idx1) => (
            <React.Fragment key={idx1}>
              <h4 className={styles.reform_subtit_subject}>
                {item.mainTitle}
                {categoryCheckFlag && <span className={styles.reform_txt_error}>필수 선택 항목입니다.</span>}
              </h4>
              <div className={styles.reform_cont_subject}>
                {item.subItems.map((subItem, idx2) => (
                  <div className={styles.reform_category_type} key={idx2}>
                    <span
                      className={
                        styles.box_checkboxinp +
                        (targetCheckItems.includes('CONVERSION') && subItem.subIndex == 'VIDEO'
                          ? ' ' + styles.in_active
                          : targetCheckItems.includes('VISITING') && subItem.subIndex == 'VIDEO'
                          ? ' ' + styles.in_active
                          : targetCheckItems.includes('REACH') &&
                            (subItem.subIndex == 'VIDEO' || subItem.subIndex == 'DISPLAY')
                          ? ' ' + styles.in_active
                          : targetCheckItems.includes('VIEW') && subItem.subIndex == 'DISPLAY'
                          ? ' ' + styles.in_active
                          : '')
                      }
                    >
                      <input
                        type="checkbox"
                        name="inp_checkbox1"
                        id={`inp_checkbox1_${idx2}`}
                        className={styles.inp_checkbox}
                        value={subItem.subIndex}
                        checked={categoryCheckItems.includes(subItem.subIndex)}
                        onChange={(e) => checkboxCheckFnc(e, item.type)}
                      />
                      <label
                        htmlFor={`inp_checkbox1_${idx2}`}
                        className={
                          styles.lab_checkbox +
                          (categoryCheckItems.includes(subItem.subIndex) ? ' ' + styles.selected : '')
                        }
                        onMouseEnter={() => guideCheckFnc(subItem.subIndex, 'mouseEnter')}
                        onMouseLeave={() => guideCheckFnc('', 'mouseLeave')}
                      >
                        <span className={styles.ico_comm}>
                          {categoryCheckItems.includes(subItem.subIndex) ? (
                            <BsFillCheckCircleFill color="#326edc" />
                          ) : (
                            <subItem.icon />
                          )}
                        </span>
                        <strong className={styles.tit_type}>{subItem.subTitle}</strong>
                      </label>
                    </span>
                  </div>
                ))}
              </div>
            </React.Fragment>
          ))}
          {targetItems.map((item, idx1) => (
            <React.Fragment key={idx1}>
              <h4 className={styles.reform_subtit_subject}>
                {item.mainTitle}
                {targetCheckFlag && <span className={styles.reform_txt_error}>필수 입력 항목입니다.</span>}
              </h4>
              <div className={styles.reform_cont_subject}>
                {item.subItems.map((subItem, idx2) => (
                  <div className={styles.reform_category_type} key={idx2}>
                    <span
                      className={
                        styles.box_checkboxinp +
                        (categoryCheckItems.includes('DISPLAY') &&
                        (subItem.subIndex == 'REACH' || subItem.subIndex == 'VIEW')
                          ? ' ' + styles.in_active
                          : categoryCheckItems.includes('VIDEO') &&
                            (subItem.subIndex == 'CONVERSION' ||
                              subItem.subIndex == 'VISITING' ||
                              subItem.subIndex == 'REACH')
                          ? ' ' + styles.in_active
                          : '')
                      }
                    >
                      <input
                        type="checkbox"
                        name="inp_checkbox2"
                        id={`inp_checkbox2_${idx2}`}
                        className={styles.inp_checkbox}
                        value={subItem.subIndex}
                        checked={targetCheckItems.includes(subItem.subIndex)}
                        onChange={(e) => checkboxCheckFnc(e, item.type)}
                      />
                      <label
                        htmlFor={`inp_checkbox2_${idx2}`}
                        className={
                          styles.lab_checkbox +
                          (targetCheckItems.includes(subItem.subIndex) ? ' ' + styles.selected : '')
                        }
                        onMouseEnter={() => guideCheckFnc(subItem.subIndex, 'mouseEnter')}
                        onMouseLeave={() => guideCheckFnc('', 'mouseLeave')}
                      >
                        <span className={styles.ico_comm}>
                          {targetCheckItems.includes(subItem.subIndex) ? (
                            <BsFillCheckCircleFill color="#326edc" />
                          ) : (
                            <subItem.icon />
                          )}
                        </span>
                        <strong className={styles.tit_type}>{subItem.subTitle}</strong>
                      </label>
                    </span>
                  </div>
                ))}
              </div>
            </React.Fragment>
          ))}
        </div>
        <div className={styles.reform_box_guide + (guidCheck == '' ? '' : ' ' + styles.box_type_layout)}>
          {guidCheck == '' ? (
            <React.Fragment>
              <h4 className={styles.reform_subtit_subject}>광고 유형과 목표를 선택하세요.</h4>
              <div className={styles.reform_cont_subject}>
                <p className={styles.reform_desc_guide}>
                  광고솔루션이 제공하는 광고 유형을 통하여 원하는 목표를 달성하는데 적합한 캠페인, 광고그룹, 소재 설정을
                  제공합니다.
                </p>
                <p className={styles.reform_desc_guide}>
                  캠페인별로 하나의 유형과 목표를 선택할 수 있습니다.
                  <br />
                </p>
              </div>
            </React.Fragment>
          ) : (
            guideItems.map((guideItem, idx1) => {
              if (guideItem.subType == guidCheck) {
                return (
                  <React.Fragment key={idx1}>
                    <h4 className={styles.reform_subtit_subject}>
                      <span className={styles.ico_comm}>{guideItem.icon}</span>
                      {guideItem.mainTitle}
                      {/* {guideItem.mainType == 'category' && (
                        <a className={styles.link_help5} href="#!" target="_blank">
                          <span className={styles.ico_comm}>
                            <IoInformationCircle />
                          </span>
                          도움말
                        </a>
                      )} */}
                    </h4>
                    <div className={styles.reform_cont_subject}>
                      <p className={styles.reform_desc_guide}>{guideItem.description}</p>
                      <div className={styles.reform_group_guide}>
                        {/* {guideItem.mainType == 'category' && (
                          <>
                            <div className={styles.reform_area_guide}>
                              <strong className={styles.reform_tit_guide}>지면 및 디바이스</strong>
                              {guideItem.platformAllTxt}
                              <br />
                              {guideItem.platformMobileTxt}
                            </div>
                            <div className={styles.reform_area_guide}>
                              <strong className={styles.reform_tit_guide}>과금기준</strong>
                              {guideItem.chargingTxt}
                            </div>
                            <div className={styles.reform_area_guide}>
                              <strong className={styles.reform_tit_guide}>노출 가능 소재</strong>
                              <ul className={styles.reform_layout_guide}>
                                {guideItem.creative.map((creativeItem, idx2) => (
                                  <li key={idx2}>{creativeItem}</li>
                                ))}
                              </ul>
                            </div>
                          </>
                        )} */}
                        {guideItem.mainType == 'target' && (
                          <>
                            <div className={styles.reform_area_guide}>
                              <strong className={styles.reform_tit_guide}>지원 유형</strong>
                              <p className={styles.reform_desc_device}>{guideItem.supportCategory}</p>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </React.Fragment>
                );
              }
            })
          )}
        </div>
      </div>
      <CamaignGroupSaveButton
        title="캠페인 생성"
        type="button"
        handleOnCancelBtnClick={() => {}}
        handleOnCreateBtnClick={() => {}}
      />
    </>
  );
};

export default CategoryAndTarget;

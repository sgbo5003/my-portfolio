import { useState } from 'react';
import CategoryAndTarget from '../../components/form/categoryAndTarget';
import { IconType } from 'react-icons';
import { BsFillDisplayFill, BsFillHandIndexFill, BsFillPlayFill } from 'react-icons/bs';
import { FaExchangeAlt } from 'react-icons/fa';
import { AiFillHome } from 'react-icons/ai';
import { RiVideoFill } from 'react-icons/ri';
import AdGroupPage from '../../components/form/adGroup';

interface SubItemsType {
  icon: IconType;
  subTitle: string;
  subIndex: string;
}

export interface selectItemType {
  type: string;
  mainTitle: string;
  subItems: SubItemsType[];
}

const categoryItems: Array<selectItemType> = [
  {
    type: 'category',
    mainTitle: `광고 유형`,
    subItems: [
      { icon: BsFillDisplayFill, subTitle: '디스플레이', subIndex: 'DISPLAY' },
      { icon: RiVideoFill, subTitle: '동영상', subIndex: 'VIDEO' },
    ],
  },
];

const targetItems: Array<selectItemType> = [
  {
    type: 'target',
    mainTitle: `광고 유형`,
    subItems: [
      { icon: FaExchangeAlt, subTitle: '전환', subIndex: 'CONVERSION' },
      { icon: AiFillHome, subTitle: '방문', subIndex: 'VISITING' },
      { icon: BsFillHandIndexFill, subTitle: '도달', subIndex: 'REACH' },
      { icon: BsFillPlayFill, subTitle: '조회', subIndex: 'VIEW' },
    ],
  },
];

const FormPage = () => {
  const [categoryCheckItems, setCategoryCheckItems] = useState<Array<string>>([]); // 광고 유형 check
  const [targetCheckItems, setTargetCheckItems] = useState<Array<string>>([]); // 광고 목표 check
  const [cancelModalOn, setCancelModalOn] = useState<boolean>(false); // 취소 버튼 클릭 시 모달
  const [categoryCheckFlag, setCategoryCheckFlag] = useState<boolean>(false); // 유형 검사 flag
  const [targetCheckFlag, setTargetCheckFlag] = useState<boolean>(false); // 목표 검사 flag

  const saveCampaign = () => {};

  return (
    <div className="reform_wrap">
      <CategoryAndTarget
        categoryCheckItems={categoryCheckItems}
        setCategoryCheckItems={setCategoryCheckItems}
        targetCheckItems={targetCheckItems}
        setTargetCheckItems={setTargetCheckItems}
        categoryItems={categoryItems}
        targetItems={targetItems}
        setCancelModalOn={setCancelModalOn}
        categoryCheckFlag={categoryCheckFlag}
        targetCheckFlag={targetCheckFlag}
        saveCampaign={saveCampaign}
      />
      <AdGroupPage />
    </div>
  );
};

export default FormPage;

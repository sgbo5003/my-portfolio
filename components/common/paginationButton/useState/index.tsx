import { useEffect, useState } from 'react';
import { Pagination } from 'react-bootstrap';

// tableData: 데이터 get()
// setTableData: 데이터 set()
// totalCnt: 데이터(테이블) 총 개수
// pageSize: 테이블 행

const StateCommonFivePagination = (props: {
  tableData: any;
  setTableData: any;
  totalCnt: number;
  pageSize: number;
}) => {
  const { totalCnt, pageSize, setTableData } = props;
  const pageNumArr = [1, 2, 3, 4, 5];
  const totalCntVal = totalCnt % 5 == 0 ? Math.floor(totalCnt / pageSize) : Math.floor(totalCnt / pageSize) + 1;
  const [curPage, setCurPage] = useState(1); // 현재 page
  const [newArr, setNewArr] = useState<Array<number>>(pageNumArr);
  // 마지막 페이지 계산 (총페이지 / 보여줄 행의 개수) + 1

  const onPageNumClick = (page: number) => {
    setCurPage(page);
    if (page > totalCntVal - 2) {
      // 마지막 페이지의 배열일 시 새로운 배열을 만들지 않기 위해 조건을 만듬
      return;
    }
    if (page == 1 || page == totalCntVal) {
      // 클릭한 page 가 1 or 마지막 페이지일 경우 return
      return;
    }
    if (page > 3 || curPage > 3) {
      // 4페이지부터 생성
      const newArray = [];
      for (let i = page - 2; i <= page + 2; i++) {
        newArray.push(i);
      }
      setNewArr(newArray);
    }
    if (page == 2 && curPage >= 4) {
      // 4보다 큰 페이지에서 2페이지를 눌렀을 때 처음 배열 보여주기
      setNewArr(pageNumArr);
    }
  };

  // pagination -> 이전 아이콘(<) 클릭 시
  const onPrevIconClick = () => {
    setCurPage(curPage - 1);
    if (curPage > totalCntVal - 2) {
      // 마지막 페이지의 배열일 시 새로운 배열을 만들지 않기 위해 조건을 만듬
      return;
    }
    if (curPage > 3) {
      // 현재 페이지가 3보다 작을 시 새로운 페이지 번호를 만들지 않음 (3보다 클때부터 생성)
      const newArray = [];
      for (let i = curPage - 3; i <= curPage + 1; i++) {
        newArray.push(i);
      }
      setNewArr(newArray);
    }
  };

  // pagination -> 이전 아이콘(<<) 클릭 시
  const onPrevAllIconClick = () => {
    setCurPage(1);
    setNewArr(pageNumArr);
  };

  // pagination -> 다음 아이콘(>) 클릭 시
  const onNextIconClick = () => {
    setCurPage(curPage + 1);
    if (newArr.includes(totalCntVal)) {
      // 마지막 페이지가 포함되어 있다면 더이상 생성 x
      return;
    }
    if (curPage >= 3) {
      const newArray = [];
      for (let i = curPage - 1; i <= curPage + 3; i++) {
        newArray.push(i);
      }
      setNewArr(newArray);
    }
  };

  // pagination -> 다음 아이콘(>>) 클릭 시
  const onNextAllIconClick = () => {
    setCurPage(totalCntVal);
    setNewArr([totalCntVal - 4, totalCntVal - 3, totalCntVal - 2, totalCntVal - 1, totalCntVal]);
  };

  useEffect(() => {
    // ----------- 테이블 data 임의 생성 ---------------//
    const tableArr = [];
    for (let i = pageSize * (curPage - 1); i < pageSize * curPage; i++) {
      tableArr.push({
        id: `${i}`,
        title: `제목${i}`,
        userName: `사용자${i}`,
      });
    }
    setTableData(tableArr);
    // ----------- 테이블 data 임의 생성 ---------------//
  }, [curPage, pageSize]);

  return (
    <Pagination className="f-right">
      <Pagination.First onClick={() => onPrevAllIconClick()} disabled={curPage == 1} />
      <Pagination.Prev onClick={() => onPrevIconClick()} disabled={curPage == 1} />
      {newArr.map((item: any, idx: number) => (
        <Pagination.Item key={idx} active={item === curPage} onClick={() => onPageNumClick(item)}>
          {item}
        </Pagination.Item>
      ))}
      <Pagination.Next onClick={() => onNextIconClick()} disabled={curPage == totalCntVal} />
      <Pagination.Last onClick={() => onNextAllIconClick()} disabled={curPage == totalCntVal} />
    </Pagination>
  );
};

export default StateCommonFivePagination;

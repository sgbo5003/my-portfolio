import { useEffect, useState } from 'react';
import { Pagination } from 'react-bootstrap';
import { useRouter } from 'next/router';

const DashboardPaginationButton = ({
  totalPage,
  currentPage,
  totalCount,
  paginationSize,
  baseUrl,
  params,
}: {
  totalPage: number;
  currentPage: number;
  totalCount: number;
  paginationSize: number;
  baseUrl: string;
  params?: string;
}) => {
  const router = useRouter();
  const { page, size } = router.query;
  const pageNumArr =
    totalPage == 0
      ? []
      : totalPage == 1
      ? [1]
      : totalPage == 2
      ? [1, 2]
      : totalPage == 3
      ? [1, 2, 3]
      : totalPage == 4
      ? [1, 2, 3, 4]
      : [1, 2, 3, 4, 5];
  // 마지막 페이지 계산 (총페이지 / 보여줄 행의 개수) + 1
  const totalCntVal =
    totalCount % paginationSize == 0
      ? Math.floor(totalCount / paginationSize)
      : Math.floor(totalCount / paginationSize) + 1;
  const [newArr, setNewArr] = useState<Array<number>>(pageNumArr);

  const onPageNumClick = (paginationPage: number) => {
    // router.push(`${baseUrl}&page=${page}&size=${size}&sort=createdAt,desc${params}`);
    let routerPathStr = '';
    if (page !== undefined && size !== undefined) {
      if (router.asPath.includes(`?page=${page}&size=${size}`)) {
        routerPathStr = router.asPath.replace(
          `?page=${page}&size=${size}`,
          `?page=${paginationPage}&size=${paginationSize}`,
        );
        router.push(routerPathStr);
      } else {
        routerPathStr = router.asPath.replace(
          `&page=${page}&size=${size}`,
          `&page=${paginationPage}&size=${paginationSize}`,
        );
        router.push(routerPathStr);
      }
    } else {
      if (router.asPath.includes('?')) {
        router.push(router.asPath + `&page=${paginationPage}&size=${paginationSize}`);
      } else {
        router.push(router.asPath + `?page=${paginationPage}&size=${paginationSize}`);
      }
    }
  };

  // pagination -> 이전 아이콘(<) 클릭 시
  const onPrevIconClick = () => {
    // router.push(`${baseUrl}&page=${currentPage - 1}&size=${size}&sort=createdAt,desc${params}`);
    // router.push(`${baseUrl}&page=${currentPage - 1}&size=${paginationSize}${params}`);
    let routerPathStr = '';
    if (page !== undefined && size !== undefined) {
      if (router.asPath.includes(`?page=${page}&size=${size}`)) {
        routerPathStr = router.asPath.replace(`?page=${page}&size=${size}`, `?page=${currentPage - 1}&size=${size}`);
        router.push(routerPathStr);
      } else {
        routerPathStr = router.asPath.replace(`&page=${page}&size=${size}`, `&page=${currentPage - 1}&size=${size}`);
        router.push(routerPathStr);
      }
    } else {
      if (router.asPath.includes('?')) {
        router.push(router.asPath + `&page=${currentPage - 1}&size=${paginationSize}`);
      } else {
        router.push(router.asPath + `?page=${currentPage - 1}&size=${paginationSize}`);
      }
    }
  };

  // pagination -> 이전 아이콘(<<) 클릭 시
  const onPrevAllIconClick = () => {
    // router.push(`${baseUrl}&page=${1}&size=${size}&sort=createdAt,desc${params}`);
    // router.push(`${baseUrl}&page=${1}&size=${paginationSize}${params}`);
    let routerPathStr = '';
    if (page !== undefined && size !== undefined) {
      if (router.asPath.includes(`?page=${page}&size=${size}`)) {
        routerPathStr = router.asPath.replace(`?page=${page}&size=${size}`, `?page=${1}&size=${size}`);
        router.push(routerPathStr);
      } else {
        routerPathStr = router.asPath.replace(`&page=${page}&size=${size}`, `&page=${1}&size=${size}`);
        router.push(routerPathStr);
      }
    } else {
      if (router.asPath.includes('?')) {
        router.push(router.asPath + `&page=${1}&size=${paginationSize}`);
      } else {
        router.push(router.asPath + `?page=${1}&size=${paginationSize}`);
      }
    }
  };

  // pagination -> 다음 아이콘(>) 클릭 시
  const onNextIconClick = () => {
    // router.push(`${baseUrl}&page=${currentPage + 1}&size=${size}&sort=createdAt,desc${params}`);
    // router.push(`${baseUrl}&page=${currentPage + 1}&size=${paginationSize}${params}`);
    let routerPathStr = '';
    if (page !== undefined && size !== undefined) {
      if (router.asPath.includes(`?page=${page}&size=${size}`)) {
        routerPathStr = router.asPath.replace(`?page=${page}&size=${size}`, `?page=${currentPage + 1}&size=${size}`);
        router.push(routerPathStr);
      } else {
        routerPathStr = router.asPath.replace(`&page=${page}&size=${size}`, `&page=${currentPage + 1}&size=${size}`);
        router.push(routerPathStr);
      }
    } else {
      if (router.asPath.includes('?')) {
        router.push(router.asPath + `&page=${currentPage + 1}&size=${paginationSize}`);
      } else {
        router.push(router.asPath + `?page=${currentPage + 1}&size=${paginationSize}`);
      }
    }
  };

  // pagination -> 다음 아이콘(>>) 클릭 시
  const onNextAllIconClick = () => {
    // router.push(`${baseUrl}&page=${totalCntVal}&size=${size}&sort=createdAt,desc${params}`);
    // router.push(`${baseUrl}&page=${totalCntVal}&size=${paginationSize}${params}`);
    let routerPathStr = '';
    if (page !== undefined && size !== undefined) {
      if (router.asPath.includes(`?page=${page}&size=${size}`)) {
        routerPathStr = router.asPath.replace(`?page=${page}&size=${size}`, `?page=${totalCntVal}&size=${size}`);
        router.push(routerPathStr);
      } else {
        routerPathStr = router.asPath.replace(`&page=${page}&size=${size}`, `&page=${totalCntVal}&size=${size}`);
        router.push(routerPathStr);
      }
    } else {
      if (router.asPath.includes('?')) {
        router.push(router.asPath + `&page=${totalCntVal}&size=${paginationSize}`);
      } else {
        router.push(router.asPath + `?page=${totalCntVal}&size=${paginationSize}`);
      }
    }
  };

  useEffect(() => {
    if (totalPage > 5) {
      if (currentPage < 4) {
        setNewArr([1, 2, 3, 4, 5]);
      } else if (currentPage > totalCntVal - 3) {
        setNewArr([totalCntVal - 4, totalCntVal - 3, totalCntVal - 2, totalCntVal - 1, totalCntVal]);
      } else {
        const newArray = [];
        for (let i = currentPage - 1; i <= currentPage + 3; i++) {
          newArray.push(i);
        }
        setNewArr(newArray);
      }
    } else {
      setNewArr(pageNumArr);
    }
  }, [currentPage, paginationSize, totalPage]);

  return (
    <Pagination className="f-right">
      <Pagination.First onClick={() => onPrevAllIconClick()} disabled={currentPage == 1} />
      <Pagination.Prev onClick={() => onPrevIconClick()} disabled={currentPage == 1} />
      {newArr.map((item: number, idx: number) => (
        <Pagination.Item key={idx} active={item === currentPage} onClick={() => onPageNumClick(item)}>
          {item}
        </Pagination.Item>
      ))}
      <Pagination.Next onClick={() => onNextIconClick()} disabled={currentPage == totalCntVal || totalCntVal === 0} />
      <Pagination.Last
        onClick={() => onNextAllIconClick()}
        disabled={currentPage == totalCntVal || totalCntVal === 0}
      />
    </Pagination>
  );
};

export default DashboardPaginationButton;

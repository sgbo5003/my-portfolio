import { Dispatch, SetStateAction } from 'react';

export const addCommas = (x: number) => {
  // 콤마 추가
  const parts = x.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
};

export const removeCommas = (num: number) => {
  // 콤마 제거
  const number = num.toString().replace(/,/g, '');
  return number;
};

export const leftpad = (val: any, resultLength = 2, leftpadChar = '0') =>
  (String(leftpadChar).repeat(resultLength) + String(val)).slice(String(val).length);

// date 형식 -> YYYY-MM 형식으로 변환
export const dateAsYYYYMM = (date: Date) => date.getFullYear() + '-' + leftpad(date.getMonth() + 1, 2);

// date 형식 -> YYYY-MM-DD 형식으로 변환
export const dateAsYYYYMMDD = (date: Date) =>
  date.getFullYear() + '-' + leftpad(date.getMonth() + 1, 2) + '-' + leftpad(date.getDate(), 2);

export const dateAsYYYYMMDDHHMMSEC = (date: Date, sec: number) =>
  // date 형식 -> YYYY-MM-DD HH:MM:SEC 형식으로 변환
  date.getFullYear() +
  '-' +
  leftpad(date.getMonth() + 1, 2) +
  '-' +
  leftpad(date.getDate(), 2) +
  ' ' +
  leftpad(date.getHours(), 2) +
  ':' +
  leftpad(date.getMinutes(), 2) +
  ':' +
  leftpad(sec, 2);

export const dateAsYYYYMMDDHHMM = (date: Date) =>
  // date 형식 -> YYYYMMDDHHMM 형식으로 변환
  date.getFullYear() +
  leftpad(date.getMonth() + 1, 2) +
  leftpad(date.getDate(), 2) +
  leftpad(date.getHours(), 2) +
  leftpad(date.getMinutes(), 2);

export const dateAsYYYYMMDDHHMMv2 = (date: Date) =>
  // date 형식 -> YYYY-MM-DD HH:MM 형식으로 변환
  date.getFullYear() +
  '-' +
  leftpad(date.getMonth() + 1, 2) +
  '-' +
  leftpad(date.getDate(), 2) +
  ' ' +
  leftpad(date.getHours(), 2) +
  ':' +
  leftpad(date.getMinutes(), 2) +
  ':';

export const YYYYMMDDToDate = (dateStr: string) => {
  // YYYYMMDD 형식 -> date형식으로 변환
  const yyyyMMdd = dateStr;
  const sYear = yyyyMMdd.substring(0, 4);
  const sMonth = yyyyMMdd.substring(5, 7);
  const sDate = yyyyMMdd.substring(8, 10);

  //alert("sYear :"+sYear +"   sMonth :"+sMonth + "   sDate :"+sDate);
  return new Date(Number(sYear), Number(sMonth) - 1, Number(sDate));
};

export const YYYYMMDDHHMMSSToDate = (date: string) =>
  // YYYYMMDDHHMMSS 형식 -> date형식으로 변환
  new Date(date.replace(/^(\d{4})(\d\d)(\d\d)(\d\d)(\d\d)(\d\d)$/, '$1-$2-$3 $4:$5:$6'));

export const dateNumberToString = (dateAsNum: number) =>
  String(dateAsNum).slice(0, 4) + '-' + String(dateAsNum).slice(4, 6) + '-' + String(dateAsNum).slice(6, 8);

export const betweenDay = (firstDate: string, secondDate: string) => {
  // firstDate, secondDate -> YYYYMMDD형식
  // 두 날짜 사이의 차 구하기
  const firstDateObj = new Date(
    Number(firstDate.substring(0, 4)),
    Number(firstDate.substring(4, 6)) - 1,
    Number(firstDate.substring(6, 8)),
  );
  const secondDateObj = new Date(
    Number(secondDate.substring(0, 4)),
    Number(secondDate.substring(4, 6)) - 1,
    Number(secondDate.substring(6, 8)),
  );
  const betweenTime = Math.abs(secondDateObj.getTime() - firstDateObj.getTime());
  return Math.floor(betweenTime / (1000 * 60 * 60 * 24)) + 1;
};

// element의 절대적 위치 구하기 (마우스 hover 시 도움말을 표시할 위치를 구하기 위해 사용)
export const getAbsolutePosition = (
  element: HTMLElement | null,
  setStateAction: Dispatch<SetStateAction<{ top: number; left: number }>>,
) => {
  if (element !== null) {
    setStateAction({
      top: element.getBoundingClientRect().top,
      left: element.getBoundingClientRect().left,
    });
  }
};

// 파일 다운로드
export const downloadFile = (fileUrl: string, fileName: string) => {
  fetch(fileUrl, { method: 'GET', cache: 'no-cache' })
    .then((res) => {
      return res.blob();
    })
    .then((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      setTimeout((_: any) => {
        window.URL.revokeObjectURL(url);
      }, 60000);
      a.remove();
    })
    .catch((err) => {
      console.error('err: ', err);
    });
};

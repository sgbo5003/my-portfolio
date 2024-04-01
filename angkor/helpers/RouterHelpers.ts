export function getCurrentUrl(pathname: string) {
  return pathname.split(/[?#]/)[0];
}

export function checkIsActive(pathname: string, url: string) {
  if (typeof pathname === 'undefined') {
    return false;
  }
  const current = getCurrentUrl(pathname);
  if (!current || !url) {
    return false;
  }

  // if (current === url) {
  //   return true;
  // }

  // if (pathname === url) {
  //   return true;
  // }

  if (url.includes(pathname)) {
    return true;
  }

  if (current.indexOf(url) > -1) {
    return true;
  }

  return false;
}

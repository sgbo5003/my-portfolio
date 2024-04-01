import { AuthModel } from './_models';
const AUTH_SESSION_STORAGE_KEY = 'authorization';
const getAuth = (): AuthModel | undefined => {
  if (typeof window !== 'undefined') {
    if (!sessionStorage) {
      return;
    }

    const lsValue: string | null = sessionStorage.getItem(AUTH_SESSION_STORAGE_KEY);
    if (!lsValue) {
      return;
    }

    try {
      const auth: AuthModel = JSON.parse(lsValue) as AuthModel;
      if (auth) {
        // You can easily check auth_token expiration also
        return auth;
      }
    } catch (error) {
      console.error('AUTH SESSION STORAGE PARSE ERROR', error);
    }
  } else {
    return;
  }
};

const setAuth = (auth: AuthModel) => {
  if (typeof window !== 'undefined') {
    if (!sessionStorage) {
      return;
    }

    try {
      const lsValue = JSON.stringify(auth);
      sessionStorage.setItem(AUTH_SESSION_STORAGE_KEY, lsValue);
    } catch (error) {
      console.error('AUTH SESSION STORAGE SAVE ERROR', error);
    }
  } else {
    return;
  }
};

const removeAuth = () => {
  if (typeof window !== 'undefined') {
    if (!sessionStorage) {
      return;
    }

    try {
      sessionStorage.removeItem(AUTH_SESSION_STORAGE_KEY);
    } catch (error) {
      console.error('AUTH SESSION STORAGE REMOVE ERROR', error);
    }
  } else {
    return;
  }
};

export function setupAxios(axios: any) {
  axios.defaults.headers.Accept = 'application/json';
  axios.interceptors.request.use(
    (config: { headers: { Authorization: string } }) => {
      const auth = getAuth();
      if (auth && auth.accessToken) {
        config.headers.Authorization = `Bearer ${auth.accessToken}`;
      }

      return config;
    },
    (err: any) => Promise.reject(err),
  );
}

export { getAuth, setAuth, removeAuth, AUTH_SESSION_STORAGE_KEY };

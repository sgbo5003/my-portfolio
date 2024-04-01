import axios from 'axios';
import { AuthModel, UserModel } from './_models';

const API_URL = process.env.NEXT_PUBLIC_APP_API_URL;

export const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL}/verify_token`;
export const LOGIN_URL = `${API_URL}/login`;
export const SIGNUP_URL = `${API_URL}/singup`;
export const REQUEST_PASSWORD_URL = `${API_URL}/find-password`;

// Server should return AuthModel
export function login(email: string, password: string) {
  return axios.post<AuthModel>(LOGIN_URL, {
    email,
    password,
  });
}

// Server should return AuthModel
export function singup(email: string, name: string, password: string) {
  return axios.post(SIGNUP_URL, {
    email,
    name,
    password,
  });
}

// Server should return object => { result: boolean } (Is Email in DB)
export const requestPassword = (name: string, email: string) =>
  axios.post<{ result: boolean }>(REQUEST_PASSWORD_URL, {
    name,
    email,
  });

export function getUserByToken(token: string) {
  return axios.post<UserModel>(GET_USER_BY_ACCESSTOKEN_URL, {
    api_token: token,
  });
}

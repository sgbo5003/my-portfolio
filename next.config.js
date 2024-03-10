/** @type {import('next').NextConfig} */
const repository = 'http://sgbo5003.github.io/my-portfolio';
const debug = process.env.NODE_ENV !== 'production';
const prefix = process.env.NODE_ENV === 'production' ? 'http://sgbo5003.github.io/my-portfolio' : '';
const nextConfig = {
  assetPrefix: !debug ? `/${repository}/` : '', // production 일때 prefix 경로
  trailingSlash: true, // 빌드 시 폴더 구조 그대로 생성하도록
};

module.exports = nextConfig;

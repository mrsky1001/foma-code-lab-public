declare const __APP_COMMIT_HASH__: string;
declare const __APP_COMMIT_DATE__: string;

export const BUILD_INFO = {
  commit: typeof __APP_COMMIT_HASH__ !== 'undefined' ? __APP_COMMIT_HASH__ : 'dev',
  date: typeof __APP_COMMIT_DATE__ !== 'undefined' ? __APP_COMMIT_DATE__ : '14.09.2026',
};

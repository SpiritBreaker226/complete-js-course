import { TIMEOUT_SECONDS } from './config';

const timeout = function (seconds) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(
        new Error(`Request took too long! Timeout after ${seconds} second(s)`)
      );
    }, seconds * 1000);
  });
};

export const AJAX = async (url, uploadData = undefined) => {
  const fetching = uploadData
    ? fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(uploadData),
      })
    : fetch(url);

  const res = await Promise.race([fetching, timeout(TIMEOUT_SECONDS)]);

  const data = await res.json();

  if (!res.ok) {
    throw new Error(`${data.message} (${res.status})`);
  }

  return data;
};

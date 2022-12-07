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

export const getJSON = async url => {
  const res = await Promise.race([fetch(url), timeout(TIMEOUT_SECONDS)]);

  const data = await res.json();

  if (!res.ok) {
    throw new Error(`${data.message} (${res.status})`);
  }

  return data;
};
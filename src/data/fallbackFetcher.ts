/**
 * Fallback fetcher for browsers where fetch is not supported
 */
function fallbackFetch(url: string): Promise<Response> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(new Response(xhr.responseText, { status: xhr.status }));
      } else {
        reject(new Error(`XHR failed with status ${xhr.status}`));
      }
    };
    xhr.onerror = () => reject(new Error("XHR network error"));
    xhr.send();
  });
}

/**
 * Fetch with fallback to XMLHttpRequest if fetch is not supported
 * @param url Url to fetch
 * @returns Promise<Response>
 */
const fetchWithFallback = (url: string): Promise<Response> => {
  if (typeof fetch !== "undefined") {
    return fetch(url);
  } else {
    // Fallback to XMLHttpRequest if fetch is not supported
    return fallbackFetch(url);
  }
};

export default fetchWithFallback;

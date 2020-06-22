import _get from 'lodash/get';
import _find from 'lodash/find';
import { CHECK_PRODUCTION, GET_PAGE_INFO } from '@/types';

import Vue from 'vue';
import Prodwarn from '@/content-scripts/Prodwarn.vue';

interface CheckProdResponse {
  shouldWarning: Boolean;
}

chrome.runtime.sendMessage({
  command: CHECK_PRODUCTION,
  args: { host: window.location.host },
}, (response: CheckProdResponse): void => {
  if (response.shouldWarning) {
    const element = document.createElement('div');
    element.setAttribute('id', 'prodwarn-root');
    document.body.appendChild(element);

    new Vue({
      render: h => h(Prodwarn),
    }).$mount('#prodwarn-root');
  }
});

chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
  const isGetPageInfo = _get(message, 'command') === GET_PAGE_INFO;

  if (!isGetPageInfo) return undefined;

  const favicon: Element | null = document.querySelector('link[rel="mask-icon"]')
    || document.querySelector('link[rel="alternate icon"]')
    || document.querySelector('link[rel="icon"]')
    || document.querySelector('link[rel="shortcut icon"]');

  return sendResponse({
    faviconURL: favicon ? favicon.getAttribute('href') : null,
    location: {
      host: window.location.host,
      origin: window.location.origin,
    },
  });
});

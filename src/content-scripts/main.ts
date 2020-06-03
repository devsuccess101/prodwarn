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
  args: { location: window.location },
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

  const nodeList = document.getElementsByTagName('link');
  const favicon = _find(nodeList, (element) => {
    const isFavicon = element.getAttribute('rel') === 'icon'
      || element.getAttribute('rel') === 'shortcut icon';

    return isFavicon;
  });

  return sendResponse({
    faviconURL: favicon ? favicon.getAttribute('href') : null,
    location: window.location,
  });
});

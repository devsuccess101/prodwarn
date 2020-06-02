import _get from 'lodash/get';
import { openDB } from 'idb';
import { IMessage, CHECK_PRODUCTION } from '@/types';
import { whenCommand } from '@/utils/message';
import {
  DB_NAME, DB_VERSION, DB_TABLE_SITES, DB_TABLE_WHITELISTS,
} from '@/config/indexDB';

const migrateDB = (): void => {
  openDB(DB_NAME, DB_VERSION, {
    upgrade: (db) => {
      const sites = db.createObjectStore(DB_TABLE_SITES, { keyPath: 'host' });
      const whitelists = db.createObjectStore(DB_TABLE_WHITELISTS, { keyPath: 'url' });

      sites.createIndex('host', 'host', { unique: true });
      whitelists.createIndex('url', 'url', { unique: true });
    },
  });
};

// Initialize IndexedDB:
chrome.runtime.onInstalled.addListener(migrateDB);
chrome.runtime.onRestartRequired.addListener(migrateDB);

// react to check production request from "main" content script:
chrome.runtime.onMessage.addListener((message: IMessage, sender, sendResponse) => {
  if (!sender.tab) return undefined;

  const host: string | null = _get(message, 'args.location.host');

  if (!host || !whenCommand(CHECK_PRODUCTION, message)) {
    return sendResponse({ shouldWarning: false });
  }

  openDB(DB_NAME, DB_VERSION).then(async (db) => {
    const value = await db.get(DB_TABLE_SITES, host);

    sendResponse({ shouldWarning: !!value });
  });

  return true;
});

<template>
  <div class="page-index">
    <div class="px-4 py-5 flex justify-between items-center">
      <span class="text-xs text-gray-800 tracking-wide">
        Protected Sites
      </span>

      <router-link to="/add-site">
        <i class="el-icon-circle-plus-outline text-lg px-1" />
      </router-link>
    </div>

    <SiteList
      v-if="!isEmptySites"
      :dataSource="sites"
      class="mb-4"
      @remove="removeSite"
    />

    <div v-else class="text-center">
      <router-link to="/add-site">
        <el-button size="small" type="primary">
          Let's get started!
        </el-button>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { openDB } from 'idb';
import _groupBy from 'lodash/groupBy';
import _isEmpty from 'lodash/isEmpty';
import { DB_NAME, DB_VERSION, DB_TABLE_SITES } from '@/config/indexDB';

import { Component, Vue } from 'vue-property-decorator';
import SiteList from '@/popup/components/SiteList.vue';

@Component({ components: { SiteList } })
export default class Index extends Vue {
  public sites: object = {};

  get isEmptySites(): boolean {
    return _isEmpty(this.sites);
  }

  created() {
    return this.fetchSites();
  }

  async fetchSites() {
    const db = await openDB(DB_NAME, DB_VERSION);
    const sites = await db.getAll(DB_TABLE_SITES);

    this.sites = _groupBy(sites, 'group');
  }

  async removeSite({ site, index }: { site: { host: string }, index: number }) {
    const db = await openDB(DB_NAME, DB_VERSION);
    const sites = await db.delete(DB_TABLE_SITES, site.host);

    return this.fetchSites();
  }
}
</script>

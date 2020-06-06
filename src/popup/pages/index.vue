<template>
  <div class="page-index overflow-x-hidden">
    <SearchForm
      :class="{
        'px-4 py-2 transition ease-in-out duration-500 transform': true,
        'scale-x-110': isSearchMode
      }"
      :showCloseIcon="isSearchMode"
      @focus="isSearchMode = true"
      @close="isSearchMode = false"
      @submit="handleSearch"
    />

    <div v-if="!isSearchMode" class="p-4 flex justify-between items-center">
      <span class="text-sm text-gray-800 tracking-wide">Protected Sites</span>

      <router-link to="/add-site">
        <i class="el-icon-circle-plus-outline text-xl px-1" />
      </router-link>
    </div>

    <SiteList
      v-if="!isEmptySites"
      class="mb-4"
      :dataSource="isSearchMode ? searchResults : sites"
      :group-mode="!isSearchMode"
      @remove="removeSite"
      @remove-group="removeGroup"
    />

    <div v-else class="text-center py-4">
      <router-link to="/add-site">
        <el-button size="small" type="primary">Let's get started!</el-button>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { openDB } from 'idb';
import _isEmpty from 'lodash/isEmpty';
import _filter from 'lodash/filter';
import _map from 'lodash/map';
import _join from 'lodash/join';
import _truncate from 'lodash/truncate';
import { DB_NAME, DB_VERSION, DB_TABLE_SITES } from '@/config/indexDB';

import { Component, Vue } from 'vue-property-decorator';
import SiteList from '@/popup/components/SiteList.vue';
import SearchForm from '@/popup/components/SearchForm.vue';

@Component({
  components: {
    SiteList,
    SearchForm,
  },
})
export default class Index extends Vue {
  sites: object[] = [];

  searchResults: object[] = [];

  isSearchMode: boolean = false;

  get isEmptySites(): boolean {
    return _isEmpty(this.sites);
  }

  created() {
    return this.fetchSites();
  }

  async fetchSites() {
    const db = await openDB(DB_NAME, DB_VERSION);
    const sites = await db.getAll(DB_TABLE_SITES);

    this.sites = sites;
    this.searchResults = sites;
  }

  async removeSite({ site, index }: { site: { host: string }; index: number }) {
    const db = await openDB(DB_NAME, DB_VERSION);
    const sites = await db.delete(DB_TABLE_SITES, site.host);

    return this.fetchSites();
  }

  async removeGroup({ group, sites }: { group: string, sites: object[]}) {
    const db = await openDB(DB_NAME, DB_VERSION);
    const items = _map(sites, (site: { host: string }) => db.delete(DB_TABLE_SITES, site.host));

    await Promise.all(items);
    await this.fetchSites();
  }

  handleSearch(form: { query: string }) {
    if (!form.query) {
      this.searchResults = this.sites;
      return;
    }

    // @ts-ignore
    // eslint-disable-next-line
    this.searchResults = _filter(this.sites, (item: { name: string; host: string }) => {
      return item.name.indexOf(form.query) > -1 || item.host.indexOf(form.query) > -1;
    });
  }
}
</script>

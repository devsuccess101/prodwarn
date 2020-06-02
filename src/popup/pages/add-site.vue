<template>
  <section class="p-4">
    <SiteForm @submit="save" />
  </section>
</template>

<script lang="ts">
import { openDB } from 'idb';
import { Component, Vue } from 'vue-property-decorator';
import SiteForm from '@/popup/components/SiteForm.vue';
import { DB_NAME, DB_VERSION, DB_TABLE_SITES } from '@/config/indexDB';

@Component({ components: { SiteForm } })
export default class AddSitePage extends Vue {
  async save(data: object) {
    try {
      const db = await openDB(DB_NAME, DB_VERSION);

      db.put(DB_TABLE_SITES, data);

      this.$router.push('/');
    } catch (e) {
      this.$message.error('Something went wrong');
    }
  }
}
</script>

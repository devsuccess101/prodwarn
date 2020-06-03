<template>
  <section class="p-4">
    <SiteForm v-if="site" :site="site" @submit="save" />

    <div v-else class="text-center">
      <p>Error: Site could not be found.</p>

      <div class="text-center">
        <router-link to="/">
          <el-button size="small" type="primary">
            Back to Home
          </el-button>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { openDB } from 'idb';
import { Component, Vue } from 'vue-property-decorator';
import SiteForm from '@/popup/components/SiteForm.vue';
import { DB_NAME, DB_VERSION, DB_TABLE_SITES } from '@/config/indexDB';

@Component({ components: { SiteForm } })
export default class AddSitePage extends Vue {
  site: object | null = null;

  async beforeMount() {
    if (this.$route.params.site) {
      const db = await openDB(DB_NAME, DB_VERSION);
      const site = await db.get(DB_TABLE_SITES, this.$route.params.site);

      this.site = site;
    }
  }

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

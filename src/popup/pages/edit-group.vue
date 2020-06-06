<template>
  <section class="p-4">
    <RenameForm
      :group="$route.params.group"
      @submit="update"
    />
  </section>
</template>

<script lang="ts">
import { openDB } from 'idb';
import _map from 'lodash/map';
import _assign from 'lodash/assign';
import { Component, Vue } from 'vue-property-decorator';
import RenameForm from '@/popup/components/RenameForm.vue';
import { DB_NAME, DB_VERSION, DB_TABLE_SITES } from '@/config/indexDB';

@Component({ components: { RenameForm } })
export default class AddSitePage extends Vue {
  async update(data: { group: string }) {
    try {
      const db = await openDB(DB_NAME, DB_VERSION);
      const isExistingGroup = await db.countFromIndex(DB_TABLE_SITES, 'group', data.group);
      const update = async () => {
        const sites = await db.getAllFromIndex(DB_TABLE_SITES, 'group', this.$route.params.group);
        await Promise.all(_map(sites, (site: object) => {
          db.put(DB_TABLE_SITES, _assign({}, site, data));
        }));

        this.$router.push('/');
      };

      if (!isExistingGroup) {
        update();
      } else {
        this.$confirm(`Group "${data.group}" is already exists. Do you want to move all sites to new group?`)
          .then(update);
      }
    } catch (e) {
      this.$message.error('Something went wrong');
    }
  }
}
</script>

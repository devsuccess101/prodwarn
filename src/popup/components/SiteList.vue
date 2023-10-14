<template>
  <section class="section-protected-sites">
    <el-collapse
      v-if="groupMode"
      v-model="activeNames"
      class="bg-white shadow-md"
      accordion
      @change="onChange"
    >
      <el-collapse-item
        v-for="(sites, group) in sitesByGroup"
        :key="group"
        :name="group"
        class="protected-site-group"
      >
        <template slot="title">
          <SiteGroupTitle
            :group="group"
            :sites="sites"
            @remove-group="$emit('remove-group', $event)"
          />
        </template>

        <SiteListItem
          v-for="(site, index) in sites"
          :key="index"
          :site="site"
          @remove="$emit('remove', $event)"
        />
      </el-collapse-item>
    </el-collapse>

    <div v-else class="bg-white shadow-md">
      <SiteListItem
        v-for="(site, index) in dataSource"
        :key="index"
        :site="site"
        @remove="$emit('remove', $event)"
      />
    </div>
  </section>
</template>

<script lang="ts">
import _groupBy from 'lodash/groupBy';
import emptyFileSVG from '@/popup/assets/images/empty-file.svg';

import { Component, Prop, Vue } from 'vue-property-decorator';
import SiteListItem from '@/popup/components/SiteListItem.vue';
import SiteGroupTitle from '@/popup/components/SiteGroupTitle.vue';

@Component({
  components: {
    SiteListItem,
    SiteGroupTitle,
  },
})
export default class SiteList extends Vue {
  @Prop({ default: () => [] })
  dataSource!: Array<object>;

  @Prop({ default: true })
  groupMode!: boolean;

  activeNames: string[] = [];

  get sitesByGroup(): object {
    return _groupBy(this.dataSource, 'group');
  }

  created() {
    const cached = localStorage.getItem('expandedGroups');

    if (cached) {
      this.activeNames = JSON.parse(cached);
    }
  }

  onChange = (data: Array<string>) => {
    localStorage.setItem('expandedGroups', JSON.stringify(data));
  }
}
</script>

<style lang="scss">
  .protected-site-group {
    .el-collapse-item {
      &__header {
        padding-left: 1rem;
        padding-right: 1rem;
        &.is-active {
          border-bottom: solid 1px #73d47b;
        }
      }

      &__content {
        padding-bottom: 0;
      }

      &__arrow {
        display: none;
      }
    }
  }
</style>

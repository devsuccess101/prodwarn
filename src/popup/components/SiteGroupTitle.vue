<template>
  <div class="flex justify-between w-full">
    <span>{{group}} ({{sites.length}})</span>
    <el-dropdown trigger="click">
      <el-button
        circle
        size="small"
        icon="el-icon-more"
        class="border-0 focus:outline-none"
        @click.native="$event.stopPropagation()"
      />

      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="$router.push(`/edit-group/${group}`)">
          Rename
        </el-dropdown-item>

        <el-dropdown-item @click.native="confirmRemove">
          Remove
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import _map from 'lodash/map';
import _join from 'lodash/join';
import _truncate from 'lodash/truncate';

@Component
export default class SiteGroupTitle extends Vue {
  @Prop({ required: true })
  group!: string;

  @Prop({ default: () => [] })
  sites!: object[];

  confirmRemove() {
    const sitesName: string = _truncate(_join(_map(this.sites, 'name'), ', '), { length: 255 });

    this.$confirm(`Delete group will remove all sites: ${sitesName}`, 'Are you sure?')
      .then(() => this.$emit('remove-group', {
        group: this.group,
        sites: this.sites,
      }));
  }
}
</script>

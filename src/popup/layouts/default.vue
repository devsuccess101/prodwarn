<template>
  <div class="layout layout-default">
    <Header />

    <el-main>
      <router-view />
    </el-main>

    <Footer />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';

@Component({
  components: {
    Header,
    Footer,
  },
})
export default class DefaultLayout extends Vue {}
</script>

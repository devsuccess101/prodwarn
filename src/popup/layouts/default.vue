<template>
  <div class="h-full flex flex-col">
    <Header />

    <el-main class="flex-1 m-0 p-0 bg-gray-200">
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

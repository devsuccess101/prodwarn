<template>
  <article class="p-4">
    <p class="my-4">
      <i>In a beautiful day</i>, you accidentally test on the production system
      instead of the dev/test systems when coding.
      This is a way that the incident is to be.
    </p>

    <p class="my-4">
      <strong class="capitalize">{{ packageName }}</strong>
      is a browser extension that will warn us when using the production
      system instead of the dev/test system. It is an open-source software.
      Therefore, you can contribute for it on
      <a
        href="https://github.com/kimyvgy/prodwarn"
        target="_blank"
      >Github</a>.
    </p>

    <p class="my-4">
      Maintainer: Kim Nguyen
      <br />Contact email:
      <a
        href="mailto:kimnguyen.ict@gmail.com"
        class="text-blue-600"
        target="_blank"
      >kimnguyen.ict@gmail.com</a>
    </p>
  </article>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class AboutPage extends Vue {
  packageName: string = process.env.PACKAGE_NAME || 'Prodwarn';
}
</script>

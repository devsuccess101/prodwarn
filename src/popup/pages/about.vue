<template>
  <article class="p-4">
    <h2 class="font-semibold my-2">Don't test in production?</h2>

    <p class="my-2">
      Yes, testing in production is risky. Although everybody knew that, in some cases,
      we accidentally test on the production system instead of the dev/test systems
      then the incident is to be.
    </p>

    <p class="my-2">
      <strong class="capitalize font-semibold">{{ packageName }}</strong>
      is a browser extension that will warn us when using the production system
      instead of the dev/test system in your setting. It is an open-source software.
      Therefore, you can find us on
      <a href="https://github.com/kimyvgy/prodwarn" target="_blank">Github</a>.
    </p>

    <p class="my-2">
      Let feel free to contribute or send us your feedback!
    </p>

    <p class="my-2">
      Maintainer: Kim Nguyen <br>
      Contact email:
      <a href="mailto:kimnguyen.ict@gmail.com" class="text-blue-600" target="_blank">
        kimnguyen.ict@gmail.com
      </a>
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

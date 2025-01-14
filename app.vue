<template>
  <NuxtPage />
</template>

<script setup lang="ts">
import { useHead } from '#app';

useHead({
  script: [
    {
      src: 'https://assets.zephr.com/zephr-browser/1.9.1/zephr-browser.umd.js',
      async: true,
      onload: `
        if (window.Zephr) {
          window.Zephr.run({
            jwt: 'your-valid-jwt-here',
            customData: {},
          });
          console.log('Zephr Browser script initialized via useHead.');
        }
      `,
    },
  ],
});
</script>

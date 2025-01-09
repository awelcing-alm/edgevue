<template>
  <div>
    <TopNav />
    <NuxtPage />
    <ClientOnly>
      <div id="zephr-integration"></div>
    </ClientOnly>
  </div>
</template>

<script setup>
import TopNav from '~/components/TopNav.vue';

onMounted(() => {
  const zephrScript = document.createElement('script');
  zephrScript.src = 'https://assets.zephr.com/zephr-browser/1.9.1/zephr-browser.umd.js';
  zephrScript.async = true;

  zephrScript.onload = () => {
    zephrBrowser.run({
      jwt: 'YOUR_JWT_TOKEN',
      customData: { 'article-type': 'premium' },
    });
  };

  document.head.appendChild(zephrScript);
});
</script>

<template>
  <div class="min-h-screen bg-emerald-50">
    <header class="border-b bg-emerald-800 text-emerald-50">
      <nav class="container mx-auto px-4 py-6 flex justify-between items-center">
        <div class="flex items-center gap-8">
          <NuxtLink to="/" class="text-2xl font-bold flex items-center gap-2">
            <span class="text-3xl">🦎</span>
            Newts' News
          </NuxtLink>
          <NuxtLink to="/stats" class="hover:text-emerald-200 transition">
            Statistics
          </NuxtLink>
        </div>
        <button 
          @click="openRegistration" 
          class="bg-emerald-600 hover:bg-emerald-500 px-4 py-2 rounded-lg transition"
        >
          Register
        </button>
      </nav>
    </header>
    <main class="container mx-auto px-4 py-8">
      <NuxtPage />
    </main>
    <ClientOnly>
      <div id="zephr-integration"></div>
    </ClientOnly>
  </div>
</template>

<script setup>
onMounted(() => {
  const zephrScript = document.createElement('script');
  zephrScript.src = 'https://assets.zephr.com/zephr-browser/1.9.1/zephr-browser.umd.js';
  zephrScript.async = true;

  zephrScript.onload = () => {
    window.zephrBrowser.run({
      jwt: 'YOUR_JWT_TOKEN',
      customData: { 'article-type': 'premium' },
    });
  };

  document.head.appendChild(zephrScript);
});

function openRegistration() {
  if (window.zephrBrowser) {
    window.zephrBrowser.showRegistration();
  }
}
</script>
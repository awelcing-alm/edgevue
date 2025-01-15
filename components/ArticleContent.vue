<template>
  <ClientOnly>
    <article v-if="!isLoading" class="prose lg:prose-xl max-w-none bg-white shadow-lg rounded-lg p-8">
      <p v-if="isBlocked" class="text-red-600">
        This content is restricted. Please log in to access.
      </p>
      <div v-else>
        <h1 class="text-4xl font-extrabold text-center text-geckoOrange mb-6">{{ doc.title }}</h1>
        <ContentRenderer :value="doc.body" />
      </div>
    </article>
    <p v-else class="text-gray-500">Loading article...</p>
  </ClientOnly>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const isBlocked = ref(false);
const isLoading = ref(true);
defineProps({
  doc: {
    type: Object,
    required: true,
  },
});

function handleZephrDecision() {
  const outcomes = window.Zephr?.outcomes || {};
  const featureKeys = Object.keys(outcomes);

  if (featureKeys.length > 0) {
  const featureKey = featureKeys[0]; // Access the first feature key

  if (!featureKey || !(featureKey in outcomes)) {
    console.warn('Feature key is undefined or not found in outcomes.');
    isBlocked.value = true; // Default behavior if the key isn’t valid
    isLoading.value = false;
    return;
  }

  const decision = outcomes[featureKey];
  isBlocked.value = decision?.outcomeLabel !== 'allow';
}

  isLoading.value = false;
}

onMounted(() => {
  document.addEventListener('zephr.browserDecisionsFinished', handleZephrDecision);

  if (window.Zephr?.outcomes) {
    handleZephrDecision();
  } else if (window.zephrBrowser?.run) {
    window.zephrBrowser.run({ jwt: '', debug: true });
  }
});
</script>

<style scoped>
.prose h1,
.prose h2,
.prose h3 {
  color: #3b7973;
  font-weight: bold;
}
.prose blockquote {
  border-left: 4px solid #fdae61;
  background: #fff3e0;
  padding-left: 1rem;
}
</style>

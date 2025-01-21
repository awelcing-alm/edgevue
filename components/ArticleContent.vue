<template>
  <ClientOnly>
    <article id="zephr-article-content" class="article-wrapper prose prose-emerald max-w-none">
      <template v-if="!isLoading">
        <p v-if="isBlocked" class="text-red-600 text-center">
          This content is restricted. Please sign in to access.
        </p>
        <ContentRenderer v-else :value="doc">
          <template #empty>
            <p>No content found.</p>
          </template>
        </ContentRenderer>
      </template>
      <p v-else class="loading-placeholder">Loading article...</p>
    </article>
  </ClientOnly>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAuth } from '~/composables/useAuth';

const auth = useAuth();
const isBlocked = ref(false);
const isLoading = ref(true);

defineProps({
  doc: {
    type: Object,
    required: true,
  },
});

function handleZephrDecision() {
  const decisionData = window.Zephr || {};
  const featureResults = decisionData.featureResults || {};
  const accessDetails = decisionData.accessDetails || {};

  console.log('%c[Zephr] Decision Data:', 'color: #4ade80;', decisionData);

  if (accessDetails.authenticated) {
    isBlocked.value = false;
    isLoading.value = false;
    return;
  }

  const featureOutcome = featureResults['edge-integration'];
  isBlocked.value = !(featureOutcome && featureOutcome.includes('leave_pristine'));
  isLoading.value = false;
}

onMounted(() => {
  if (auth.user?.jwt) {
    isBlocked.value = false;
    isLoading.value = false;
    return;
  }

  document.addEventListener('zephr.browserDecisionsFinished', handleZephrDecision);

  if (window.zephrBrowser?.run) {
    window.zephrBrowser.run({
      jwt: '',
      debug: true,
    });
  }
});
</script>

<style>
.article-wrapper {
  @apply bg-white p-8 rounded-lg shadow-lg;
}

/* Enhanced Typography */
.prose {
  @apply text-gray-800;
}

.prose h1 {
  @apply text-4xl font-bold text-emerald-900 mb-8;
}

.prose h2 {
  @apply text-2xl font-bold text-emerald-800 mt-8 mb-4;
}

.prose h3 {
  @apply text-xl font-semibold text-emerald-700 mt-6 mb-3;
}

.prose p {
  @apply text-lg leading-relaxed mb-4;
}

.prose a {
  @apply text-emerald-600 hover:text-emerald-700 underline;
}

.prose ul {
  @apply list-disc pl-6 mb-4;
}

.prose ol {
  @apply list-decimal pl-6 mb-4;
}

.prose li {
  @apply mb-2;
}

.prose blockquote {
  @apply border-l-4 border-emerald-500 pl-4 italic my-4 text-gray-700;
}

.prose code {
  @apply bg-gray-100 px-2 py-1 rounded text-sm;
}

.prose pre {
  @apply bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-4;
}

.prose img {
  @apply rounded-lg shadow-md my-6;
}

.prose table {
  @apply w-full border-collapse my-6;
}

.prose th,
.prose td {
  @apply border border-gray-300 px-4 py-2;
}

.prose th {
  @apply bg-gray-100 font-semibold;
}

.loading-placeholder {
  @apply text-center text-gray-500 animate-pulse;
}
</style>
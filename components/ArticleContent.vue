<template>
  <ClientOnly>
    <div class="prose lg:prose-xl max-w-none bg-white shadow-lg rounded-lg p-8">
      <p v-if="isLoading" class="text-gray-500">Loading article...</p>

      <div v-else-if="isBlocked" class="text-red-500">
        <p>This content is available to premium users. Please <a href="/Register" class="underline text-emerald-600">sign in</a>.</p>
      </div>

      <article v-else>
        <ContentRenderer v-if="doc?.body" :value="doc.body" />
        <p v-else class="text-gray-500">No content found.</p>
      </article>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

interface ContentDocument {
  body?: {
    children: Array<Record<string, any>>;
  };
  [key: string]: any;
}

defineProps<{ doc: ContentDocument }>();

const isLoading = ref(true); // Track loading state
const isBlocked = ref(false); // Track blocked content

function evaluateFeature() {
  if (window.Zephr && window.Zephr.run) {
    window.Zephr.run({
      customData: { featureCheck: 'articleAccess' },
      onSuccess: () => {
        const featureOutcome = window.Zephr.outcomes?.['articleContent'];
        if (featureOutcome?.outcomeLabel === 'allow') {
          isBlocked.value = false; // Allow the content
        } else {
          isBlocked.value = true; // Block the content
        }
        isLoading.value = false; // Stop the loading indicator
      },
      onFailure: () => {
        console.warn('Zephr feature decision failed.');
        isBlocked.value = true; // Default to blocked if there’s a failure
        isLoading.value = false;
      },
    });
  } else {
    console.error('Zephr is not loaded. Please check your configuration.');
    isBlocked.value = true;
    isLoading.value = false;
  }
}

onMounted(() => {
  evaluateFeature(); // Run Zephr feature check on component mount
});
</script>

<style scoped>
.prose {
  max-width: none;
}
.prose h1,
.prose h2,
.prose h3 {
  @apply text-emerald-900 font-bold;
}
.prose p {
  @apply leading-relaxed text-gray-700;
}
.prose ul,
.prose ol {
  @apply my-4 ml-6 list-disc list-decimal text-gray-700;
}
.prose li {
  @apply mb-2;
}
.prose blockquote {
  @apply border-l-4 border-emerald-500 pl-4 bg-emerald-50 italic text-gray-800;
}
.prose strong {
  @apply text-emerald-900;
}
.prose em {
  @apply text-emerald-600 italic;
}
.prose img {
  @apply rounded-lg shadow-md mt-4 mb-4;
}
.prose hr {
  @apply my-8 border-t-2 border-emerald-100;
}
</style>

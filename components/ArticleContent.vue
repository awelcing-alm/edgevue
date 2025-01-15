<template>
  <ClientOnly>
    <div class="prose lg:prose-xl max-w-none bg-white shadow-lg rounded-lg p-8">
      <p v-if="isLoading" class="text-gray-500">Loading article...</p>

      <div v-else-if="!isFeatureAllowed" class="text-red-500">
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
import { onMounted } from 'vue';
import { useZephrFeature } from '~/composables/useZephrFeature';

defineProps<{ doc: Record<string, any> }>();

const { isFeatureAllowed, isLoading, evaluateFeature } = useZephrFeature();

// Run the feature decision on mount
onMounted(() => {
  evaluateFeature('articleContent'); // Pass the Zephr feature ID
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

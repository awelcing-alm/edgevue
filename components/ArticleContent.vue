<template>
  <ClientOnly>
    <article v-if="!isLoading" id="zephr-article-content" class="article-wrapper prose lg:prose-xl max-w-none bg-white shadow-lg rounded-lg p-8">
      <p v-if="isBlocked" class="text-red-600 text-center">
        This content is restricted. Please sign in to access.
      </p>

      <!-- Render Article Content -->
      <ContentRenderer v-else :value="doc.body">
        <template #default="{ value }">
          <div v-for="(node, index) in value.children" :key="index" class="mb-4">
            <component :is="node.tag" v-bind="node.props">
              <template v-for="(child, idx) in node.children || []" :key="idx">
                <span v-if="child.type === 'text'">{{ child.value }}</span>
                <component v-else :is="child.tag" v-bind="child.props">
                  <template v-for="(innerChild, i) in child.children || []" :key="i">
                    <span v-if="innerChild.type === 'text'">{{ innerChild.value }}</span>
                  </template>
                </component>
              </template>
            </component>
          </div>
        </template>
      </ContentRenderer>
    </article>
    <p v-else class="text-gray-500 text-center">Loading article...</p>
  </ClientOnly>
</template>

<script setup lang="ts">
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
  const zephrData = window.Zephr as unknown as { featureResults?: Record<string, string> }; // Explicit type casting
  const outcomes = zephrData.featureResults || {}; // Access featureResults safely
  const featureKey = 'edge-integration'; // Static key

  if (!outcomes[featureKey]) {
    console.warn('[Zephr] No decision for featureKey.');
    isBlocked.value = true; // Block if no valid outcome
    isLoading.value = false;
    return;
  }

  const featureResult = outcomes[featureKey];
  console.log('[Zephr] Feature Result:', featureResult);

  // Check the feature result string to allow content
  isBlocked.value = !featureResult.includes('Show all content'); // Block if outcome does not allow content
  isLoading.value = false;
}

onMounted(() => {
  // If authenticated, show content instantly
  if (auth.user?.jwt) {
    console.log('[Zephr] Authenticated user detected: showing content.');
    isBlocked.value = false;
    isLoading.value = false;
    return;
  }

  // Wait for Zephr decision for unauthenticated users
  document.addEventListener('zephr.browserDecisionsFinished', handleZephrDecision);

  if (window.zephrBrowser?.run) {
    console.log('[Zephr] Running Zephr browser for article decision...');
    window.zephrBrowser.run({
      jwt: '', // Empty JWT for anonymous
      debug: true,
    });
  }
});
</script>

<style>
.article-wrapper {
  border: 1px solid #e5e7eb;
  position: relative;
}

.loading-placeholder {
  min-height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.05);
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0%,
  100% {
    background-color: rgba(0, 0, 0, 0.05);
  }
  50% {
    background-color: rgba(0, 0, 0, 0.1);
  }
}

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

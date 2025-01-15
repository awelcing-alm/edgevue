<template>
  <ClientOnly>
    <!-- Explicitly define the article wrapper with an ID for targeting in Zephr Console -->
    <article id="zephr-article-content" class="article-wrapper prose lg:prose-xl max-w-none bg-white shadow-lg rounded-lg p-8">
      <p v-if="isBlocked" class="text-red-600 text-center">
        This content is restricted. Please sign in to access.
      </p>

      <!-- Render Article Content -->
      <div v-else>
        <h1 class="text-4xl font-extrabold text-center text-geckoOrange mb-6">{{ doc.title }}</h1>
        <ContentRenderer :value="doc.body">
          <template #default="{ value }">
            <div v-for="(node, index) in value.children" :key="index" class="mb-4">
              <component :is="node.tag" v-bind="node.props">
                <template v-for="(child, idx) in node.children || []" :key="idx">
                  <span v-if="child.type === 'text'">{{ child.value }}</span>
                </template>
              </component>
            </div>
          </template>
        </ContentRenderer>
      </div>
    </article>

    <!-- Placeholder shown while loading -->
    <div v-if="isLoading" class="loading-placeholder">
      <p class="text-center text-gray-500">Loading article...</p>
    </div>
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

// Handle Zephr Decision Logic
function handleZephrDecision() {
  const outcomes: Record<string, { outcomeLabel: string }> = window.Zephr?.outcomes || {};
  const featureKey = Object.keys(outcomes)[0] ?? '';

  if (!featureKey || !outcomes[featureKey]) {
    isBlocked.value = true;
    isLoading.value = false;
    return;
  }

  const decision = outcomes[featureKey] as { outcomeLabel: string };
  isBlocked.value = decision.outcomeLabel !== 'allow';
  isLoading.value = false;
}

onMounted(() => {
  // Show content instantly if the user is logged in
  if (auth.user?.jwt) {
    console.log('Authenticated user detected: Showing article content instantly.');
    isBlocked.value = false;
    isLoading.value = false;
    return;
  }

  // For unauthenticated users, wait for Zephr decision
  document.addEventListener('zephr.browserDecisionsFinished', handleZephrDecision);

  if (window.zephrBrowser?.run) {
    console.log('Waiting for Zephr decision...');
    window.zephrBrowser.run({
      jwt: '', // Empty JWT for anonymous users
      debug: true,
    });
  }
});
</script>

<style scoped>
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

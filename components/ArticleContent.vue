<template>
  <ClientOnly>
    <article
      v-if="!isLoading"
      id="zephr-article-content"
      class="article-wrapper prose lg:prose-xl max-w-none bg-white shadow-lg rounded-lg p-8"
    >
      <!-- Render article content properly using ContentRenderer slots -->
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

// Extend the Zephr outcomes type to include featureResults
type ZephrOutcomes = {
  outcomes?: Record<string, { outcomeLabel: string }>;
  featureResults?: Record<string, string>; // Add featureResults explicitly
  accessDetails?: any;
};

// Use the type when accessing window.Zephr
const handleZephrDecision = () => {
  const zephrOutcome: ZephrOutcomes = window.Zephr || {};
  
  if (!zephrOutcome.featureResults) {
    console.warn('No featureResults found from Zephr.');
    isBlocked.value = true;
    isLoading.value = false;
    return;
  }

  // Example feature key for your implementation
  const featureKey = 'edge-integration';
  const featureResult = zephrOutcome.featureResults[featureKey];

  if (featureResult?.includes('Show all content')) {
    console.log('[Zephr] Outcome allows content.');
    isBlocked.value = false;
  } else {
    console.warn('[Zephr] Outcome restricts content.');
    isBlocked.value = true;
  }
  isLoading.value = false;
};


onMounted(() => {
  document.addEventListener('zephr.browserDecisionsFinished', handleZephrDecision);

  if (window.zephrBrowser?.run) {
    window.zephrBrowser.run({
      jwt: auth.user?.jwt || '',
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

<template>
  <ClientOnly>
    <article id="zephr-article-content">
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

// Add the correct type definition
interface ZephrDecision {
  outcomes?: Record<string, { outcomeLabel: string }>;
  featureResults?: Record<string, string>; // Correct type for featureResults
  accessDetails?: {
    authenticated?: boolean;
  };
}

function handleZephrDecision() {
  const decisionData = (window.Zephr || {}) as ZephrDecision;
  const featureResults = decisionData.featureResults || {}; // Access featureResults safely
  const accessDetails = decisionData.accessDetails || {};

  console.log('%c[Zephr] Decision Data:', 'color: #4ade80;', decisionData);

  // If authenticated, allow content
  if (accessDetails.authenticated) {
    console.log('%c[Zephr] User is authenticated. Showing content.', 'color: #10b981;');
    isBlocked.value = false;
    isLoading.value = false;
    return;
  }

  // Check the "edge-integration" decision
  const featureOutcome = featureResults['edge-integration'];

  if (featureOutcome && featureOutcome.includes('leave_pristine')) {
    console.log('%c[Zephr] Outcome indicates unrestricted content.', 'color: #10b981;');
    isBlocked.value = false;
  } else {
    console.warn('%c[Zephr] Outcome indicates restricted content.', 'color: #f87171;');
    isBlocked.value = true;
  }

  isLoading.value = false;
}

onMounted(() => {
  if (auth.user?.jwt) {
    console.log('%c[Zephr] Authenticated user detected. Loading article directly.', 'color: #10b981;');
    isBlocked.value = false;
    isLoading.value = false;
    return;
  }

  document.addEventListener('zephr.browserDecisionsFinished', handleZephrDecision);

  if (window.zephrBrowser?.run) {
    console.log('%c[Zephr] Running Zephr decision...', 'color: #4ade80;');
    window.zephrBrowser.run({
      jwt: '', // Empty for anonymous users
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
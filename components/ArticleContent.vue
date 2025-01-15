<template>
  <ClientOnly>
    <article id="zephr-article-content" class="article-wrapper">
      <template v-if="!isLoading">
        <p v-if="isBlocked" class="text-red-600 text-center">
          This content is restricted. Please sign in to access.
        </p>
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
      </template>
      <p v-else class="loading-placeholder">Loading article...</p>
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

interface ZephrDecision {
  outcomes?: Record<string, { outcomeLabel: string }>;
  featureResults?: Record<string, string>;
  accessDetails?: {
    authenticated?: boolean;
  };
}

function handleZephrDecision() {
  const decisionData = (window.Zephr || {}) as ZephrDecision;
  const featureResults = decisionData.featureResults || {};
  const accessDetails = decisionData.accessDetails || {};

  console.log('%c[Zephr] Decision Data:', 'color: #4ade80;', decisionData);

  if (accessDetails.authenticated) {
    isBlocked.value = false;
    isLoading.value = false;
    return;
  }

  const featureOutcome = featureResults['edge-integration'];

  if (featureOutcome && featureOutcome.includes('leave_pristine')) {
    isBlocked.value = false;
  } else {
    isBlocked.value = true;
  }

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

<style scoped>
.article-wrapper {
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 2rem;
  background-color: #ffffff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

.prose h1,
.prose h2,
.prose h3 {
  color: #3b7973; /* Dark teal for headings */
  font-weight: 700;
  margin-bottom: 1rem;
}

.prose h1 {
  font-size: 2.5rem;
  text-align: center;
}

.prose h2 {
  font-size: 2rem;
  margin-top: 1.5rem;
}

.prose h3 {
  font-size: 1.75rem;
}

.prose p {
  color: #4a5568; /* Neutral dark gray */
  font-size: 1.125rem;
  line-height: 1.8;
  margin-bottom: 1.25rem;
}

.prose a {
  color: #3182ce; /* Blue for links */
  text-decoration: underline;
}

.prose a:hover {
  color: #2b6cb0;
}

.prose ul {
  list-style-type: disc; /* Restore normal bullet points */
  padding-left: 1.5rem; /* Add some padding for indentation */
}

.prose ol {
  list-style-type: decimal; /* Use numbers for ordered lists */
  padding-left: 1.5rem;
}

.prose li {
  margin-bottom: 0.5rem; /* Spacing between list items */
  line-height: 1.6;
}

.prose strong {
  color: #2d3748; /* Bold dark text */
}

.prose em {
  font-style: italic;
  color: #6b7280;
}

.prose img {
  max-width: 100%;
  margin: 1.5rem 0;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.prose blockquote {
  border-left: 4px solid #2c7a7b; /* Teal border */
  padding-left: 1rem;
  background-color: #f0fff4; /* Light green background */
  font-style: italic;
  margin: 1.5rem 0;
}

.prose hr {
  margin: 2rem 0;
  border: none;
  border-top: 2px solid #e2e8f0; /* Light gray horizontal line */
}

.code-block {
  background-color: #f7fafc;
  padding: 1rem;
  border-radius: 8px;
  overflow-x: auto;
  font-family: "Source Code Pro", monospace;
  font-size: 0.95rem;
  line-height: 1.6;
}
</style>

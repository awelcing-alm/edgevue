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

<style>
.article-wrapper {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.article-wrapper h1,
.article-wrapper h2,
.article-wrapper h3 {
  font-family: 'Merriweather', serif;
  color: #1a202c;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
}

.article-wrapper p {
  font-size: 1.125rem;
  line-height: 1.8;
  color: #4a5568;
  margin-bottom: 1.25rem;
}

.article-wrapper ul,
.article-wrapper ol {
  margin-left: 1.5rem;
  padding-left: 1rem;
  margin-bottom: 1.5rem;
}

.article-wrapper li {
  margin-bottom: 0.75rem;
}

.article-wrapper blockquote {
  border-left: 4px solid #68d391;
  background: #f0fff4;
  padding: 1rem;
  font-style: italic;
  color: #22543d;
  margin-bottom: 1.5rem;
}

.article-wrapper strong {
  font-weight: bold;
  color: #2c5282;
}

.article-wrapper em {
  font-style: italic;
  color: #6b46c1;
}

.article-wrapper img {
  max-width: 100%;
  border-radius: 10px;
  margin: 1.5rem 0;
}

.article-wrapper hr {
  border: none;
  height: 2px;
  background-color: #e2e8f0;
  margin: 2rem 0;
}
</style>

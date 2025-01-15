<template>
  <ClientOnly>
    <article v-if="!isLoading" class="prose lg:prose-xl max-w-none bg-white shadow-lg rounded-lg p-8">
      <p v-if="isBlocked" class="text-red-600 text-center">
        This content is restricted. Please sign in to access.
      </p>

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
    <p v-else class="text-gray-500 text-center">Loading article...</p>
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

// Handle Zephr Decision Logic
function handleZephrDecision() {
  const outcomes = window.Zephr?.outcomes || {};
  const featureKey = Object.keys(outcomes)[0] ?? '';

  if (!featureKey || !outcomes[featureKey]) {
    isBlocked.value = true; // Default block if no decision
    isLoading.value = false;
    return;
  }

  const decision = outcomes[featureKey];
  isBlocked.value = decision?.outcomeLabel !== 'allow';
  isLoading.value = false;
}

onMounted(() => {
  console.log('[ArticleContent] Mounted. Waiting for Zephr outcome...');

  document.addEventListener('zephr.browserDecisionsFinished', handleZephrDecision);

  if (window.Zephr?.outcomes) {
    console.log('[Zephr] Outcomes already available on load.');
    handleZephrDecision();
  } else if (window.zephrBrowser?.run) {
    window.zephrBrowser.run({
      jwt: '', // Anonymous user session
      debug: true,
    });
  }
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

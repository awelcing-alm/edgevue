<template>
  <ClientOnly>
    <article v-if="!isLoading" class="prose lg:prose-xl max-w-none bg-white shadow-lg rounded-lg p-8">
      <p v-if="isBlocked" class="text-red-600">
        This content is restricted. Please log in to access.
      </p>
      <ContentRenderer v-else :value="doc.body">
        <template #default="{ value }">
          <div v-for="(node, index) in value.children" :key="index" class="mb-4">
            <component :is="node.tag" v-bind="node.props">
              <template v-for="(child, idx) in node.children || []" :key="idx">
                <span v-if="child.type === 'text'">{{ child.value }}</span>
                <component v-else :is="child.tag" v-bind="child.props">
                  <template v-for="(innerChild, i) in innerChild.children || []" :key="i">
                    <span v-if="innerChild.type === 'text'">{{ innerChild.value }}</span>
                  </template>
                </component>
              </template>
            </component>
          </div>
        </template>
      </ContentRenderer>
    </article>
    <p v-else class="text-gray-500">Loading article...</p>
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

// Function to handle the feature decision
function handleZephrDecision() {
  const outcomes = window.Zephr?.outcomes || {};
  const featureKeys = Object.keys(outcomes);

  if (featureKeys.length > 0) {
    // Get the decision of the first feature (or a specific feature key)
    const featureKey = featureKeys[0]; // Adjust this to the expected feature ID if needed
    const decision = outcomes[featureKey];

    if (!featureKey) {
      console.warn('Feature key is undefined.');
      isLoading.value = false;
      return;
    }

    if (!decision) {
      console.warn(`No decision found for feature: ${featureKey}`);
    }

    // Check if the outcome label indicates that content is allowed
    isBlocked.value = decision?.outcomeLabel !== 'allow'; // Mark blocked if outcome is not 'allow'
  } else {
    console.warn('No outcomes found from Zephr.');
  }

  isLoading.value = false; // Set loading to false once decision is processed
}

onMounted(() => {
  if (typeof window === 'undefined') return;

  // Add an event listener to detect when Zephr finishes processing
  document.addEventListener('zephr.browserDecisionsFinished', handleZephrDecision);

  // If Zephr has already run before the page was loaded
  if (window.Zephr?.outcomes) {
    handleZephrDecision();
  } else if (window.zephrBrowser?.run) {
    console.log('Running Zephr for feature decisions...');
    window.zephrBrowser.run({
      jwt: '', // Optional JWT token if needed
      debug: true, // Enable debug mode to see detailed logs
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

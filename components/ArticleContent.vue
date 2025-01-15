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
  const outcomes = window.Zephr?.outcomes || {};
  const featureKeys = Object.keys(outcomes);

  if (featureKeys.length === 0) {
    console.warn('No outcomes found. Blocking content by default.');
    isBlocked.value = true;
    isLoading.value = false;
    return;
  }

  const featureKey = featureKeys[0];
  if (!featureKey || !(featureKey in outcomes)) {
    console.warn(`Feature key is undefined or not found in outcomes.`);
    isBlocked.value = true;
    isLoading.value = false;
    return;
  }

  const decision = outcomes[featureKey];
  if (!decision) {
    console.warn(`No decision found for feature: ${featureKey}`);
    isBlocked.value = true;
  } else {
    isBlocked.value = decision?.outcomeLabel !== 'allow';
  }
  isLoading.value = false;
}

onMounted(() => {
  if (auth.user?.jwt) {
    console.log('Authenticated user detected: Showing article content instantly.');
    isBlocked.value = false;
    isLoading.value = false;
    return;
  }

  document.addEventListener('zephr.browserDecisionsFinished', handleZephrDecision);
  if (window.zephrBrowser?.run) {
    console.log('Waiting for Zephr decision...');
    window.zephrBrowser.run({
      jwt: '',
      debug: true,
    });
  }
});
</script>

<style scoped>
/* Add regular classes if @apply isn't working */
.prose h1,
.prose h2,
.prose h3 {
  color: #065f46;
  font-weight: bold;
}

.prose p {
  line-height: 1.75;
  color: #374151;
}

.prose ul,
.prose ol {
  margin: 1rem 0;
  padding-left: 1.5rem;
  list-style-position: outside;
}

.prose li {
  margin-bottom: 0.5rem;
}

.prose blockquote {
  border-left: 4px solid #10b981;
  padding-left: 1rem;
  background-color: #ecfdf5;
  font-style: italic;
  color: #1f2937;
}

.prose strong {
  color: #065f46;
}

.prose em {
  color: #047857;
  font-style: italic;
}
</style>

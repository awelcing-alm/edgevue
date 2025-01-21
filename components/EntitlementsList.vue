<template>
    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-2xl font-bold text-emerald-900 mb-4">Your Subscriptions</h2>
      
      <div v-if="loading" class="text-gray-500 animate-pulse">
        Loading your subscriptions...
      </div>
      
      <div v-else-if="!isAuthenticated" class="text-center py-4">
        <p class="text-gray-600 mb-4">Sign in to view your subscriptions</p>
        <NuxtLink 
          to="/auth" 
          class="inline-block bg-geckoOrange text-white px-6 py-2 rounded-lg hover:bg-orange-500 transition"
        >
          Sign In
        </NuxtLink>
      </div>
  
      <div v-else-if="entitlements.length === 0" class="text-center py-4">
        <p class="text-gray-600">You don't have any active subscriptions.</p>
      </div>
  
      <ul v-else class="space-y-4">
        <li 
          v-for="entitlement in entitlements" 
          :key="entitlement.id"
          class="flex items-center justify-between p-4 bg-emerald-50 rounded-lg"
        >
          <div>
            <h3 class="font-semibold text-emerald-900">{{ entitlement.name }}</h3>
            <p class="text-sm text-emerald-600">{{ entitlement.description }}</p>
          </div>
          <span 
            class="inline-flex items-center px-3 py-1 rounded-full text-sm"
            :class="entitlement.active ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-800'"
          >
            {{ entitlement.active ? 'Active' : 'Inactive' }}
          </span>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useAuth } from '~/composables/useAuth';
  
  interface Entitlement {
    id: string;
    name: string;
    description: string;
    active: boolean;
  }
  
  const auth = useAuth();
  const loading = ref(true);
  const entitlements = ref<Entitlement[]>([]);
  const isAuthenticated = computed(() => !!auth.user?.jwt);
  
  function parseZephrEntitlements() {
    const zephrData = window.Zephr?.accessDetails;
    if (!zephrData) return [];
  
    const parsed: Entitlement[] = [];
    
    // Parse active products
    if (zephrData.activeProducts) {
      zephrData.activeProducts.forEach((product: string) => {
        parsed.push({
          id: product,
          name: formatProductName(product),
          description: 'Active subscription',
          active: true
        });
      });
    }
  
    // Parse trials
    if (zephrData.trials) {
      Object.entries(zephrData.trials).forEach(([trialId, trial]: [string, any]) => {
        parsed.push({
          id: trialId,
          name: formatProductName(trialId),
          description: `Trial access${trial.remaining ? ` (${trial.remaining} remaining)` : ''}`,
          active: true
        });
      });
    }
  
    return parsed;
  }
  
  function formatProductName(id: string): string {
    return id
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
  
  onMounted(() => {
    if (typeof window === 'undefined') return;
  
    const updateEntitlements = () => {
      entitlements.value = parseZephrEntitlements();
      loading.value = false;
    };
  
    // Listen for Zephr decisions
    document.addEventListener('zephr.browserDecisionsFinished', updateEntitlements);
  
    // Check if Zephr data is already available
    if (window.Zephr?.accessDetails) {
      updateEntitlements();
    } else if (window.zephrBrowser?.run) {
      window.zephrBrowser.run({
        jwt: auth.user?.jwt || '',
        debug: true
      });
    }
  });
  </script>
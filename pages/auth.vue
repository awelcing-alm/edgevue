<template>
  <div class="min-h-screen bg-emerald-50">
    <TopNav />

    <div class="flex flex-col items-center justify-center py-12 px-8">
      <div class="max-w-lg w-full bg-white shadow-lg rounded-lg p-8 space-y-6">
        <h1 class="text-2xl font-bold text-center text-emerald-900">🦎 Welcome Back!</h1>
        <p class="text-center text-gray-600">Sign in or register to access exclusive content!</p>

        <div id="zephr-form-placeholder" class="my-6 border-t border-gray-200 pt-4">
          <p v-if="loadingForm" class="text-center text-sm text-gray-500">Loading form...</p>
        </div>

        <p class="text-sm text-center text-gray-600">
          By joining, you agree to our cookie policy.
          <button
            class="underline text-emerald-600 hover:text-emerald-800 ml-1"
            @click.prevent="openCookieSettings"
          >
            Manage Preferences
          </button>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '~/composables/useAuth';
import TopNav from '~/components/TopNav.vue';

const router = useRouter();
const auth = useAuth();
const loadingForm = ref(true);

const openCookieSettings = () => {
  const component = document.querySelector('cookie-consent') as HTMLElement & { __vueParentComponent?: any };
  component?.__vueParentComponent?.ctx?.openManageModal();
};

onMounted(() => {
  document.addEventListener('zephr.formSuccess', () => {
    console.log('Form submission successful! Redirecting to homepage...');
    auth.login('User', 'user@example.com', 'your-jwt-token-here'); // Update user state after login
    router.push('/'); // Redirect to homepage
  });
});
</script>

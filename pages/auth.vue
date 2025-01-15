<template>
  <div class="min-h-screen bg-emerald-50">
    <!-- Top Navigation -->
    <TopNav />

    <div class="flex flex-col items-center justify-center py-12 px-8">
      <div class="max-w-lg w-full bg-white shadow-lg rounded-lg p-8 space-y-6">
        <h1 class="text-2xl font-bold text-center text-emerald-900">🦎 Welcome Back!</h1>
        <p class="text-center text-gray-600">Sign in or register to access exclusive content!</p>

        <!-- Zephr Form Placeholder -->
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
import { onMounted, ref, onUnmounted } from 'vue';
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

const formSuccessListener = () => {
  console.log('%c[Zephr] Form submission successful! Redirecting to homepage...', 'color: #10b981;');

  // Extract the JWT from Zephr after form success (simulating the real response)
  const jwtToken = 'real-user-jwt'; // Replace this with real JWT handling from Zephr if needed
  auth.login('User', 'user@example.com', jwtToken); // Update user state with JWT
  router.push('/'); // Redirect to homepage after successful login
};

onMounted(() => {
  if (typeof window === 'undefined') return;

  console.log('%c[Zephr] Mounting form...', 'color: #4ade80; font-weight: bold;');

  if (window.zephrBrowser?.run) {
    window.zephrBrowser.run({
      jwt: auth.user?.jwt || '', // Pass JWT if available
      debug: true,
    });

    document.addEventListener('zephr.formSuccess', formSuccessListener); // Handle form submission success

    document.addEventListener('zephr.formRendered', () => {
      console.log('%c[Zephr] Form rendered successfully.', 'color: #10b981;');
      loadingForm.value = false;
    });
  } else {
    console.warn('%c[Zephr] Zephr script not available.', 'color: #f87171;');
  }
});

onUnmounted(() => {
  document.removeEventListener('zephr.formSuccess', formSuccessListener);
});
</script>

<style scoped>
#zephr-form-placeholder {
  min-height: 150px;
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
</style>

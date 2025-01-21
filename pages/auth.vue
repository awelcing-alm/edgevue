<template>
  <NuxtLayout name="default">
    <div class="flex flex-col items-center justify-center py-12 px-8">
      <div class="max-w-lg w-full bg-white shadow-lg rounded-lg p-8 space-y-6">
        <h1 class="text-2xl font-bold text-center text-emerald-900">🦎 Welcome Back!</h1>
        <p class="text-center text-gray-600">Sign in or register to access exclusive content!</p>

        <!-- Zephr Form Placeholder -->
        <div id="zephr-form-placeholder" class="my-6 border-t border-gray-200 pt-4">
          <p v-if="loadingForm" class="text-center text-sm text-gray-500">Loading form...</p>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { onMounted, ref, onUnmounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '~/composables/useAuth';

const router = useRouter();
const auth = useAuth();
const loadingForm = ref(true);
let redirectAttempts = 0;
const maxRedirectAttempts = 3;
const redirectDelay = 500; // ms

// Function to check auth and redirect
function checkAuthAndRedirect() {
  if (redirectAttempts >= maxRedirectAttempts) return;
  
  const accessDetails = window.Zephr?.accessDetails;
  if (accessDetails?.authenticated) {
    console.log('%c[Auth] User authenticated, redirecting...', 'color: #10b981;');
    router.push('/');
  } else {
    redirectAttempts++;
    if (redirectAttempts < maxRedirectAttempts) {
      setTimeout(checkAuthAndRedirect, redirectDelay);
    }
  }
}

// Watch for auth state changes
watch(() => auth.user?.jwt, (newJwt) => {
  if (newJwt) {
    console.log('%c[Auth] JWT detected, initiating redirect...', 'color: #10b981;');
    checkAuthAndRedirect();
  }
});

const formSuccessListener = () => {
  console.log('%c[Auth] Form submission successful!', 'color: #10b981;');
  
  // Extract JWT and update auth state
  const jwtToken = document.cookie
    .split('; ')
    .find(row => row.startsWith('auth_token='))
    ?.split('=')[1];

  if (jwtToken) {
    auth.login('User', 'user@example.com', jwtToken);
    // Force redirect after short delay
    setTimeout(() => {
      if (window.location.pathname === '/auth') {
        console.log('%c[Auth] Forcing redirect to homepage...', 'color: #10b981;');
        window.location.href = '/';
      }
    }, 1000);
  }
};

// Additional check for existing authentication
const existingAuthCheck = () => {
  if (auth.user?.jwt || window.Zephr?.accessDetails?.authenticated) {
    console.log('%c[Auth] Existing authentication detected, redirecting...', 'color: #10b981;');
    router.push('/');
  }
};

onMounted(() => {
  if (typeof window === 'undefined') return;

  // Check for existing auth immediately
  existingAuthCheck();

  console.log('%c[Auth] Mounting form...', 'color: #4ade80; font-weight: bold;');

  if (window.zephrBrowser?.run) {
    window.zephrBrowser.run({
      jwt: auth.user?.jwt || '',
      debug: true,
    });

    document.addEventListener('zephr.formSuccess', formSuccessListener);
    document.addEventListener('zephr.formRendered', () => {
      console.log('%c[Auth] Form rendered successfully.', 'color: #10b981;');
      loadingForm.value = false;
    });
    document.addEventListener('zephr.browserDecisionsFinished', checkAuthAndRedirect);
  } else {
    console.warn('%c[Auth] Zephr script not available.', 'color: #f87171;');
  }
});

onUnmounted(() => {
  document.removeEventListener('zephr.formSuccess', formSuccessListener);
  document.removeEventListener('zephr.browserDecisionsFinished', checkAuthAndRedirect);
});
</script>

<style scoped>
#zephr-form-placeholder {
  min-height: 150px;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0%, 100% {
    background-color: rgba(0, 0, 0, 0.05);
  }
  50% {
    background-color: rgba(0, 0, 0, 0.1);
  }
}
</style>
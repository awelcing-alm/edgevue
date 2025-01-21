<template>
    <NuxtLayout name="default">
      <div class="container mx-auto px-4 py-12">
        <!-- Profile Header -->
        <div class="bg-emerald-800 text-white p-8 rounded-lg mb-8">
          <div v-if="auth.user" class="flex items-center space-x-4">
            <div class="bg-emerald-700 p-4 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <h1 class="text-3xl font-bold">Welcome, {{ auth.user.name }}</h1>
              <p class="text-emerald-200">{{ auth.user.email }}</p>
            </div>
          </div>
          <div v-else class="text-center">
            <h1 class="text-3xl font-bold mb-4">Profile</h1>
            <p class="text-emerald-200 mb-4">Please sign in to view your profile</p>
            <NuxtLink 
              to="/auth" 
              class="inline-block bg-geckoOrange text-white px-6 py-2 rounded-lg hover:bg-orange-500 transition"
            >
              Sign In
            </NuxtLink>
          </div>
        </div>
  
        <!-- Profile Content -->
        <div v-if="auth.user" class="grid gap-8 md:grid-cols-2">
          <!-- Entitlements Section -->
          <div class="md:col-span-2">
            <EntitlementsList />
          </div>
  
          <!-- Account Settings -->
          <div class="bg-white rounded-lg shadow-md p-6">
            <h2 class="text-2xl font-bold text-emerald-900 mb-4">Account Settings</h2>
            
            <!-- Cookie Preferences -->
            <div class="mb-6">
              <h3 class="font-semibold text-gray-800 mb-2">Cookie Preferences</h3>
              <button 
                @click="openCookieSettings"
                class="text-emerald-600 hover:text-emerald-700 underline"
              >
                Manage Cookie Settings
              </button>
            </div>
  
            <!-- Sign Out -->
            <div class="border-t pt-4">
              <button 
                @click="handleSignOut" 
                class="bg-red-100 text-red-600 px-4 py-2 rounded-lg hover:bg-red-200 transition"
              >
                Sign Out
              </button>
            </div>
          </div>
  
          <!-- Reading History -->
          <div class="bg-white rounded-lg shadow-md p-6">
            <h2 class="text-2xl font-bold text-emerald-900 mb-4">Reading History</h2>
            <p class="text-gray-600">
              Coming soon! Track your reading history and bookmarks.
            </p>
          </div>
        </div>
      </div>
  
      <!-- Cookie Management Modal -->
      <ManageCookies ref="cookieModal" />
    </NuxtLayout>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useAuth } from '~/composables/useAuth';
  import { useRouter } from 'vue-router';
  import type { ComponentPublicInstance } from 'vue';
  
  interface CookieModalInstance extends ComponentPublicInstance {
    openManageModal: () => void;
  }
  
  const auth = useAuth();
  const router = useRouter();
  const cookieModal = ref<CookieModalInstance | null>(null);
  
  // Redirect if not authenticated
  onMounted(() => {
    if (!auth.user?.jwt) {
      router.push('/auth');
    }
  });
  
  function openCookieSettings() {
    cookieModal.value?.openManageModal();
  }
  
  async function handleSignOut() {
    auth.logout();
    router.push('/');
  }
  </script>
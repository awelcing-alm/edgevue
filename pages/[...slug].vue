<script setup>
import { ref, onMounted, nextTick } from 'vue';
import { useRouter } from 'vue-router';

const isAuthenticated = ref(false);
const showModal = ref(false);
const router = useRouter();

// Function to handle registration modal
function openRegistration() {
  showModal.value = true;
}

function closeRegistration() {
  showModal.value = false;
}

// Function to check Zephr authentication
async function checkZephrAuth() {
  const zephrContent = document.querySelector('.zephr-content');

  if (zephrContent) {
    if (!window.zephrBrowser) {
      console.warn('Zephr library not loaded.');
      return;
    }

    await window.zephrBrowser.run({
      customData: { 'content-type': 'premium' },
      onSuccess: async () => {
        isAuthenticated.value = true; // User is authenticated
        console.log('User authenticated via Zephr.');
        await nextTick(); // Ensure the DOM updates before rendering
      },
      onFailure: () => {
        isAuthenticated.value = false; // User not authenticated
        console.warn('User not authenticated.');
        openRegistration(); // Open the modal
      },
    });
  }
}

onMounted(() => {
  // Ensure the page runs authentication check on load
  checkZephrAuth();
});
</script>

<template>
  <NuxtLayout name="default">
    <template #default>
      <article class="max-w-4xl mx-auto py-12 px-6">
        <ContentDoc v-slot="{ doc }">
          <template v-if="doc">
            <div class="bg-gradient-to-br from-emerald-800 to-emerald-900 text-emerald-50 p-8 rounded-lg mb-8">
              <h1 class="text-4xl font-bold mb-4">{{ doc.title }}</h1>
              <p class="text-xl text-emerald-100">{{ doc.description }}</p>
              <div v-if="doc.date" class="mt-4 text-emerald-200">
                {{ new Date(doc.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) }}
              </div>
            </div>

            <!-- Premium Content -->
            <ClientOnly>
              <div v-if="isAuthenticated" class="zephr-content bg-white shadow-lg rounded-lg p-8" data-zephr-content="premium" :key="isAuthenticated">
                <ContentRenderer :value="doc" />
              </div>
              <div v-else class="text-center text-red-600 py-12">
                <p>Please register to view this premium content.</p>
                <button class="register-button bg-emerald-700 text-white px-6 py-2 rounded-lg mt-4 hover:bg-emerald-800" @click="openRegistration">
                  Register / Log In
                </button>
              </div>
            </ClientOnly>

            <!-- Registration Modal -->
            <RegistrationModal v-if="showModal" @close="closeRegistration" />
          </template>
        </ContentDoc>
      </article>
    </template>
  </NuxtLayout>
</template>

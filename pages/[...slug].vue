<template>
  <NuxtLayout name="default">
    <template #default>
      <article class="max-w-4xl mx-auto py-12 px-6">
        <ContentDoc v-slot="{ doc }">
          <template v-if="doc">
            <!-- Hero Section -->
            <div class="bg-gradient-to-br from-emerald-800 to-emerald-900 text-emerald-50 p-8 rounded-lg mb-8">
              <div v-if="doc.icon" class="text-6xl mb-4">{{ doc.icon }}</div>
              <h1 class="text-4xl font-bold mb-4">{{ doc.title }}</h1>
              <p class="text-xl text-emerald-100">{{ doc.description }}</p>
              <div v-if="doc.date" class="mt-4 text-emerald-200">
                {{ new Date(doc.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) }}
              </div>
            </div>

            <!-- Premium Content -->
            <ClientOnly>
              <div v-if="isAuthenticated" class="zephr-content bg-white shadow-lg rounded-lg p-8" data-zephr-content="premium">
                <ContentRenderer :value="doc" class="prose lg:prose-xl prose-emerald" />
              </div>
              <div v-else class="text-center text-red-600 py-12">
                <p class="mb-4">Please register to view this premium content.</p>
                <button class="register-button bg-emerald-700 text-white px-6 py-2 rounded-lg mt-4 hover:bg-emerald-800" @click="openRegistration">
                  Register / Log In
                </button>
              </div>
            </ClientOnly>

            <!-- Related Articles -->
            <div class="mt-12">
              <h2 class="text-2xl font-bold text-emerald-900 mb-6">Related Articles</h2>
              <ContentList :path="doc._dir || '/'" :where="{ _path: { $ne: doc._path }, _extension: 'md' }" :limit="3">
                <template #default="{ list }">
                  <div class="grid gap-6 md:grid-cols-3">
                    <NuxtLink v-for="article in list" :key="article._path" :to="article._path" class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition group">
                      <div v-if="article.icon" class="text-4xl mb-3">{{ article.icon }}</div>
                      <h3 class="font-semibold text-lg text-emerald-900 group-hover:text-emerald-600 transition">{{ article.title }}</h3>
                      <p class="text-gray-600 mt-2 text-sm">{{ article.description }}</p>
                    </NuxtLink>
                  </div>
                </template>
                <template #not-found>
                  <p class="text-gray-600">No related articles found.</p>
                </template>
              </ContentList>
            </div>
          </template>

          <!-- Fallback for missing articles -->
          <template v-else>
            <div class="bg-white p-8 rounded-lg shadow-md">
              <p class="text-gray-600">Article not found.</p>
            </div>
          </template>
        </ContentDoc>

        <!-- Registration Modal -->
        <RegistrationModal v-if="showModal" @close="closeRegistration" />
      </article>
    </template>
  </NuxtLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import RegistrationModal from '~/components/RegistrationModal.vue'; // Registration modal

const isAuthenticated = ref(false); // Track authentication state
const showModal = ref(false); // Control registration modal visibility

function openRegistration() {
  showModal.value = true; // Open modal when the user clicks "Register / Log In"
}

function closeRegistration() {
  showModal.value = false; // Close modal
}

onMounted(() => {
  const zephrContent = document.querySelector('.zephr-content');

  if (zephrContent && window.zephrBrowser) {
    window.zephrBrowser.run({
      customData: { 'content-type': 'premium' },
      onSuccess: () => {
        isAuthenticated.value = true; // User is authenticated
      },
      onFailure: () => {
        isAuthenticated.value = false; // User is not authenticated
        openRegistration(); // Open the modal
      },
    });
  }
});
</script>

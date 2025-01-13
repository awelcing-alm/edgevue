<script setup>
import { ref, onMounted, watchEffect } from 'vue';

const isAuthenticated = ref(false);
const showModal = ref(false);

onMounted(() => {
  const zephrContent = document.querySelector('.zephr-content');
  if (zephrContent) {
    zephrBrowser.run({
      customData: { "content-type": "premium" },
      onSuccess: () => {
        isAuthenticated.value = true; // User is authenticated
        window.gtag('event', 'view_premium_content', {
          content_type: zephrContent.getAttribute('data-zephr-content'),
          event_label: 'Protected Article',
        });
      },
      onFailure: () => {
        isAuthenticated.value = false; // Open the registration modal
        const modalButton = document.querySelector('.register-button');
        if (modalButton) modalButton.click(); // Trigger modal from layout
      },
    });
  }
});
</script>

<template>
  <article class="max-w-4xl mx-auto">
    <ContentDoc v-slot="{ doc }">
      <template v-if="doc">
        <div class="bg-gradient-to-br from-emerald-800 to-emerald-900 text-emerald-50 p-8 rounded-lg mb-8">
          <h1 class="text-4xl font-bold mb-4">{{ doc.title }}</h1>
          <p class="text-xl text-emerald-100">{{ doc.description }}</p>
          <div v-if="doc.date" class="mt-4 text-emerald-200">
            {{ new Date(doc.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) }}
          </div>
        </div>

        <ClientOnly>
          <div v-if="isAuthenticated" class="zephr-content bg-white shadow-lg rounded-lg p-8" data-zephr-content="premium">
            <ContentRenderer :value="doc" />
          </div>
          <div v-else class="text-center text-red-600 py-12">
            <p>Please register to view this premium content.</p>
            <button class="register-button bg-emerald-700 text-white px-6 py-2 rounded-lg mt-4 hover:bg-emerald-800" @click="$emit('openRegistration')">
              Register / Log In
            </button>
          </div>
        </ClientOnly>
      </template>
    </ContentDoc>
  </article>
</template>

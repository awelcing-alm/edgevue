<template>
  <NuxtLayout name="default">
    <template #default>
      <article class="max-w-4xl mx-auto py-12 px-6">
        <ContentDoc v-slot="{ doc }">
          <template v-if="doc">
            <!-- Hero Section -->
            <ArticleHero 
              :title="doc.title"
              :description="doc.description"
              :date="doc.date"
            />

            <!-- Article Content -->
            <ArticleContent :doc="doc" />

            <!-- Related Articles -->
            <RelatedArticles 
              :current-path="doc._dir || '/'"
              :exclude-path="doc._path"
            />
          </template>
          <template v-else>
            <div class="bg-white p-8 rounded-lg shadow-md">
              <p class="text-gray-600">Article not found.</p>
            </div>
          </template>
        </ContentDoc>
      </article>
    </template>
  </NuxtLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const isAuthenticated = ref(false);

onMounted(() => {
  const zephrContent = document.querySelector('.zephr-content');
  if (zephrContent && window.zephrBrowser) {
    window.zephrBrowser.run({
      customData: { 'content-type': 'premium' },
      onSuccess: () => {
        isAuthenticated.value = true;
      },
      onFailure: () => {
        isAuthenticated.value = false;
        console.warn('User not authenticated. Please register to view.');
      },
    });
  }
});
</script>
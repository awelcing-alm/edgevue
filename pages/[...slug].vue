<template>
  <NuxtLayout name="default">
    <template #default>
      <article class="max-w-4xl mx-auto py-12 px-6">
        <ContentDoc v-slot="{ doc }">
          <template v-if="doc">
            <!-- Hero Section -->
            <div class="bg-gradient-to-br from-emerald-800 to-emerald-900 text-emerald-50 p-8 rounded-lg mb-8">
              <h1 class="text-4xl font-bold mb-4">{{ doc.title }}</h1>
              <p class="text-xl text-emerald-100">{{ doc.description }}</p>
              <div v-if="doc.date" class="mt-4 text-emerald-200">
                {{ new Date(doc.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) }}
              </div>
            </div>

            <!-- Article Content -->
            <ClientOnly>
              <ContentRenderer v-slot:default="{ value }" :value="doc">
                <div
                  class="zephr-content bg-white shadow-lg rounded-lg p-8 prose lg:prose-xl prose-emerald prose-headings:text-emerald-900 prose-a:text-emerald-600 prose-strong:text-emerald-700 prose-ul:list-disc prose-ol:list-decimal prose-li:marker:text-emerald-500 prose-blockquote:border-l-emerald-500 prose-blockquote:bg-emerald-50 prose-blockquote:py-2 prose-blockquote:px-4 prose-img:rounded-lg prose-img:shadow-md"
                >
                  <p>{{ value }}</p>
                </div>
              </ContentRenderer>
            </ClientOnly>

            <!-- Related Articles -->
            <div class="mt-12">
              <h2 class="text-2xl font-bold text-emerald-900 mb-6">Related Articles</h2>
              <ContentList :path="doc._dir || '/'" :where="{ _path: { $ne: doc._path }, _extension: 'md' }" :limit="3">
                <template #default="{ list }">
                  <div v-if="list.length" class="grid gap-6 md:grid-cols-3">
                    <NuxtLink
                      v-for="article in list"
                      :key="article._path"
                      :to="article._path"
                      class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition group"
                    >
                      <h3 class="font-semibold text-lg text-emerald-900 group-hover:text-emerald-600 transition">
                        {{ article.title }}
                      </h3>
                      <p class="text-gray-600 mt-2">{{ article.description }}</p>
                    </NuxtLink>
                  </div>
                  <p v-else class="text-gray-500 text-center">No related articles found.</p>
                </template>
              </ContentList>
            </div>
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
        isAuthenticated.value = false; // Show register modal
        console.warn('User not authenticated. Please register to view.');
      },
    });
  }
});
</script>

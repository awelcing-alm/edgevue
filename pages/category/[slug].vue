<template>
  <NuxtLayout name="default">
    <template #default>
      <div class="max-w-6xl mx-auto py-12 px-6">
        <div class="bg-gradient-to-r from-emerald-800 to-emerald-900 text-emerald-50 p-8 rounded-lg mb-8">
          <h1 class="text-4xl font-bold mb-4 capitalize">{{ categoryName }} Articles</h1>
          <p class="text-xl text-emerald-100">Explore the latest articles about {{ categoryName }}.</p>
        </div>

        <!-- Article List -->
        <div class="mt-8">
          <ContentList :path="'/category/' + categorySlug" :where="{ _extension: 'md' }">
            <template #default="{ list }">
              <div v-if="list.length" class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <NuxtLink
                  v-for="article in list"
                  :key="article._path"
                  :to="article._path"
                  class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition group"
                >
                  <h3 class="text-xl font-semibold text-emerald-900 group-hover:text-emerald-600">
                    {{ article.title }}
                  </h3>
                  <p class="text-gray-600 mt-2">{{ article.description }}</p>
                </NuxtLink>
              </div>
              <p v-else class="text-center text-gray-500">No articles found for this category.</p>
            </template>
            <template #empty>
              <p class="text-center text-gray-500">No articles available in this category.</p>
            </template>
          </ContentList>
        </div>
      </div>
    </template>
  </NuxtLayout>
</template>

<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
const categorySlug = route.params.slug; // e.g., "lizards"
const categoryName = categorySlug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()); // Capitalize
</script>

<style scoped>
h1 {
  text-transform: uppercase;
}
</style>

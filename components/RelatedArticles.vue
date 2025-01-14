<template>
    <div class="mt-12">
      <h2 class="text-2xl font-bold text-emerald-900 mb-6">Related Articles</h2>
      <ContentList
        :path="'/category/' + categoryPath"
        :where="{ _path: { $ne: currentPath }, _extension: 'md' }"
        :limit="3"
      >
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
  
  <script setup>
  defineProps({
    currentPath: String,
    categoryPath: String,
  });
  </script>
  
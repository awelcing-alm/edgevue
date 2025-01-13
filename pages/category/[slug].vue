<template>
    <NuxtLayout name="default">
      <template #default>
        <div class="min-h-screen bg-emerald-50">
          <div class="container mx-auto px-4 py-12">
            <div class="text-center mb-8">
              <h1 class="text-4xl font-bold text-emerald-900">
                {{ categoryTitle }} Collection
              </h1>
              <p class="text-lg text-emerald-700">
                Explore the latest articles about {{ categoryTitle.toLowerCase() }}.
              </p>
            </div>
  
            <div v-if="articles.length" class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <article
                v-for="article in articles"
                :key="article._path"
                class="bg-emerald-700 p-6 rounded-lg hover:bg-emerald-600 transition"
              >
                <NuxtLink :to="article._path">
                  <h3 class="text-xl font-semibold mb-2 text-white">{{ article.title }}</h3>
                  <p class="text-emerald-200">{{ article.description }}</p>
                </NuxtLink>
              </article>
            </div>
  
            <div v-else class="text-center text-gray-500 mt-12">
              <p>No articles found for this category.</p>
            </div>
          </div>
        </div>
      </template>
    </NuxtLayout>
  </template>
  
  <script setup>
  import { useRoute } from 'vue-router';
  import { useAsyncData } from '#app';
  
  const route = useRoute();
  const categorySlug = route.params.slug;
  
  const categoryMapping = {
    lizards: 'Lizards',
    snakes: 'Snakes',
    salamanders: 'Salamanders',
  };
  
  const categoryTitle = categoryMapping[categorySlug] || 'Articles';
  
  // Fetch articles based on the category slug
  const { data: articles } = await useAsyncData(
    `articles-${categorySlug}`,
    () => queryContent(categorySlug).fetch()
  );
  </script>
  
  <style scoped>
  h1 {
    margin-bottom: 16px;
  }
  
  article {
    transition: transform 0.2s ease-in-out;
  }
  
  article:hover {
    transform: scale(1.05);
  }
  </style>
  
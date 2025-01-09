<template>
    <div class="category-page">
      <TopNav />
      <h1>{{ categoryTitle }}</h1>
      <div v-if="articles.length">
        <h2>Articles in {{ categoryTitle }}</h2>
        <ul>
          <li v-for="article in articles" :key="article._path">
            <NuxtLink :to="`/articles${article._path}`">{{ article.title }}</NuxtLink>
            <p>{{ article.description }}</p>
          </li>
        </ul>
      </div>
      <div v-else>
        <p>No articles found in this category.</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useRoute } from 'vue-router';
  
  // Get the current category from the URL
  const route = useRoute();
  const category = route.params.category;
  
  // Use the globally available `useContent` composable
  const { data: articles } = await useAsyncData('articles', () => useContent(`/${category}`).fetch());
  
  // Capitalize the category name for display
  const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1);
  </script>
  
  <style scoped>
  .category-page {
    padding: 16px;
  }
  
  h1 {
    text-align: center;
    margin-bottom: 20px;
  }
  
  ul {
    list-style: none;
    padding: 0;
  }
  
  li {
    margin-bottom: 20px;
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
  }
  </style>
  
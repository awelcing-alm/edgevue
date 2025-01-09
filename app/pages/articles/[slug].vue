<template>
  <div>
    <h1>{{ article.title }}</h1>
    <div v-html="article.body" />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';

// Get the article slug from the route
const route = useRoute();
const slug = route.params.slug;

// Fetch the article using the `useContent` composable
const { data: article } = await useContent(`/articles/${slug}`).fetch();
</script>

<style scoped>
h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
}
</style>
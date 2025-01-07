<template>
  <div>
    <TopNav />
    <h1>Lizards Articles</h1>
    <div v-for="article in articles" :key="article._path" class="article-card">
      <h2>{{ article.title }}</h2>
      <p>{{ article.description }}</p>
      <NuxtLink :to="`/articles${article._path}`">Read More</NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { useContent } from '@nuxt/content'

const { data: articles } = await useContent('/lizards').fetch()
</script>

<style scoped>
.article-card {
  padding: 16px;
  border: 1px solid #ddd;
  margin-bottom: 10px;
  border-radius: 4px;
}
</style>

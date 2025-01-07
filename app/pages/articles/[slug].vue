<template>
  <div>
    <TopNav />
    <article>
      <h1>{{ article.title }}</h1>
      <p class="text-sm text-gray-500">{{ article.date }} - {{ article.author }}</p>
      <div v-html="article.body" />
    </article>
  </div>
</template>

<script setup>
import { useContent } from '@nuxt/content'
import { useRoute } from 'vue-router'

const route = useRoute()
const { data: article } = await useContent(`/lizards/${route.params.slug}`).fetch()
</script>

<style scoped>
article {
  padding: 16px;
  line-height: 1.6;
}
</style>

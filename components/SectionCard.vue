<template>
    <div :class="`${bgColor} text-white p-8 rounded-lg`">
      <div class="flex items-center gap-4 mb-4">
        <span class="text-4xl">{{ icon }}</span>
        <h2 class="text-2xl font-bold">{{ title }}</h2>
      </div>
      <ContentList :path="path" :where="where">
        <template #default="{ list }">
          <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div
              v-for="post in list"
              :key="post._path"
              :class="`${cardBgColor} p-6 rounded-lg ${hoverColor} transition`"
            >
              <NuxtLink :to="post._path">
                <h3 class="text-xl font-semibold mb-2 text-white">{{ post.title }}</h3>
                <p :class="`${descriptionColor}`">{{ post.description }}</p>
              </NuxtLink>
            </div>
          </div>
        </template>
        <template #empty>
          <p :class="`${descriptionColor}`">No articles found in this collection.</p>
        </template>
      </ContentList>
    </div>
  </template>
  
  <script setup>
  defineProps({
    title: String,
    icon: String,
    path: String,
    bgColor: String, // Background color of the section
    cardBgColor: String, // Background color of the cards
    hoverColor: String, // Hover color effect for the cards
    descriptionColor: String, // Color for the description text
    where: Object // Optional query condition
  });
  </script>
  
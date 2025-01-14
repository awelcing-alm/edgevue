<template>
  <NuxtLayout name="category">
    <template #default>
      <div class="bg-gradient-to-br from-emerald-800 to-emerald-900 text-white p-8 rounded-lg mb-8">
        <h1 class="text-4xl font-bold mb-4">{{ categoryTitle }}</h1>
        <p class="text-lg">{{ categoryDescription }}</p>
      </div>

      <!-- List of Articles in the Category -->
      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <ContentList :path="`/category/${slug}`" :limit="10" :sort="{ date: -1 }">
          <template #default="{ list }">
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
              <div class="text-sm text-gray-400 mt-2">
                {{ new Date(article.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                }) }}
              </div>
            </NuxtLink>
          </template>
          <template #empty>
            <p class="text-gray-500">No articles found in this category.</p>
          </template>
        </ContentList>
      </div>
    </template>
  </NuxtLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const slug = route.params.slug; // Get category slug from the route

// Default data for categories
const categories = {
  lizards: {
    title: 'Lizards',
    description: 'Lizards showcase remarkable adaptations, from gecko adhesion to chameleon camouflage. Studying their diverse behaviors and habitats provides key insights into evolutionary biology and ecological resilience.',
  },
  snakes: {
    title: 'Snakes',
    description: 'ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss. With specialized senses and limbless movement, snakes have become highly efficient predators across varied ecosystems.',
  },
  salamanders: {
    title: 'Salamanders',
    description: 'Salamanders, with their amphibious lifestyles, reveal critical aspects of vertebrate evolution. Their ability to regenerate limbs and thrive in sensitive habitats makes them important for ecological research and conservation.',
  },
};

// Set dynamic title and description
const categoryTitle = ref(categories[slug]?.title || 'Category');
const categoryDescription = ref(categories[slug]?.description || 'Explore the articles in this category.');

// Scroll to top when the page changes
onMounted(() => {
  window.scrollTo(0, 0);
});
</script>

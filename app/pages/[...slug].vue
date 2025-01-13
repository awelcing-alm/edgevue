<script setup>
import { onMounted, watchEffect } from 'vue';

onMounted(() => {
  const zephrContent = document.querySelector('.zephr-content');
  if (zephrContent) {
    // Send a custom GA event for premium content display
    window.gtag('event', 'view_premium_content', {
      content_type: zephrContent.getAttribute('data-zephr-content'),
      event_label: 'Protected Article',
    });
  }
});

// Watch for changes in the `doc` prop to log page metadata
watchEffect(() => {
  if (doc?.title) {
    window.gtag('event', 'page_view', {
      page_title: doc.title,
      page_path: doc._path,
      event_category: 'Article Views',
      content_description: doc.description || '',
      published_date: doc.date || '',
    });
  }
});
</script>

<template>
  <article class="max-w-4xl mx-auto">
    <ContentDoc v-slot="{ doc }">
      <template v-if="doc">
        <div class="bg-gradient-to-br from-emerald-800 to-emerald-900 text-emerald-50 p-8 rounded-lg mb-8">
          <h1 class="text-4xl font-bold mb-4">{{ doc.title }}</h1>
          <p class="text-xl text-emerald-100">{{ doc.description }}</p>
          <div v-if="doc.date" class="mt-4 text-emerald-200">
            {{ new Date(doc.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) }}
          </div>
        </div>

        <ClientOnly>
          <div class="zephr-content bg-white shadow-lg rounded-lg p-8" data-zephr-content="premium">
            <ContentRenderer :value="doc" />
          </div>
        </ClientOnly>

        <!-- Track click events for related articles -->
        <div class="mt-12">
          <h2 class="text-2xl font-bold text-emerald-900 mb-6">Related Articles</h2>
          <ContentList :path="doc._dir || '/'" :where="{ _path: { $ne: doc._path }, _extension: 'md' }" :limit="3">
            <template #default="{ list }">
              <div class="grid gap-6 md:grid-cols-3">
                <NuxtLink v-for="article in list" :key="article._path" :to="article._path" @click="trackRelatedClick(article)">
                  <div v-if="article.icon" class="text-4xl mb-3">{{ article.icon }}</div>
                  <h3 class="font-semibold text-lg text-emerald-900 group-hover:text-emerald-600 transition">
                    {{ article.title }}
                  </h3>
                </NuxtLink>
              </div>
            </template>
          </ContentList>
        </div>
      </template>
    </ContentDoc>
  </article>
</template>

<script>
function trackRelatedClick(article) {
  window.gtag('event', 'related_article_click', {
    event_category: 'Related Articles',
    event_label: article.title,
    destination_path: article._path,
  });
}
</script>

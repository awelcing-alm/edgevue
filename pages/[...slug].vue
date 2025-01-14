<template>
  <NuxtLayout name="default">
    <template #default>
      <!-- Article Hero Section (outside of <article> block) -->
      <div class="bg-gradient-to-br from-emerald-800 to-emerald-900 text-emerald-50 p-8 rounded-lg mb-8" v-if="doc">
        <h1 class="text-4xl font-bold mb-4">{{ doc?.title || "Article Title" }}</h1>
        <p class="text-xl text-emerald-100">{{ doc?.description || "Subtitle" }}</p>
        <div v-if="doc.date" class="mt-4 text-emerald-200">
          {{
            new Date(doc.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })
          }}
        </div>
      </div>

      <!-- Article Body -->
      <article class="max-w-4xl mx-auto py-12 px-6">
        <ContentDoc v-slot="{ doc }">
          <template v-if="doc">
            <ClientOnly>
              <div
                class="zephr-content bg-white shadow-lg rounded-lg p-8"
                data-zephr-content="premium"
              >
                <ContentRenderer
                  :value="doc"
                  class="prose lg:prose-xl prose-emerald prose-headings:text-emerald-900 prose-a:text-emerald-600 prose-strong:text-emerald-700 prose-ul:list-disc prose-ol:list-decimal prose-li:marker:text-emerald-500 prose-blockquote:border-l-emerald-500 prose-blockquote:bg-emerald-50 prose-blockquote:py-2 prose-blockquote:px-4 prose-img:rounded-lg prose-img:shadow-md"
                />
              </div>
            </ClientOnly>
          </template>
          <template v-else>
            <p class="text-center text-emerald-700 text-lg">Loading article content...</p>
          </template>
        </ContentDoc>
      </article>

      <!-- Related Articles Section -->
      <div class="mt-12" v-if="doc">
        <h2 class="text-2xl font-bold text-emerald-900 mb-6">Related Articles</h2>
        <ContentList :path="doc._dir || '/'" :where="{ _path: { $ne: doc._path }, _extension: 'md' }" :limit="3">
          <template #default="{ list }">
            <div class="grid gap-6 md:grid-cols-3">
              <NuxtLink
                v-for="article in list"
                :key="article._path"
                :to="article._path"
                class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition group"
              >
                <h3 class="font-semibold text-lg text-emerald-900 group-hover:text-emerald-600 transition">
                  {{ article.title }}
                </h3>
                <p class="text-gray-600 mt-2 text-sm">{{ article.description }}</p>
              </NuxtLink>
            </div>
          </template>
          <template #not-found>
            <p class="text-gray-600">No related articles found.</p>
          </template>
        </ContentList>
      </div>
    </template>
  </NuxtLayout>
</template>

<script setup>
import { ref } from 'vue';

const isAuthenticated = ref(false);

onMounted(() => {
  const zephrContent = document.querySelector('.zephr-content');
  if (zephrContent && window.zephrBrowser) {
    window.zephrBrowser.run({
      customData: { 'content-type': 'premium' },
      onSuccess: () => {
        isAuthenticated.value = true;
      },
      onFailure: () => {
        isAuthenticated.value = false;
      },
    });
  }
});
</script>

<style scoped>
.prose {
  max-width: none;
}

.prose h2,
.prose p,
.prose ul,
.prose ol {
  margin-bottom: 1rem;
}

.prose blockquote {
  margin: 1.5rem 0;
  border-left: 4px solid #065f46;
  background-color: #f0fdf4;
  padding: 1rem;
}

.nav-link {
  text-transform: uppercase;
  color: #edf2f7; /* Light text */
  font-weight: 500;
}

.nav-link:hover {
  color: #63b3ed;
}
</style>

<template>
  <NuxtLayout name="article">
    <template #default>
      <ContentDoc v-slot="{ doc }">
        <template v-if="doc">
          <!-- Article Hero -->
          <ArticleHero :title="doc.title" :description="doc.description" :date="doc.date" />

          <!-- Article Content -->
          <ArticleContent :doc="doc" />

          <!-- Related Articles -->
          <RelatedArticles :currentPath="doc._path" :categoryPath="doc._dir || ''" />
        </template>
        <template v-else>
          <div class="bg-white p-8 rounded-lg shadow-md">
            <p class="text-gray-600">Article not found.</p>
          </div>
        </template>
      </ContentDoc>
    </template>
  </NuxtLayout>
</template>

<template>
  <NuxtLayout name="article">
    <template #default>
      <div class="relative bg-gradient-to-b from-emerald-50 to-desertSand">
        <div class="container mx-auto py-16">
          <ContentDoc v-slot="{ doc }">
            <template v-if="doc">
              <ArticleHero :title="doc.title" :description="doc.description" :date="doc.date" />
              <ArticleContent :doc="doc" />
              <RelatedArticles :currentPath="doc._path" :categoryPath="doc._dir || ''" />
            </template>
            <template v-else>
              <div class="bg-white p-8 rounded-lg shadow-md">
                <p class="text-gray-600 text-center">Article not found.</p>
              </div>
            </template>
          </ContentDoc>
        </div>
      </div>
    </template>
  </NuxtLayout>
</template>

<style scoped>
.container {
  max-width: 900px;
}
</style>

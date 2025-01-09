<template>
  <div>
    <h1 class="text-4xl font-bold mb-8 text-emerald-900">Welcome to Newts' News</h1>
    
    <div class="grid gap-8 mb-12 lg:grid-cols-2">
      <!-- Lizard Collection -->
      <div class="bg-emerald-800 text-emerald-50 p-8 rounded-lg">
        <div class="flex items-center gap-4 mb-4">
          <span class="text-4xl">🦎</span>
          <h2 class="text-2xl font-bold">Lizard Collection</h2>
        </div>
        <ContentList path="/lizards" v-slot="{ list }">
          <div class="grid gap-4 sm:grid-cols-2">
            <article v-for="post in list" :key="post._path" class="bg-emerald-700 p-6 rounded-lg hover:bg-emerald-600 transition">
              <NuxtLink :to="post._path">
                <h3 class="text-xl font-semibold mb-2">{{ post.title }}</h3>
                <p class="text-emerald-100">{{ post.description }}</p>
              </NuxtLink>
            </article>
          </div>
          <template #not-found>
            <p class="text-emerald-100">No lizard articles found.</p>
          </template>
        </ContentList>
      </div>

      <!-- Snake Collection -->
      <div class="bg-amber-700 text-amber-50 p-8 rounded-lg">
        <div class="flex items-center gap-4 mb-4">
          <span class="text-4xl">🐍</span>
          <h2 class="text-2xl font-bold">Snake Collection</h2>
        </div>
        <ContentList path="/snakes" v-slot="{ list }">
          <div class="grid gap-4 sm:grid-cols-2">
            <article v-for="post in list" :key="post._path" class="bg-amber-600 p-6 rounded-lg hover:bg-amber-500 transition">
              <NuxtLink :to="post._path">
                <h3 class="text-xl font-semibold mb-2">{{ post.title }}</h3>
                <p class="text-amber-100">{{ post.description }}</p>
              </NuxtLink>
            </article>
          </div>
          <template #not-found>
            <p class="text-amber-100">No snake articles found.</p>
          </template>
        </ContentList>
      </div>

      <!-- Salamander Collection -->
      <div class="bg-blue-800 text-blue-50 p-8 rounded-lg">
        <div class="flex items-center gap-4 mb-4">
          <span class="text-4xl">🦕</span>
          <h2 class="text-2xl font-bold">Salamander Collection</h2>
        </div>
        <ContentList path="/salamanders" v-slot="{ list }">
          <div class="grid gap-4 sm:grid-cols-2">
            <article v-for="post in list" :key="post._path" class="bg-blue-700 p-6 rounded-lg hover:bg-blue-600 transition">
              <NuxtLink :to="post._path">
                <h3 class="text-xl font-semibold mb-2">{{ post.title }}</h3>
                <p class="text-blue-100">{{ post.description }}</p>
              </NuxtLink>
            </article>
          </div>
          <template #not-found>
            <p class="text-blue-100">No salamander articles found.</p>
          </template>
        </ContentList>
      </div>

      <!-- Latest Articles -->
      <div class="bg-gray-800 text-gray-50 p-8 rounded-lg">
        <div class="flex items-center gap-4 mb-4">
          <span class="text-4xl">📝</span>
          <h2 class="text-2xl font-bold">Latest Articles</h2>
        </div>
        <ContentList path="/" v-slot="{ list }" :where="{ _extension: 'md', _dir: { $eq: '' } }">
          <div class="grid gap-4 sm:grid-cols-2">
            <article v-for="post in list" :key="post._path" class="bg-gray-700 p-6 rounded-lg hover:bg-gray-600 transition">
              <NuxtLink :to="post._path">
                <h3 class="text-xl font-semibold mb-2">{{ post.title }}</h3>
                <p class="text-gray-100">{{ post.description }}</p>
              </NuxtLink>
            </article>
          </div>
          <template #not-found>
            <p class="text-gray-100">No articles found.</p>
          </template>
        </ContentList>
      </div>
    </div>
  </div>
</template>
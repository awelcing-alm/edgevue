<template>
  <nav class="flex gap-4 p-4 bg-neutral-900 text-white">
    <NuxtLink class="hover:underline" to="/">Home</NuxtLink>
    <NuxtLink class="hover:underline" to="/category/lizards">Lizards</NuxtLink>
    <NuxtLink class="hover:underline" to="/category/snakes">Snakes</NuxtLink>
    <NuxtLink class="hover:underline" to="/category/salamanders">Salamanders</NuxtLink>
  </nav>
</template>

<style scoped>
nav {
  font-size: 1.1rem;
}
</style>

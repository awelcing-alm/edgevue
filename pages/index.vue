<template>
  <NuxtLayout name="default">
    <template #default>
      <div class="min-h-screen bg-emerald-50">
        <h1 class="text-4xl font-bold mb-8 text-emerald-900 text-center">
          Welcome to Newts' News
        </h1>

        <div class="grid gap-8 mb-12">
          <!-- Lizard Collection -->
          <SectionCard
            title="Lizard Collection"
            icon="🦎"
            path="/lizards"
            bgColor="bg-emerald-800"
            cardBgColor="bg-emerald-700"
            hoverColor="hover:bg-emerald-600"
            descriptionColor="text-emerald-100"
          />

          <!-- Snake Collection -->
          <SectionCard
            title="Snake Collection"
            icon="🐍"
            path="/snakes"
            bgColor="bg-amber-700"
            cardBgColor="bg-amber-600"
            hoverColor="hover:bg-amber-500"
            descriptionColor="text-amber-100"
          />

          <!-- Salamander Collection -->
          <SectionCard
            title="Salamander Collection"
            icon="🐊"
            path="/salamanders"
            bgColor="bg-blue-800"
            cardBgColor="bg-blue-700"
            hoverColor="hover:bg-blue-600"
            descriptionColor="text-blue-100"
          />

        </div>
      </div>
    </template>
  </NuxtLayout>
</template>

<script setup>
import SectionCard from '~/components/SectionCard.vue'; // Import SectionCard component
</script>

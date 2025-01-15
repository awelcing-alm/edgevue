<template>
  <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div class="bg-white p-8 rounded-lg">
      <h3 class="text-2xl font-bold">Manage Your Cookies</h3>
      <button class="mt-4 px-6 py-2 bg-geckoOrange text-white rounded-lg" @click="close">
        Close
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps(['showModal']);
const emit = defineEmits(['close']);
function close() {
  emit('close');
}
</script>

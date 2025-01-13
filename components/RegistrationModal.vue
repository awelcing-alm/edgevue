<template>
  <div class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <h3 class="text-2xl font-bold mb-4">Register or Sign In</h3>
      <p class="mb-4">
        Welcome! Please register to access premium content and get the latest updates.
      </p>
      <!-- Placeholder Zephr Form Loader -->
      <div class="zephr-placeholder">
        <p class="text-center">Loading form...</p>
      </div>
      <button
        class="bg-emerald-600 text-white px-4 py-2 mt-4 rounded hover:bg-emerald-500"
        @click="simulateZephrForm"
      >
        Open Zephr Form
      </button>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['close']);

// Close modal function
function closeModal() {
  emit('close');
}

// Simulate Zephr form load (replace this logic with the actual Zephr form initialization)
function simulateZephrForm() {
  console.log('Zephr form opened!');
  alert('Zephr form would load here.');
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.modal-content {
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.zephr-placeholder {
  border: 2px dashed #d1d5db;
  padding: 2rem;
  border-radius: 8px;
}
</style>

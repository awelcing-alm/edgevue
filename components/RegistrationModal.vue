<template>
  <div
    v-if="show"
    id="registration-modal"
    class="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50"
  >
    <div class="bg-white rounded-lg p-6 max-w-lg w-full relative shadow-lg">
      <button
        class="absolute top-4 right-4 text-gray-500 hover:text-gray-800 focus:outline-none"
        @click="close"
        aria-label="Close"
      >
        ✖
      </button>
      <h2 class="text-2xl font-bold text-gray-900 mb-4">Register / Sign In</h2>
      <p class="text-gray-700 mb-6">
        Please register to access exclusive articles.
      </p>
      <div id="zephr-form-placeholder" class="zephr-placeholder">
        <!-- This div will be replaced by the Zephr registration form -->
      </div>
      <p class="text-sm mt-4 text-center text-gray-600">
        By registering, you agree to our terms and privacy policy.
      </p>
    </div>
  </div>
</template>

<script setup>
// Props for controlling modal visibility
defineProps({
  show: { type: Boolean, required: true },
});

// Emit event to close the modal
const emit = defineEmits(['close']);

const close = () => {
  emit('close'); // Emit 'close' event to parent to close the modal
};
</script>

<style scoped>
#registration-modal {
  animation: fadeIn 0.3s ease-in-out;
}

#zephr-form-placeholder {
  min-height: 200px;
  border: 1px dashed #ccc;
  background-color: #f9f9f9;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>

<template>
    <div class="register-container">
      <!-- Hero Section with Header and Navigation -->
      <header class="hero-header">
        <TopNav />
        <h1 class="hero-title">Join the Scaly Side! 🦎</h1>
        <p class="hero-subtitle">Become part of the ultimate lizard-lover’s community.</p>
      </header>
  
      <!-- Form Container for Zephr Form -->
      <div class="form-wrapper">
        <div id="zephr-register-form" class="form-placeholder">
          <p class="text-gray-500 italic">Loading personalized registration form...</p>
        </div>
      </div>
  
      <!-- Custom Cookie Management Banner (Optional Placeholder) -->
      <div v-if="showCookieBanner" class="cookie-banner">
        <p>We use cookies to personalize your experience and track outcomes.</p>
        <button @click="acceptCookies" class="cookie-button">Got it!</button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useCookie } from '#app';
  import { ref } from 'vue';
  
  const cookieConsent = useCookie('cookieConsent', { default: () => 'false' });
  const showCookieBanner = ref(cookieConsent.value !== 'true');
  
  function acceptCookies() {
    cookieConsent.value = 'true';
    showCookieBanner.value = false;
    console.log('User accepted cookies');
  }
  </script>
  
  <style module>
  .registerContainer {
    min-height: 100vh;
    background: linear-gradient(to bottom, #ecfdf5, #f4e4c1);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding-top: 3rem;
  }
  
  .heroHeader {
    text-align: center;
    margin-bottom: 2rem;
  }
  
  .heroTitle {
    font-size: 2.5rem;
    font-weight: 900;
    color: #3b7973;
  }
  
  .heroSubtitle {
    font-size: 1.25rem;
    color: #5a5a5a;
  }
  
  .formWrapper {
    max-width: 600px;
    width: 100%;
    margin: 0 auto;
    background: white;
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    animation: fadeInUp 0.8s ease-out;
  }
  
  .formPlaceholder {
    min-height: 300px; /* Enough space for Zephr's injected form */
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px dashed #d1d5db;
  }
  
  .cookieBanner {
    margin-top: 2rem;
    background-color: #fefcbf;
    padding: 1rem 2rem;
    border-radius: 8px;
    text-align: center;
    font-size: 1rem;
    display: flex;
    justify-content: space-between;
  }
  
  .cookieButton {
    background-color: #fbbf24;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    font-weight: bold;
    cursor: pointer;
  }
  
  @keyframes fadeInUp {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
  </style>
  
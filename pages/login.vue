<template>
    <div class="login-container">
      <!-- Navigation and Welcome -->
      <header class="hero-header">
        <TopNav slim />
        <h1 class="hero-title">Welcome Back, Lizard Fan! 🦎</h1>
        <p class="hero-subtitle">Log in to continue your reptile adventures.</p>
      </header>
  
      <!-- Zephr Login Form Injection -->
      <div class="form-wrapper">
        <div id="zephr-login-form" class="form-placeholder">
          <p class="text-gray-500 italic">Loading your personalized login form...</p>
        </div>
      </div>
  
      <!-- Cookie Banner -->
      <div v-if="showCookieBanner" class="cookie-banner">
        <p>We use cookies to enhance your experience.</p>
        <button @click="acceptCookies" class="cookie-button">Understood!</button>
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
  }
  </script>
  
  <style module>
  .loginContainer {
    min-height: 100vh;
    background: linear-gradient(to bottom, #f5f7fa, #ffffff);
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
    min-height: 300px;
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
    background-color: #34d399;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    font-weight: bold;
    cursor: pointer;
  }
  </style>
  
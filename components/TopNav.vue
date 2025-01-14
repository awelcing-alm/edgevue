<template>
  <nav class="nav-container">
    <div class="nav-content">
      <!-- Logo Section -->
      <div class="logo">
        <NuxtLink to="/" class="text-2xl font-bold tracking-wider text-emerald-50">
          🦎 NEWTS' NEWS
        </NuxtLink>
      </div>

      <!-- Navigation Links -->
      <div class="nav-links">
        <NuxtLink class="nav-link" to="/category/lizards">LIZARDS</NuxtLink>
        <NuxtLink class="nav-link" to="/category/snakes">SNAKES</NuxtLink>
        <NuxtLink class="nav-link" to="/category/salamanders">SALAMANDERS</NuxtLink>
      </div>
    </div>
  </nav>
</template>



<style scoped>
/* Navigation Container */
.nav-container {
  background-color: #1a202c; /* Dark background */
  padding: 0.5rem 1.5rem;
  border-bottom: 2px solid #2d3748; /* Separation */
  position: sticky;
  top: 0;
  z-index: 50;
}

/* Navigation Content */
.nav-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

/* Logo Styling */
.logo a {
  font-size: 1.75rem;
  font-weight: bold;
  text-transform: uppercase;
  color: #edf2f7; /* Light text */
}

.logo a:hover {
  color: #63b3ed; /* Hover effect */
}

/* Navigation Links */
.nav-links {
  display: flex;
  gap: 20px;
}

.nav-link {
  color: #edf2f7;
  font-size: 1rem;
  text-transform: uppercase;
  font-weight: 500;
  transition: color 0.3s ease-in-out;
  text-decoration: none;
}

.nav-link:hover {
  color: #63b3ed; /* Blue hover effect */
}

.nav-link.register-button {
  font-weight: bold;
}

.nav-link.active {
  color: #90cdf4; /* Active link color */
  border-bottom: 2px solid #90cdf4;
}

/* Responsive Menu for Small Screens */
@media (max-width: 768px) {
  .nav-links {
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
  }

  .logo a {
    font-size: 1.5rem;
  }
}
</style>

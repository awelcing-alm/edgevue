export default defineNuxtRouteMiddleware((to) => {
    const auth = useAuth();
    
    // Skip middleware if we're already on the auth page to prevent redirect loops
    if (to.path === '/auth') {
      return;
    }
  
    // If user is not authenticated, redirect to auth page
    if (!auth.user?.jwt) {
      return navigateTo('/auth');
    }
  });
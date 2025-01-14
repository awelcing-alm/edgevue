export default defineNuxtRouteMiddleware((to) => {
    if (process.client && window.Zephr) {
      console.log(`Zephr running on ${to.fullPath}`);
      window.Zephr.run({
        customData: { route: to.fullPath },
      });
    }
  });
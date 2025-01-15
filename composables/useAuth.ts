import { defineStore } from 'pinia';

interface UserProfile {
  name: string;
  email: string;
}

interface AuthState {
  jwt: string | null;
  user: UserProfile | null;
  isAuthenticated: boolean;
}

export const useAuth = defineStore('auth', {
  state: (): AuthState => ({
    jwt: null,
    user: null,
    isAuthenticated: false,
  }),
  actions: {
    async login(email: string, password: string) {
      const { data } = await useFetch<{ token: string }>('/api/login', {
        method: 'POST',
        body: { email, password },
      });

      if (data?.value?.token) {
        this.jwt = data.value.token;
        this.isAuthenticated = true;
        document.cookie = `auth_token=${this.jwt}; path=/; secure`;
        await this.fetchUserProfile();
      }
    },

    async fetchUserProfile() {
      const { data } = await useFetch<UserProfile>('/api/profile', {
        headers: { Authorization: `Bearer ${this.jwt}` },
      });

      this.user = data?.value || null;
    },

    logout() {
      this.jwt = null;
      this.user = null;
      this.isAuthenticated = false;
      document.cookie = 'auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
    },
  },
});

'use client';

// import axios from "axios"
import { useRouter } from 'next/router';
import { create } from 'zustand';

import axios from '../config/AxiosConfig';

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export const useUserStore = create(set => ({
  userTheme: 'light',
  data: [],
  isUserLoading: false,
  userError: null,
  isLoggedIn: false, // New state variable to track login status

  setUserTheme: (userTheme: string) => set({ userTheme }),

  checkLoggedIn: () => {
    // Check if a token is present in local storage

    const token = localStorage.getItem('accessTokenDevER');

    if (token) {
      const userObject = JSON.parse(token || '');

      set({ isLoggedIn: true }); // Update isLoggedIn based on token existence
      set({
        data: {
          name: userObject?.name,
          email: userObject?.email,
          provider: userObject?.provider,
          theme: userObject?.theme,
        },
      }); // Update isLoggedIn based on token existence
      return true;
    }
  },

  logIn: async (
    credentials: { email: string; password: string },
    router: any
  ) => {
    try {
      set({ isUserLoading: true });

      // Make the API call to authenticate the user
      const response = await axios.post(`${apiURL}/users/login`, credentials);
      const userObject = {
        name: response?.data.name,
        email: response?.data.email,
        provider: response?.data.provider,
        token: response?.data.token,
        theme: response?.data.theme,
      };

      // Assuming the API returns a token on successful login
      if (response.data && response.data.token) {
        // Save the token in local storage or use a state management library like Zustand to store the token.

        localStorage.setItem('accessTokenDevER', JSON.stringify(userObject));

        set({
          data: {
            name: response.data.name,
            email: response.data.email,
            provider: response.data.provider,
            theme: response?.data.theme,
          },
        });
        set({ isLoggedIn: true });
        // Navigate to the desired page after successful login
      }

      if (response.data) {
        router.push('/home');
      }

      set({ isUserLoading: false });
    } catch (error) {
      console.log('error', error);
      set({ userError: error });
    }
  },
  logProviderIn: async (
    credentials: { email: string; name: string },
    router: any
  ) => {
    try {
      set({ isUserLoading: true });

      // Make the API call to authenticate the user
      const response = await axios.post(
        `${apiURL}/users/loginprov`,
        credentials
      );
      const userObject = {
        name: response?.data.name,
        email: response?.data.email,
        provider: response?.data.provider,
        token: response?.data.token,
        theme: response?.data.theme,
      };

      // Assuming the API returns a token on successful login
      if (response.data && response.data.token) {
        // Save the token in local storage or use a state management library like Zustand to store the token.

        localStorage.setItem('accessTokenDevER', JSON.stringify(userObject));

        set({
          data: {
            name: response.data.name,
            email: response.data.email,
            provider: response?.data.provider,
            theme: response?.data.theme,
          },
        });
        set({ isLoggedIn: true });
        // Navigate to the desired page after successful login
        router.push('/home');
      }

      set({ isUserLoading: false });
    } catch (error) {
      console.log('error', error);
      set({ userError: error });
    }
  },

  createUser: async (user: any, router: any) => {
    const data = [];

    // Get the router instance

    try {
      set({ isUserLoading: true });
      const response = await axios.post(`${apiURL}/users`, user);

      if (response.data) {
        data.push(response.data);
        set((state: { data: any }) => ({
          isUserLoading: false,
          data: [...state.data, response],
        }));

        // Use router.push to navigate to the desired page
        // router.push('/sendVerification');
      }
    } catch (error) {
      console.log('error', error);
      set({ userError: error });
    }
  },
  createProviderUser: async (user: any, router: any) => {
    const data = [];

    // Get the router instance

    try {
      set({ isUserLoading: true });
      const response = await axios.post(`${apiURL}/users/provreg`, user);

      if (response.data) {
        data.push(response.data);
        set((state: { data: any }) => ({
          isUserLoading: false,
          data: [...state.data, response],
        }));

        // Use router.push to navigate to the desired page
        router.push('/sendVerification');
      }
    } catch (error) {
      console.log('error---------', error);
      set({ userError: error });
    }
  },
  logout: async () => {
    // Clear the token from local storage and set isLoggedIn to false
    localStorage.removeItem('accessTokenDevER');
    set({ isLoggedIn: false });
    set({ data: [] });

    // Redirect the user to the login page after logout
  },
  updateTheme: async (update: {
    email: string;
    provider: boolean;
    themeName: string;
  }) => {
    try {
      const updateUserTheme = await axios.put(
        `${apiURL}/users/update-theme`,
        update
      );

      if (updateUserTheme.status === 200) {
        const userObject = {
          name: updateUserTheme?.data.name,
          email: updateUserTheme?.data.email,
          provider: updateUserTheme?.data.provider,
          // token: response?.data.token,
          theme: updateUserTheme?.data.theme,
        };
        localStorage.setItem('accessTokenDevER', JSON.stringify(userObject));
        set({
          data: {
            email: updateUserTheme?.data?.email,
            provider: updateUserTheme?.data?.provider,
            theme: updateUserTheme?.data.theme,
          },
        });
      }
    } catch (err) {}
  },
}));

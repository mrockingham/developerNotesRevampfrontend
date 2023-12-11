'use client';

// import axios from "axios"
import { useRouter } from 'next/router';
import { useUserStore } from '@/stores/useUserStore';
import { create } from 'zustand';

import axios from '../config/AxiosConfig';

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export const useCodeBlockStore = create(set => ({
  codeBlockData: [],
  codeBlocksCreator: [],
  codeBlocksCategory: [],
  codeBlocksUserCategories: [],
  isCodeBlockLoading: false,
  error: null,
  message: null,

  getCodeBlockById: async (id: string, category: string, creator: string) => {
    const codeblockDetails = {
      id,
      category,
      creator,
    };
    const tokenString = localStorage.getItem('accessTokenDevER');

    if (!tokenString) {
      console.error('No token found in local storage');
      return;
    }

    const parsedToken = JSON.parse(tokenString)?.token;

    if (!parsedToken) {
      console.error('Token parsing failed or token is missing');
      return;
    }
    try {
      const getCodeBlock = await axios.post(
        `${apiURL}/codeblock/category/codeblock`,
        codeblockDetails,
        {
          headers: {
            Authorization: parsedToken,
          },
        }
      );

      if (getCodeBlock) {
        set({
          codeBlockData: { codeBlock: getCodeBlock?.data },
        });
      }
    } catch (err) {
      console.error('Error in getCodeBlockById:', err);
      set({ codeBlock: err });
    }
  },

  getCodeBlockByCreator: async (creator: string) => {
    try {
      const tokenString = localStorage.getItem('accessTokenDevER');

      if (!tokenString) {
        console.error('No token found in local storage');
        return;
      }

      const parsedToken = JSON.parse(tokenString)?.token;

      if (!parsedToken) {
        console.error('Token parsing failed or token is missing');
        return;
      }
      const getCodeBlock = await axios.post(
        `${apiURL}/codeblock/creator`,
        { creator },
        {
          headers: {
            Authorization: parsedToken,
          },
        }
      );

      if (getCodeBlock) {
        set({
          codeBlocksCreator: { codeBlock: getCodeBlock.data },
        });
      }
    } catch (err) {
      console.error('Error in getCodeBlockByCreator:', err);
      set({ codeBlock: err });
    }
  },
  getCodeBlockByCategory: async (creator: string) => {
    try {
      const tokenString = localStorage.getItem('accessTokenDevER');

      if (!tokenString) {
        console.error('No token found in local storage');
        return;
      }

      const parsedToken = JSON.parse(tokenString)?.token;

      if (!parsedToken) {
        console.error('Token parsing failed or token is missing');
        return;
      }

      const getCodeBlocksByCategory = await axios.post(
        `${apiURL}/codeblock/category`,
        { creator },
        {
          headers: {
            Authorization: parsedToken,
          },
        }
      );

      if (getCodeBlocksByCategory) {
        set({
          codeBlocksCategory: { codeBlock: getCodeBlocksByCategory.data },
        });
      }
    } catch (err) {
      console.error('Error in getCodeBlockByCategory:', err);
      set({ codeBlocksCategory: err });
    }
  },
  getUserCodeBlockCategories: async (creator: string, category: string) => {
    const codeblockDetails = {
      category,
      creator,
    };

    const tokenString = localStorage.getItem('accessTokenDevER');

    if (!tokenString) {
      console.error('No token found in local storage');
      return;
    }

    const parsedToken = JSON.parse(tokenString)?.token;

    if (!parsedToken) {
      console.error('Token parsing failed or token is missing');
      return;
    }
    try {
      const getCodeBlocksByUserCategory = await axios.post(
        `${apiURL}/codeblock/category/all`,
        codeblockDetails,
        {
          headers: {
            Authorization: parsedToken,
          },
        }
      );

      if (getCodeBlocksByUserCategory) {
        set({
          codeBlocksUserCategories: {
            codeBlock: getCodeBlocksByUserCategory?.data,
          },
        });
      }
    } catch (err) {
      console.error('Error in getCodeBlockByCategory:', err);
      set({ codeBlocksUserCategories: err });
    }
  },

  createCodeBlock: async (codeBlock: any) => {
    try {
      const saveBlock = await axios.post(`${apiURL}/codeblock/`, codeBlock);
    } catch (err) {
      console.log(err);
      set({ codeBlock: err });
    }
  },
  deleteCodeBlock: async (id: string) => {
    try {
      const deleteBlock = await axios.delete(`${apiURL}/codeblock/${id}`);

      set({ message: deleteBlock });
    } catch (err) {
      set({ codeBlock: err });
    }
  },
}));

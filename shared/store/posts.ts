import { defineStore } from "pinia";
import { ref } from "vue";
import type { Post } from "../types";
import { usePaginationStore } from "./pagination";

export const usePostsStore = defineStore("posts", () => {
  const paginationStore = usePaginationStore();

  const allPosts = ref<Post[]>([]);

  const loading = ref(false);

  const fetchAllPosts = async () => {
    loading.value = true;
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts`);
    allPosts.value = await response.json();

    loading.value = false;
    paginationStore.sortAndPaginate();
  };

  const createPost = async (post: Omit<Post, "id">) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });
    const newPost = await response.json();
    allPosts.value.unshift(newPost);
    paginationStore.sortAndPaginate(); // Обновляем список постов
  };

  return {
    loading,
    fetchAllPosts,
    allPosts,
    createPost,
  };
});

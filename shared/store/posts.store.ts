import { defineStore } from "pinia";
import { ref } from "vue";
import type { Post, Sort } from "../types";

export const usePostsStore = defineStore("posts", () => {
  const allPosts = ref<Post[]>([]);
  const posts = ref<Post[]>([]);

  const currentPage = ref(1);
  const postsPerPage = 10;

  const loading = ref(false);
  const sortOrder = ref<Sort>("asc");
  const isLastPage = ref(false);

  const fetchAllPosts = async () => {
    loading.value = true;
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts`);
    allPosts.value = await response.json();

    loading.value = false;
    sortAndPaginate();
  };

  const sortAndPaginate = () => {
    let sortedPosts =
      sortOrder.value === "asc"
        ? allPosts.value.sort((a, b) => a.id - b.id)
        : allPosts.value.sort((a, b) => b.id - a.id);

    const start = (currentPage.value - 1) * postsPerPage;
    const end = start + postsPerPage;

    posts.value = sortedPosts.slice(start, end);

    // Проверка, последняя ли это страница
    isLastPage.value =
      currentPage.value * postsPerPage >= allPosts.value.length;
  };

  const toggleSortOrder = () => {
    sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
    sortAndPaginate();
  };

  const nextPage = () => {
    if (!isLastPage.value) {
      currentPage.value++;
      sortAndPaginate();
    }
  };

  const prevPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--;
      sortAndPaginate();
    }
  };

  const goToPage = (page: number) => {
    currentPage.value = page;
    sortAndPaginate();
  };

  return {
    posts,
    loading,
    currentPage,
    isLastPage,
    fetchAllPosts,
    allPosts,
    postsPerPage,
    nextPage,
    prevPage,
    toggleSortOrder,
    sortOrder,
    goToPage,
  };
});

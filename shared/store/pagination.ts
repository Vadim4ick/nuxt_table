import { defineStore } from "pinia";
import { ref } from "vue";
import type { Post, Sort } from "../types";
import { usePostsStore } from "./posts";

export const usePaginationStore = defineStore("pagination", () => {
  const postsStore = usePostsStore();

  const filtredPosts = ref<Post[]>([]);

  const currentPage = ref(1);
  const postsPerPage = 10;

  const sortOrder = ref<Sort>("asc");
  const isLastPage = ref(false);

  const sortAndPaginate = () => {
    let sortedPosts =
      sortOrder.value === "asc"
        ? postsStore.allPosts.sort((a, b) => a.id - b.id)
        : postsStore.allPosts.sort((a, b) => b.id - a.id);

    const start = (currentPage.value - 1) * postsPerPage;
    const end = start + postsPerPage;

    filtredPosts.value = sortedPosts.slice(start, end);

    // Проверка, последняя ли это страница
    isLastPage.value =
      currentPage.value * postsPerPage >= postsStore.allPosts.length;
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
    filtredPosts,
    currentPage,
    isLastPage,
    postsPerPage,
    nextPage,
    prevPage,
    toggleSortOrder,
    sortAndPaginate,
    sortOrder,
    goToPage,
  };
});

import { defineStore } from "pinia";
import { computed, ref } from "vue";
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

  const totalPages = computed(() => {
    return postsStore.allPosts.length
      ? Math.ceil(postsStore.allPosts.length / postsPerPage)
      : 1;
  });

  // Функция для вычисления диапазона отображаемых страниц
  const getPageRange = computed(() => {
    const total = totalPages.value;
    const current = currentPage;
    const range = 5; // Количество страниц для отображения

    let startPage = Math.max(1, current.value - 2);
    let endPage = Math.min(total, current.value + 2);

    // Корректировка диапазона если меньше 5 страниц
    if (endPage - startPage < range - 1) {
      if (startPage === 1) {
        endPage = Math.min(total, startPage + range - 1);
      } else {
        startPage = Math.max(1, endPage - range + 1);
      }
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  });

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
    getPageRange,
  };
});

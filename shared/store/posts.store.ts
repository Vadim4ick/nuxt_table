import { defineStore } from "pinia";
import { ref } from "vue";

export const usePostsStore = defineStore("posts", () => {
  const allPosts = ref([]);
  const posts = ref([]);
  const loading = ref(false);
  const currentPage = ref(1);
  const postsPerPage = 10;
  const sortOrder = ref("asc");
  const isLastPage = ref(false);

  const fetchAllPosts = async () => {
    loading.value = true;
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts`);
    allPosts.value = await response.json();
    loading.value = false;
    sortAndPaginate();
  };

  const sortAndPaginate = () => {
    // Сортировка всех постов
    let sortedPosts =
      sortOrder.value === "asc"
        ? allPosts.value.sort((a, b) => a.id - b.id)
        : allPosts.value.sort((a, b) => b.id - a.id);

    // Применение пагинации
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

  return {
    posts,
    loading,
    currentPage,
    isLastPage,
    fetchAllPosts,
    nextPage,
    prevPage,
    toggleSortOrder,
    sortOrder,
  };
});

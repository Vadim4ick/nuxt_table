<script setup lang="ts">
import { onMounted } from "vue";
import { usePostsStore } from "@/shared/store/posts";
import { useModalCreateStore } from "@/shared/store/modals";
import { usePaginationStore } from "@/shared/store/pagination";

const modalStore = useModalCreateStore();
const postsStore = usePostsStore();
const paginationStore = usePaginationStore();

const totalPages = computed(() => {
  return postsStore.allPosts?.length
    ? Math.ceil(postsStore.allPosts.length / paginationStore.postsPerPage)
    : 1;
});

// Функция для вычисления диапазона отображаемых страниц
const getPageRange = computed(() => {
  const total = totalPages.value;
  const current = paginationStore.currentPage;
  const range = 5; // Количество страниц для отображения

  let startPage = Math.max(1, current - 2);
  let endPage = Math.min(total, current + 2);

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

onMounted(async () => {
  await postsStore.fetchAllPosts();
});
</script>

<template>
  <div class="container mx-auto px-4 py-6">
    <button
      @click="modalStore.showModal = true"
      class="bg-green-500 text-white ml-auto flex px-4 py-2 rounded mb-4"
    >
      Add New Post
    </button>

    <div class="bg-white shadow-md rounded-lg overflow-y-scroll">
      <table class="min-w-full table-fixed divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              style="width: 5%"
              @click="paginationStore.toggleSortOrder"
            >
              ID
              <span v-if="paginationStore.sortOrder === 'asc'">▲</span>
              <span v-else>▼</span>
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              style="width: 30%"
            >
              Title
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              style="width: 65%"
            >
              Body
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="post in paginationStore.filtredPosts" :key="post.id">
            <td class="px-6 py-4 text-sm font-medium text-gray-900">
              {{ post.id }}
            </td>
            <td class="px-6 py-4 text-sm text-gray-500">
              {{ post.title }}
            </td>
            <td class="px-6 py-4 text-sm text-gray-500 break-words">
              {{ post.body }}
            </td>
          </tr>
        </tbody>
      </table>
      <div class="mt-4 flex justify-between px-6 pb-6">
        <button
          @click="paginationStore.prevPage"
          :disabled="paginationStore.currentPage === 1"
          class="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Previous
        </button>

        <!-- Пагинация с номерами страниц -->
        <div class="flex space-x-2">
          <button
            v-for="page in getPageRange"
            :key="page"
            @click="paginationStore.goToPage(page)"
            :class="[
              'px-4 py-2 rounded',
              paginationStore.currentPage === page
                ? 'bg-blue-700 text-white'
                : 'bg-blue-500 text-white',
            ]"
          >
            {{ page }}
          </button>
        </div>

        <button
          @click="paginationStore.nextPage"
          :disabled="paginationStore.isLastPage"
          class="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
    <div v-if="postsStore.loading" class="mt-4 flex justify-center">
      <svg
        class="animate-spin h-5 w-5 text-blue-500"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 0116 0 8 8 0 01-16 0z"
        ></path>
      </svg>
    </div>
  </div>
</template>

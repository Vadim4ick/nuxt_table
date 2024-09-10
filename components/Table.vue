<script setup lang="ts">
import { ref, onMounted } from "vue";

const posts = ref([]);
const loading = ref(true);
const currentPage = ref(1);
const postsPerPage = 10;

const fetchPosts = async () => {
  loading.value = true;
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${currentPage.value}&_limit=${postsPerPage}`
  );
  posts.value = await response.json();
  loading.value = false;
};

const nextPage = () => {
  currentPage.value++;
  fetchPosts();
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    fetchPosts();
  }
};

const isLastPage = ref(false);

const checkIfLastPage = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const totalPosts = await response.json();
  isLastPage.value = currentPage.value * postsPerPage >= totalPosts.length;
};

onMounted(async () => {
  await fetchPosts();
  await checkIfLastPage();
});
</script>

<template>
  <div class="container mx-auto px-4 py-6">
    <div class="bg-white shadow-md rounded-lg overflow-y-scroll">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              ID
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Title
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Body
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="post in posts" :key="post.id">
            <td
              class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
            >
              {{ post.id }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ post.title }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ post.body }}
            </td>
          </tr>
        </tbody>
      </table>
      <div class="mt-4 flex justify-between px-6 pb-6">
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <button
          @click="nextPage"
          :disabled="isLastPage"
          class="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
    <div v-if="loading" class="mt-4 flex justify-center">
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

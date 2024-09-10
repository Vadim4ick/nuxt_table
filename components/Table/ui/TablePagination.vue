<script setup lang="ts">
import { usePaginationStore } from "@/shared/store/pagination";

const paginationStore = usePaginationStore();
</script>

<template>
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
        v-for="page in paginationStore.getPageRange"
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
</template>

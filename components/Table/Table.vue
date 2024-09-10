<script setup lang="ts">
import { useModalCreateStore } from "@/shared/store/modals";

const modalStore = useModalCreateStore();
</script>

<template>
  <div class="container mx-auto px-4 py-6">
    <button
      @click="modalStore.showModal = true"
      class="bg-green-500 text-white ml-auto flex px-4 py-2 rounded mb-4"
    >
      Добавить новый пост
    </button>

    <div class="bg-white shadow-md rounded-lg overflow-y-scroll">
      <table class="min-w-full table-fixed divide-y divide-gray-200">
        <TableUiTableHeader />

        <TableUiTableBody />
      </table>

      <TableUiTablePagination />
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePaginationStore } from "@/shared/store/pagination";
import { headerTable } from "@/shared/const";

const paginationStore = usePaginationStore();
</script>

<template>
  <thead class="bg-gray-50">
    <tr>
      <th
        v-for="header in headerTable"
        :key="header.name"
        :style="header.style"
        @click="header.sortable ? paginationStore.toggleSortOrder() : null"
        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
      >
        {{ header.name.charAt(0).toUpperCase() + header.name.slice(1) }}
        <span v-if="paginationStore.sortOrder === 'asc' && header.name === 'id'"
          >▲</span
        >
        <span v-else-if="header.name === 'id'">▼</span>
      </th>
    </tr>
  </thead>
</template>

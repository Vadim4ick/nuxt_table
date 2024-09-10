<script setup lang="ts">
import { usePaginationStore } from "@/shared/store/pagination";

const paginationStore = usePaginationStore();
</script>

<template>
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
</template>

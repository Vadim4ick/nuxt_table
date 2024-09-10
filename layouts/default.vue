<script setup lang="ts">
import { usePostsStore } from "@/shared/store/posts";

const postsStore = usePostsStore();

onMounted(async () => {
  await postsStore.fetchAllPosts();
});
</script>

<template>
  <UiLoader v-if="postsStore.loading" />

  <section v-else style="min-height: 100vh">
    <slot />
  </section>
</template>

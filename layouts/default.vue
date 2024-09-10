<script setup lang="ts">
import { usePostsStore } from "@/shared/store/posts";

const postsStore = usePostsStore();
</script>

<template>
  <Loader v-if="postsStore.loading" />

  <section v-else style="min-height: 100vh">
    <slot />
  </section>
</template>

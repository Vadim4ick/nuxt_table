<script setup lang="ts">
import { useModalCreateStore } from "@/shared/store/modals";
import { usePostsStore } from "@/shared/store/posts";

const modalStore = useModalCreateStore();
const postsStore = usePostsStore();

const addPost = async () => {
  if (modalStore.newPost.title && modalStore.newPost.body) {
    await postsStore.createPost(modalStore.newPost);
    modalStore.newPost = { title: "", body: "" }; // Очистка формы
    modalStore.showModal = false; // Закрытие модального окна
  }
};
</script>

<template>
  <div
    v-if="modalStore.showModal"
    class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50"
  >
    <div class="bg-white p-6 rounded-lg shadow-lg">
      <h2 class="text-xl font-bold mb-4">Create New Post</h2>
      <form @submit.prevent="addPost" class="w-[350px]">
        <div class="mb-4">
          <label class="block text-gray-700 mb-1">Title</label>
          <input
            v-model="modalStore.newPost.title"
            type="text"
            class="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 mb-1">Body</label>
          <textarea
            v-model="modalStore.newPost.body"
            class="w-full p-2 border border-gray-300 rounded"
            rows="4"
            required
          ></textarea>
        </div>
        <div class="flex justify-end space-x-2">
          <button
            @click="modalStore.showModal = false"
            type="button"
            class="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

import { defineStore } from "pinia";
import { ref } from "vue";

export const useModalCreateStore = defineStore("modal", () => {
  const showModal = ref(false);
  const newPost = ref<{ title: string; body: string }>({ title: "", body: "" });

  return {
    showModal,
    newPost,
  };
});

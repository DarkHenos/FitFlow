<template>
  <div class="fixed inset-x-0 bottom-0 z-50 bg-white dark:bg-gray-800 rounded-t-3xl shadow-lg transition-transform duration-300 ease-in-out max-w-[600px] mx-auto safe-area-bottom">
    <div class="w-full max-w-[600px] mx-auto p-6">
      <button @click="closeModal" class="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:hover:text-gray-300" aria-label="Close">
        <i class="fa-solid fa-times"></i>
      </button>
      <h3 class="text-2xl font-bold mb-4 text-black dark:text-white text-center">{{ selectedWidget ? selectedWidget.name : "Select Widget Size" }}</h3>
      
      <div class="grid grid-cols-3 gap-4 mb-6">
        <button 
          v-for="size in availableSizes" 
          :key="size" 
          @click="selectSize(size)"
          class="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition duration-300"
        >
          <div :class="['preview-widget', `size-${size}`]">
            <span class="text-center text-lg font-semibold text-black dark:text-white">{{ size }}</span>
          </div>
        </button>
      </div>
      
      <button @click="closeModal" class="w-full py-2 px-4 bg-red-600 hover:bg-red-700 text-white rounded-lg transition duration-300">Cancel</button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  selectedWidget: Object,
  closeModal: Function, // Passer la fonction de fermeture en prop
});

const availableSizes = computed(() => {
  return props.selectedWidget ? Object.keys(props.selectedWidget.componentMap) : [];
});

const selectSize = (size) => {
  // Logique pour gérer la sélection de taille (par exemple, stocker dans localStorage)
  console.log('Size selected:', size);
};
</script>

<style scoped>
.safe-area-bottom {
  padding-bottom: env(safe-area-inset-bottom);
}

.preview-widget {
  border: 2px solid gray;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px 0;
}

.size-small {
  height: 50px;
  width: 50px;
}

.size-medium {
  height: 75px;
  width: 75px;
}

.size-large {
  height: 100px;
  width: 100px;
}
</style>

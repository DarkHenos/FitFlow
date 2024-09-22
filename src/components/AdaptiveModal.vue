<template>
    <teleport to="body">
      <transition name="fade">
        <div v-if="show" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center" @click.self="close"> <!-- Ajout @click.self pour fermer en dehors -->
          <div 
            :class="[
              'bg-white dark:bg-gray-800 rounded-lg shadow-xl transition-all duration-300 ease-in-out',
              isMobile ? 'fixed bottom-0 left-0 right-0 rounded-t-lg' : 'max-w-md w-full mx-4'
            ]"
          >
            <div class="relative"> <!-- Ajout d'une div relative pour positionner la croix -->
              <button 
                @click="close" 
                class="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <i class="fas fa-times"></i>
              </button>
              <div class="p-6">
                <slot></slot>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </teleport>
  </template>
  
  <script>
  import { ref, onMounted, onUnmounted } from 'vue';
  
  export default {
    name: 'AdaptiveModal',
    props: {
      show: Boolean
    },
    emits: ['update:show'],
    setup(props, { emit }) {
      const isMobile = ref(window.innerWidth < 640);
  
      const updateIsMobile = () => {
        isMobile.value = window.innerWidth < 640;
      };
  
      const close = () => {
        emit('update:show', false);
      };
  
      onMounted(() => {
        window.addEventListener('resize', updateIsMobile);
      });
  
      onUnmounted(() => {
        window.removeEventListener('resize', updateIsMobile);
      });
  
      return {
        isMobile,
        close
      };
    }
  };
  </script>
  
  <style scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s;
  }
  
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  </style>
  
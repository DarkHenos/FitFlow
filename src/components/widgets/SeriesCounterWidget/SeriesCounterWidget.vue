<template>
    <div class="relative flex items-center justify-center widget-half-width h-52 p-4 border border-gray-300 dark:border-gray-600 rounded-lg">
      <!-- Grand cercle avec le compteur -->
      <div 
        class="relative flex items-center justify-center w-32 h-32 bg-gray-200 dark:bg-gray-700 rounded-full text-2xl font-semibold cursor-pointer text-black dark:text-white"
        @click="incrementCounter"
      >
        {{ count }}
      </div>
  
      <!-- Petit cercle avec l'icône de réinitialisation -->
      <div 
        class="absolute top-2 right-2 w-8 h-8 bg-gray-400 dark:bg-gray-800 rounded-full flex items-center justify-center cursor-pointer"
        @click="resetCounter"
      >
        <font-awesome-icon :icon="['fas', 'rotate']" class="text-white" />
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        count: 0,
      };
    },
    methods: {
      incrementCounter() {
        this.count += 1;
      },
      resetCounter() {
        this.count = 0;
      }
    }
  };
  </script>
  
  <style scoped>
  /* Remplacer .w-1/2 par une classe personnalisée */
  .widget-half-width {
    width: 50%;
  }
  
  /* Styles pour un affichage responsive */
  @media (max-width: 768px) {
    .widget-half-width {
      width: 100%;
    }
    .h-52 {
      height: auto;
    }
  }
  </style>
  
<template>
  <div class="widget-size-selector">
    <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
      Select Widget Size
    </h2>
    <button
      @click="goBack"
      class="flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 mb-4"
    >
      <i class="fas fa-chevron-left mr-2"></i>
      Back
    </button>
    <div class="grid grid-cols-2 md:grid-cols-3 gap-6">
      <div
        v-for="dimension in widget.dimensions"
        :key="`${dimension.width}x${dimension.height}`"
        class="flex flex-col items-center"
      >
        <button
          @click="selectSize(`${dimension.width}x${dimension.height}`)"
          class="w-full aspect-square flex items-center justify-center border-2 border-dashed border-gray-400 rounded-lg hover:border-primary-light dark:hover:border-primary-dark transition-colors duration-300"
          :style="{
            width: `${Math.min(
              dimension.width * 40,
              150,
            )}px` /* Réduction de la taille */,
            height: `${Math.min(
              dimension.height * 40,
              150,
            )}px` /* Réduction de la taille */,
          }"
        >
          <span class="text-lg font-semibold text-gray-700 dark:text-gray-300">
            {{ dimension.width }}x{{ dimension.height }}
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WidgetSizeSelector',
  props: {
    widget: {
      type: Object,
      required: true,
    },
  },
  emits: ['select-size', 'go-back'], // Ajout de l'événement go-back
  setup(_, { emit }) {
    const selectSize = (size) => {
      emit('select-size', size);
    };

    const goBack = () => {
      emit('go-back'); // Émet l'événement go-back
    };

    return {
      selectSize,
      goBack,
    };
  },
};
</script>

<style scoped>
.widget-size-selector {
  padding: 16px; /* Ajout d'un peu de padding pour éviter que le contenu touche les bords */
}
</style>

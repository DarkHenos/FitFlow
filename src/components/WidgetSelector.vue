<template>
  <div class="widget-selector">
    <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Select a Widget</h2>
    <div v-if="availableWidgets.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div 
        v-for="widget in availableWidgets" 
        :key="widget.id"
        class="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-300"
        @click="selectWidget(widget)"
        @touchstart="onTouchStart"
        @touchmove="onTouchMove"
        @touchend="onTouchEnd(widget)"
      >
        <div class="flex items-center mb-2">
          <i :class="[widget.icon, 'text-2xl text-primary-light dark:text-primary-dark mr-2']"></i>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ widget.name }}</h3>
        </div>
        <p class="text-gray-600 dark:text-gray-300">{{ widget.description }}</p>
      </div>
    </div>
    <p v-else class="text-gray-600 dark:text-gray-300">No widgets available at the moment.</p>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'WidgetSelector',
  props: {
    availableWidgets: {
      type: Array,
      required: true
    }
  },
  emits: ['select-widget', 'close-modal'],
  setup(props, { emit }) {
    const touchStartY = ref(0);
    const isSwiping = ref(false);

    const selectWidget = (widget) => {
      emit('select-widget', widget);
      emit('close-modal');
    };

    const onTouchStart = (event) => {
      touchStartY.value = event.touches[0].clientY;
      isSwiping.value = false;
    };

    const onTouchMove = (event) => {
      if (!touchStartY.value) return;

      const yDiff = event.touches[0].clientY - touchStartY.value;

      if (Math.abs(yDiff) > 10) {
        isSwiping.value = true;
      }
    };

    const onTouchEnd = (widget) => {
      if (!isSwiping.value) {
        selectWidget(widget);
      }
      
      touchStartY.value = 0;
      isSwiping.value = false;
    };

    return {
      selectWidget,
      onTouchStart,
      onTouchMove,
      onTouchEnd
    };
  }
};
</script>
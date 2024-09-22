<template>
  <div class="widget-selector">
    <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Select a Widget</h2>
    <div v-if="availableWidgets.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div 
        v-for="widget in availableWidgets" 
        :key="widget.id"
        class="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-300"
        @click="selectWidget(widget)"
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
export default {
  name: 'WidgetSelector',
  props: {
    availableWidgets: {
      type: Array,
      required: true
    }
  },
  emits: ['select-widget'],
  setup(props, { emit }) {
    const selectWidget = (widget) => {
      emit('select-widget', widget);
    };

    return {
      selectWidget
    };
  }
};
</script>
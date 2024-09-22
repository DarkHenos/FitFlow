<template>
  <div class="flex flex-col h-screen bg-beige dark:bg-gray-800 transition-colors duration-300">
    <!-- Contenu principal -->
    <div class="flex-grow flex flex-col overflow-hidden">
      <!-- En-tête -->
      <div class="flex-shrink-0 flex flex-col items-center p-4">
        <div class="flex items-center justify-center mb-1">
          <h1 v-if="isTextVisible" class="text-4xl font-bold text-black dark:text-white">
            Home
          </h1>
          <button 
            @click="toggleTextVisibility" 
            class="text-xl text-primary-dark transition duration-300 transform hover:scale-110 ml-4"
          >
            <i :class="isTextVisible ? 'fa-solid fa-minimize' : 'fa-solid fa-maximize'"></i>
          </button>
        </div>
        <p v-if="isTextVisible" class="text-lg text-center text-gray-800 dark:text-gray-300 mb-2">
          Add and arrange your favorite widgets below.
        </p>
      </div>

      <!-- Grid des widgets -->
      <div 
        class="flex-grow p-4"
        :class="{ 'grid-expanded': !isTextVisible }"
      >
        <widget-grid
          ref="widgetGridRef"
          :widgets="activeWidgets"
          class="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md"
          @update-widgets="updateWidgets"
          @open-widget-selector="openWidgetSelector"
        />
      </div>
    </div>

    <!-- Modal pour sélectionner un widget -->
    <adaptive-modal v-model:show="showWidgetSelector">
      <widget-selector
        :available-widgets="availableWidgets"
        @select-widget="addWidget"
        @close-modal="closeWidgetSelector"
      />
    </adaptive-modal>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useWidgets } from '../composables/useWidgets';
import WidgetGrid from '../components/WidgetGrid.vue';
import AdaptiveModal from '../components/AdaptiveModal.vue';
import WidgetSelector from '../components/WidgetSelector.vue';

export default {
  name: 'HomeView',
  components: {
    WidgetGrid,
    AdaptiveModal,
    WidgetSelector,
  },
  setup() {
    const { activeWidgets, availableWidgets, addWidget, updateWidgetPosition } =
      useWidgets();
    const widgetGridRef = ref(null);
    const showWidgetSelector = ref(false);
    const isTextVisible = ref(true);

    // Ajout de logs pour le suivi
    console.log('Active Widgets:', activeWidgets.value);
    console.log('Available Widgets:', availableWidgets.value);

    const openWidgetSelector = () => {
      showWidgetSelector.value = true;
      console.log('Widget selector opened');
    };

    const closeWidgetSelector = () => {
      showWidgetSelector.value = false;
      console.log('Widget selector closed');
    };

    const updateWidgets = (updatedWidgets) => {
      updateWidgetPosition(updatedWidgets);
      console.log('Widgets updated:', updatedWidgets);
    };

    const toggleTextVisibility = () => {
      isTextVisible.value = !isTextVisible.value;
      console.log('Text visibility toggled:', isTextVisible.value);
    };

    const handleAddWidget = (widget) => {
      addWidget(widget);
      console.log('Widget added:', widget);
      closeWidgetSelector();
    };

    return {
      activeWidgets,
      availableWidgets,
      widgetGridRef,
      showWidgetSelector,
      openWidgetSelector,
      closeWidgetSelector,
      addWidget: handleAddWidget,
      updateWidgets,
      isTextVisible,
      toggleTextVisibility,
    };
  },
};
</script>

<style scoped>
.flex-grow {
  min-height: 0;
}

.grid-expanded {
  height: calc(100vh - 120px); /* Ajustement pour laisser la place au bouton et au texte */
  transition: height 0.3s ease;
}
</style>

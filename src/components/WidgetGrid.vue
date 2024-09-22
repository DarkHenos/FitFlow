<template>
  <div class="widget-grid" ref="gridRef">
    <TransitionGroup name="widget-move">
      <template v-for="index in 4" :key="index">
        <div
          v-if="index <= sortedWidgets.length"
          class="widget-item"
        >
          <component :is="sortedWidgets[index - 1].component" v-if="sortedWidgets[index - 1].component" />
          <div v-else class="widget-info">
            <h3>{{ sortedWidgets[index - 1].name }}</h3>
            <p>ID: {{ sortedWidgets[index - 1].id }}</p>
            <i :class="sortedWidgets[index - 1].icon"></i>
          </div>
        </div>
        <div
          v-else
          class="widget-item empty-cell"
          @touchstart="onTouchStart"
          @touchmove="onTouchMove"
          @touchend="onTouchEnd"
          @click="openWidgetSelectorModal"
        >
          <p>Tap to add widget</p>
        </div>
      </template>
    </TransitionGroup>
  </div>
</template>

<script>
import { ref, computed } from 'vue';

export default {
  name: 'WidgetGrid',
  props: {
    widgets: {
      type: Array,
      required: true,
    },
  },
  emits: ['update-widgets', 'open-widget-selector'],
  setup(props, { emit }) {
    const gridRef = ref(null);
    const touchStartY = ref(0);
    const isSwiping = ref(false);

    const sortedWidgets = computed(() => {
      console.log("Widgets in grid:", props.widgets);  // Debug log
      return [...props.widgets].sort((a, b) => a.position - b.position);
    });

    const openWidgetSelectorModal = () => {
      emit('open-widget-selector');
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

    const onTouchEnd = (event) => {
      if (!isSwiping.value) {
        openWidgetSelectorModal();
      }
      
      touchStartY.value = 0;
      isSwiping.value = false;
    };

    return {
      gridRef,
      sortedWidgets,
      openWidgetSelectorModal,
      onTouchStart,
      onTouchMove,
      onTouchEnd,
    };
  },
};
</script>

<style scoped>
.widget-grid {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
}

.widget-item {
  background-color: #f0f0f0;
  min-height: 130px;
  border-radius: 15px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.dark .widget-item {
  background-color: #3a3a3a;
  border-color: #ff3d00;
}

.empty-cell {
  background-color: #fafafa;
  border: 2px dashed #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #aaa;
  font-size: 14px;
  cursor: pointer;
}

.dark .empty-cell {
  background-color: #2d2d2d;
  border-color: #b45a3f;
}

.widget-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.widget-info h3 {
  font-size: 16px;
  margin: 0 0 5px;
}

.widget-info p {
  font-size: 12px;
  margin: 0 0 5px;
}

.widget-info i {
  font-size: 24px;
  margin-top: 10px;
}

.widget-move-enter-active,
.widget-move-leave-active {
  transition: all 0.5s ease;
}

.widget-move-enter-from,
.widget-move-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.widget-move-leave-active {
  position: absolute;
}
</style>
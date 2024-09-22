<template>
    <div
      class="widget-grid"
      :style="{ minHeight: gridHeight }"
      ref="gridRef"
    >
      <TransitionGroup name="widget-move">
        <div
          v-for="widget in positionedWidgets"
          :key="widget.id"
          :class="['widget-item', `size-${widget.size}`]"
          :style="getWidgetStyle(widget)"
        >
          <component :is="widget.component" v-if="widget.component" />
          <div v-else class="widget-info">
            <h3>{{ widget.name }}</h3>
            <p>Size: {{ widget.size }}</p>
            <p>ID: {{ widget.id }}</p>
            <i :class="widget.icon"></i>
          </div>
        </div>
      </TransitionGroup>
  
      <div
        v-for="n in emptyCells"
        :key="'empty-' + n"
        class="widget-item empty-cell"
        @touchstart="onTouchStart"
        @touchmove="onTouchMove"
        @touchend="onTouchEnd"
        @click="openWidgetSelectorModal"
      >
        <p>Tap to add widget</p>
      </div>
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
      const totalCells = 4;
      const cellHeight = 130;
      const touchStartX = ref(0);
      const touchStartY = ref(0);
      const isSwiping = ref(false);
  
      const emptyCells = computed(() => totalCells - props.widgets.length);
      const gridHeight = computed(() => `${cellHeight * totalCells + (totalCells - 1) * 10}px`);
      const positionedWidgets = computed(() => props.widgets.filter(widget => widget.position));
  
      const getWidgetStyle = (widget) => {
        if (!widget.position) return {};
        const [width, height] = widget.size.split('x').map(Number);
        return {
          gridArea: `${widget.position.row} / ${widget.position.col} / span ${height} / span ${width}`,
        };
      };
  
      const openWidgetSelectorModal = () => {
        emit('open-widget-selector');
      };
  
      const onTouchStart = (event) => {
        touchStartX.value = event.touches[0].clientX;
        touchStartY.value = event.touches[0].clientY;
        isSwiping.value = false;
      };
  
      const onTouchMove = (event) => {
        if (!touchStartX.value || !touchStartY.value) {
          return;
        }
  
        const xDiff = event.touches[0].clientX - touchStartX.value;
        const yDiff = event.touches[0].clientY - touchStartY.value;
        const distance = Math.sqrt(xDiff * xDiff + yDiff * yDiff);
  
        if (distance > 10) { // Seuil de 10 pixels pour considérer un mouvement comme un swipe
          isSwiping.value = true;
        }
      };
  
      const onTouchEnd = (event) => {
        if (!isSwiping.value) {
          openWidgetSelectorModal();
        }
        
        // Réinitialisation des valeurs
        touchStartX.value = 0;
        touchStartY.value = 0;
        isSwiping.value = false;
      };
  
      return {
        gridRef,
        emptyCells,
        gridHeight,
        positionedWidgets,
        getWidgetStyle,
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
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(4, 1fr);
  gap: 10px;
  max-width: 700px;
  width: 100%;
  margin: 0 auto;
}

.widget-item {
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  padding: 10px;
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
</style>
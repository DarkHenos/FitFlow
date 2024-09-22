<template>
  <div 
    :class="['widget', 'series-counter-widget', { 'dark-mode': darkMode }]"
    @mousedown="startDrag"
    @touchstart="startDrag"
  >
    <div class="counter-content">
      <div class="counter">{{ seriesCount }}</div>
    </div>
    <div class="controls">
      <button @click="decrementCount" class="decrement-btn">-</button>
      <button @click="incrementCount" class="increment-btn">+</button>
      <button @click="resetCount" class="reset-btn">Reset</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SeriesCounterWidget',
  props: {
    darkMode: Boolean,
    widgetId: String,
  },
  emits: ['updatePosition'],
  data() {
    return {
      title: 'Series Counter',
      seriesCount: 0,
      isDragging: false,
      startX: 0,
      startY: 0,
    };
  },
  methods: {
    incrementCount() {
      this.seriesCount++;
    },
    decrementCount() {
      if (this.seriesCount > 0) {
        this.seriesCount--;
      }
    },
    resetCount() {
      this.seriesCount = 0;
    },
    startDrag(event) {
      this.isDragging = true;
      this.startX = event.clientX || event.touches[0].clientX;
      this.startY = event.clientY || event.touches[0].clientY;

      document.addEventListener('mousemove', this.onDrag);
      document.addEventListener('touchmove', this.onDrag);
      document.addEventListener('mouseup', this.stopDrag);
      document.addEventListener('touchend', this.stopDrag);
    },
    onDrag(event) {
      if (!this.isDragging) return;

      const currentX = event.clientX || event.touches[0].clientX;
      const currentY = event.clientY || event.touches[0].clientY;

      const deltaX = currentX - this.startX;
      const deltaY = currentY - this.startY;

      this.$emit('updatePosition', { deltaX, deltaY });

      this.startX = currentX;
      this.startY = currentY;
    },
    stopDrag() {
      this.isDragging = false;
      document.removeEventListener('mousemove', this.onDrag);
      document.removeEventListener('touchmove', this.onDrag);
      document.removeEventListener('mouseup', this.stopDrag);
      document.removeEventListener('touchend', this.stopDrag);
    },
  },
};
</script>

<style scoped>
.series-counter-widget {
  background-color: var(--widget-bg-color, #f0f0f0);
  color: var(--widget-text-color, #333);
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  min-height: 130px;
  padding: 0.5rem;
  transition: background-color 0.3s, color 0.3s;
}

.counter-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
}

.title {
  font-size: 1.2rem;
  margin: 0;
  padding: 0.1rem;
}

.counter {
  font-size: 3rem;
  font-weight: bold;
  margin: 0.5rem 0;
}

.controls {
  display: flex;
  justify-content: space-around;
  gap: 0.25rem;
  margin-top: 0.25rem;
}

button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  font-weight: bold;
  font-size: 1rem;
  min-width: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  touch-action: manipulation;
}

.increment-btn {
  background-color: var(--widget-increment-btn-color, #4CAF50);
  color: white;
}

.decrement-btn {
  background-color: var(--widget-decrement-btn-color, #f44336);
  color: white;
}

.reset-btn {
  background-color: var(--widget-reset-btn-color, #2196F3);
  color: white;
}

button:hover {
  opacity: 0.8;
}

@media (hover: none) {
  button:hover {
    opacity: 1;
  }
}

:root {
  --widget-bg-color: #f0f0f0;
  --widget-text-color: #333;
  --widget-increment-btn-color: #4CAF50;
  --widget-decrement-btn-color: #f44336;
  --widget-reset-btn-color: #2196F3;
}

:root.dark {
  --widget-bg-color: #2c2c2c;
  --widget-text-color: #f0f0f0;
  --widget-increment-btn-color: #45a049;
  --widget-decrement-btn-color: #d32f2f;
  --widget-reset-btn-color: #1e88e5;
}
</style>

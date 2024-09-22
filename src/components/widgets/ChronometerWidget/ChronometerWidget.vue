<template>
  <div 
    class="widget chronometer-widget"
    @mousedown="startDrag"
    @touchstart="startDrag"
  >
    <h2>{{ title }}</h2>
    <div class="time">{{ formattedTime }}</div>
    <div class="controls">
      <button @click.stop="startChronometer">Start</button>
      <button @click.stop="stopChronometer">Stop</button>
      <button @click.stop="resetChronometer">Reset</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChronometerWidget',
  props: {
    darkMode: Boolean,
    widgetId: String,
  },
  emits: ['updatePosition'],
  data() {
    return {
      title: 'Chronometer',
      elapsedTime: 0,
      isRunning: false,
      interval: null,
      isDragging: false,
      startX: 0,
      startY: 0,
    };
  },
  computed: {
    formattedTime() {
      const seconds = Math.floor((this.elapsedTime / 1000) % 60);
      const minutes = Math.floor((this.elapsedTime / (1000 * 60)) % 60);
      const hours = Math.floor((this.elapsedTime / (1000 * 60 * 60)) % 24);
      return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    },
  },
  methods: {
    startChronometer() {
      if (!this.isRunning) {
        this.isRunning = true;
        this.interval = setInterval(() => {
          this.elapsedTime += 100;
        }, 100);
      }
    },
    stopChronometer() {
      this.isRunning = false;
      clearInterval(this.interval);
    },
    resetChronometer() {
      this.isRunning = false;
      clearInterval(this.interval);
      this.elapsedTime = 0;
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
  beforeUnmount() {
    clearInterval(this.interval);
  },
};
</script>

<style scoped>
.chronometer-widget {
  background-color: #f0f0f0;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}

.time {
  font-size: 2rem;
  font-weight: bold;
  margin: 1rem 0;
}

.controls {
  display: flex;
  gap: 0.5rem;
}

button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  opacity: 0.8;
}
</style>
<template>
  <div 
    :class="['widget', 'chronometer-widget', { 'dark-mode': darkMode }]"
    @mousedown="startDrag"
    @touchstart="startDrag"
  >
    <div class="timer-content">
      <h2 class="title">{{ title }}</h2>
      <div class="time">{{ formattedTime }}</div>
    </div>
    <div class="controls">
      <button v-if="!isRunning" @click.stop="startChronometer" class="start-btn">Start</button>
      <button v-if="isRunning" @click.stop="stopChronometer" class="stop-btn">Stop</button>
      <button @click.stop="resetChronometer" class="reset-btn">Reset</button>
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
      wakeLock: null,
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
    async startChronometer() {
      if (!this.isRunning) {
        this.isRunning = true;
        this.interval = setInterval(() => {
          this.elapsedTime += 100;
        }, 100);
        await this.requestWakeLock();
      }
    },
    async stopChronometer() {
      this.isRunning = false;
      clearInterval(this.interval);
      await this.releaseWakeLock();
    },
    async resetChronometer() {
      this.isRunning = false;
      clearInterval(this.interval);
      this.elapsedTime = 0;
      await this.releaseWakeLock();
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
    async requestWakeLock() {
      if ('wakeLock' in navigator) {
        try {
          this.wakeLock = await navigator.wakeLock.request('screen');
        } catch (err) {
          console.error(`${err.name}, ${err.message}`);
        }
      }
    },
    async releaseWakeLock() {
      if (this.wakeLock !== null) {
        try {
          await this.wakeLock.release();
          this.wakeLock = null;
        } catch (err) {
          console.error(`${err.name}, ${err.message}`);
        }
      }
    },
  },
  beforeUnmount() {
    clearInterval(this.interval);
    this.releaseWakeLock();
  },
};
</script>

<style scoped>
.chronometer-widget {
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

.timer-content {
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

.time {
  font-size: 2rem;
  font-weight: bold;
  margin: 0.1rem 0;
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
  min-height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  touch-action: manipulation;
}

.start-btn {
  background-color: var(--widget-start-btn-color, #4CAF50);
  color: white;
}

.stop-btn {
  background-color: var(--widget-stop-btn-color, #f44336);
  color: white;
}

.reset-btn {
  background-color: var(--widget-reset-btn-color, #2196F3);
  color: white;
}

button:hover {
  opacity: 0.8;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

@media (hover: none) {
  button:hover {
    opacity: 1;
  }
}

:root {
  --widget-bg-color: #f0f0f0;
  --widget-text-color: #333;
  --widget-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  --widget-start-btn-color: #4CAF50;
  --widget-stop-btn-color: #f44336;
  --widget-reset-btn-color: #2196F3;
}

:root.dark {
  --widget-bg-color: #2c2c2c;
  --widget-text-color: #f0f0f0;
  --widget-shadow: 0 2px 4px rgba(255, 255, 255, 0.1);
  --widget-start-btn-color: #45a049;
  --widget-stop-btn-color: #d32f2f;
  --widget-reset-btn-color: #1e88e5;
}
</style>

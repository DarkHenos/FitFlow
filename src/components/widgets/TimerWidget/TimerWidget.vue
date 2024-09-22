<template>
  <div 
    :class="['widget', 'timer-widget', { 'dark-mode': darkMode }]"
    @mousedown="startDrag"
    @touchstart="startDrag"
  >
    <div class="timer-content">
      <h2 class="title">{{ title }}</h2>
      <div class="time" v-if="!isSettingTime">{{ formattedTime }}</div>
      <div class="time-setter" v-else>
        <button @click="adjustTime('minutes', -1)" class="adjust-btn">-1min</button>
        <button @click="adjustTime('seconds', -30)" class="adjust-btn">-30s</button>
        <span>{{ String(minutes).padStart(2, '0') }}:{{ String(seconds).padStart(2, '0') }}</span>
        <button @click="adjustTime('seconds', 30)" class="adjust-btn">+30s</button>
        <button @click="adjustTime('minutes', 1)" class="adjust-btn">+1min</button>
      </div>
    </div>
    <div class="controls" v-if="!isSettingTime">
      <button @click.stop="toggleTimeSetting" class="set-btn">Adjust</button>
      <button @click.stop="startTimer" class="start-btn" :disabled="remainingTime === 0">Start</button>
      <button @click.stop="resetTimer" class="reset-btn">Reset</button>
    </div>
    <div class="controls" v-else>
      <button @click.stop="resetTimer" class="reset-btn">Reset</button>
      <button @click.stop="toggleTimeSetting" class="set-btn">Set</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TimerWidget',
  props: {
    darkMode: Boolean,
    widgetId: String,
  },
  emits: ['updatePosition'],
  data() {
    return {
      title: 'Timer',
      remainingTime: 0,
      isRunning: false,
      interval: null,
      isDragging: false,
      startX: 0,
      startY: 0,
      wakeLock: null,
      initialTime: 0,
      isSettingTime: false,
      minutes: 0,
      seconds: 0,
    };
  },
  computed: {
    formattedTime() {
      const minutes = Math.floor(this.remainingTime / 60000);
      const seconds = Math.floor((this.remainingTime % 60000) / 1000);
      return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    },
  },
  methods: {
    toggleTimeSetting() {
      this.isSettingTime = !this.isSettingTime;
      if (!this.isSettingTime) {
        this.remainingTime = (this.minutes * 60 + this.seconds) * 1000;
        this.initialTime = this.remainingTime;
      }
    },
    adjustTime(unit, value) {
      let totalSeconds = this.minutes * 60 + this.seconds;
      if (unit === 'minutes') {
        totalSeconds += value * 60;
      } else if (unit === 'seconds') {
        totalSeconds += value;
      }
      totalSeconds = Math.max(0, Math.min(5999, totalSeconds));
      this.minutes = Math.floor(totalSeconds / 60);
      this.seconds = totalSeconds % 60;
    },
    async startTimer() {
      if (!this.isRunning && this.remainingTime > 0) {
        this.isRunning = true;
        this.interval = setInterval(() => {
          this.remainingTime = Math.max(0, this.remainingTime - 100);
          if (this.remainingTime === 0) {
            this.stopTimer();
            this.vibrateDevice();
          }
        }, 100);
        await this.requestWakeLock();
      }
    },
    async stopTimer() {
      this.isRunning = false;
      clearInterval(this.interval);
      await this.releaseWakeLock();
      if (this.remainingTime === 0) {
        this.vibrateDevice();
      }
    },
    resetTimer() {
      this.stopTimer();
      if (this.isSettingTime) {
        this.minutes = 0;
        this.seconds = 0;
      } else {
        this.remainingTime = this.initialTime;
      }
    },
    vibrateDevice() {
      if ('vibrate' in navigator) {
        const pattern = [200, 100, 200, 100, 200];
        const success = navigator.vibrate(pattern);
        if (success) {
          console.log('Vibration activée');
        } else {
          console.log('La vibration a échoué ou n\'est pas supportée');
        }
      } else {
        console.log('API de vibration non supportée sur cet appareil');
      }
    },
    startDrag(event) {
      // Le code de startDrag reste le même
    },
    onDrag(event) {
      // Le code de onDrag reste le même
    },
    stopDrag() {
      // Le code de stopDrag reste le même
    },
    async requestWakeLock() {
      // Le code de requestWakeLock reste le même
    },
    async releaseWakeLock() {
      // Le code de releaseWakeLock reste le même
    },
  },
  beforeUnmount() {
    clearInterval(this.interval);
    this.releaseWakeLock();
  },
};
</script>

<style scoped>
.timer-widget {
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

.time, .time-setter {
  font-size: 2rem;
  font-weight: bold;
  margin: 0.1rem 0;
}

.time-setter {
  display: flex;
  align-items: center;
  gap: 0.25rem;
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

.adjust-btn {
  font-size: 1rem;
  min-width: 3.5rem;
  min-height: 2.5rem;
  padding: 0.25rem;
}

.set-btn {
  background-color: var(--widget-set-btn-color, #ffa500);
  color: white;
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
  --widget-set-btn-color: #ffa500;
  --widget-start-btn-color: #4CAF50;
  --widget-stop-btn-color: #f44336;
  --widget-reset-btn-color: #2196F3;
}

:root.dark {
  --widget-bg-color: #2c2c2c;
  --widget-text-color: #f0f0f0;
  --widget-shadow: 0 2px 4px rgba(255, 255, 255, 0.1);
  --widget-set-btn-color: #cc8400;
  --widget-start-btn-color: #45a049;
  --widget-stop-btn-color: #d32f2f;
  --widget-reset-btn-color: #1e88e5;
}
</style>

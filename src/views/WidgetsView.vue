<template>
  <div class="p-6 bg-beige dark:bg-gray-800 min-h-screen transition-colors duration-300">
    <h1 class="text-3xl font-bold text-black dark:text-white mb-6">Widgets</h1>

    <!-- Espace pour éviter le chevauchement avec la barre de navigation -->
    <div class="mb-6"></div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <!-- Chronomètre -->
      <div class="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md">
        <h2 class="text-xl font-semibold text-black dark:text-white mb-2">Chronomètre</h2>
        <p class="text-gray-700 dark:text-gray-300 mb-4">Suivez le temps écoulé avec précision.</p>
        <button class="px-4 py-2 bg-primary-light text-white rounded shadow hover:opacity-90 transition duration-300">Start</button>
      </div>

      <!-- Minuteur -->
      <div class="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md">
        <h2 class="text-xl font-semibold text-black dark:text-white mb-2">Minuteur</h2>
        <p class="text-gray-700 dark:text-gray-300 mb-4">Réglez un minuteur pour vos sessions d'entraînement.</p>
        <button class="px-4 py-2 bg-primary-light text-white rounded shadow hover:opacity-90 transition duration-300">Start</button>
      </div>

      <!-- Compteur de séries -->
      <div class="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md">
        <h2 class="text-xl font-semibold text-black dark:text-white mb-2">Compteur de Séries</h2>
        <p class="text-gray-700 dark:text-gray-300 mb-4">Gardez une trace du nombre de séries effectuées.</p>
        <button class="px-4 py-2 bg-primary-light text-white rounded shadow hover:opacity-90 transition duration-300">Start</button>
      </div>

      <!-- Fonctionnalité à venir 1 -->
      <div class="bg-gray-200 dark:bg-gray-600 p-4 rounded-lg shadow-md opacity-50 cursor-not-allowed">
        <h2 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">Workout Checklist</h2>
        <p class="text-gray-700 dark:text-gray-300">Create and manage a checklist of exercises to keep track of your workout routine.</p>
        <span class="inline-block bg-gray-700 text-white text-sm font-semibold rounded-full px-3 py-1 mt-2">Coming Soon</span>
      </div>

      <!-- Fonctionnalité à venir 2 -->
      <div class="bg-gray-200 dark:bg-gray-600 p-4 rounded-lg shadow-md opacity-50 cursor-not-allowed">
        <h2 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">Custom Workout Planner</h2>
        <p class="text-gray-700 dark:text-gray-300">Design your own workout programs tailored to your fitness goals.</p>
        <span class="inline-block bg-gray-700 text-white text-sm font-semibold rounded-full px-3 py-1 mt-2">Coming Soon</span>
      </div>

      <!-- Fonctionnalité à venir 3 -->
      <div class="bg-gray-200 dark:bg-gray-600 p-4 rounded-lg shadow-md opacity-50 cursor-not-allowed">
        <h2 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">Workout History</h2>
        <p class="text-gray-700 dark:text-gray-300">Review past workouts to see improvements and adjust future routines.</p>
        <span class="inline-block bg-gray-700 text-white text-sm font-semibold rounded-full px-3 py-1 mt-2">Coming Soon</span>
      </div>

      <!-- Fonctionnalité à venir 4 -->
      <div class="bg-gray-200 dark:bg-gray-600 p-4 rounded-lg shadow-md opacity-50 cursor-not-allowed">
        <h2 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">Workout Challenge</h2>
        <p class="text-gray-700 dark:text-gray-300">Participate in fitness challenges and track your performance against others.</p>
        <span class="inline-block bg-gray-700 text-white text-sm font-semibold rounded-full px-3 py-1 mt-2">Coming Soon</span>
      </div>

      <!-- Fonctionnalité à venir 5 -->
      <div class="bg-gray-200 dark:bg-gray-600 p-4 rounded-lg shadow-md opacity-50 cursor-not-allowed">
        <h2 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">Fitness Journal</h2>
        <p class="text-gray-700 dark:text-gray-300">Keep a daily log of workouts, nutrition, and progress.</p>
        <span class="inline-block bg-gray-700 text-white text-sm font-semibold rounded-full px-3 py-1 mt-2">Coming Soon</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "WidgetView",
});
</script>

<style scoped>
/* Ajoute des styles supplémentaires si nécessaire */
</style>

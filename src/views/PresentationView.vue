<template>
  <div class="flex flex-col items-center justify-center min-h-screen p-6 bg-beige dark:bg-gray-800 pt-20 transition-colors duration-300">
    <h1 class="text-5xl font-bold text-center text-black dark:text-white mb-8">
      Welcome to FitFlow
    </h1>
    <p class="text-xl text-center text-gray-700 dark:text-gray-300 max-w-3xl mb-12">
      FitPulse is your personal fitness companion, designed to help you track, manage, and improve your sports activities.
    </p>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
      <div v-for="(feature, index) in features" :key="index" class="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
        <i :class="feature.icon" class="text-4xl text-primary-light dark:text-primary-dark mb-4"></i>
        <h2 class="text-2xl font-semibold text-black dark:text-white mb-2">{{ feature.title }}</h2>
        <p class="text-gray-700 dark:text-gray-300">{{ feature.description }}</p>
      </div>
    </div>
    <router-link 
      to="/widgets" 
      class="mt-12 px-8 py-4 bg-primary-light dark:bg-primary-dark text-white text-lg font-semibold rounded-full shadow-lg hover:opacity-90 transition duration-300"
    >
      Discover our widgets
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'PresentationView',
  setup() {
    const features = [
      { 
        icon: 'fas fa-chart-line', 
        title: 'Track Progress', 
        description: 'Monitor your fitness journey with detailed analytics and insights.' 
      },
      { 
        icon: 'fas fa-dumbbell', 
        title: 'Custom Workouts', 
        description: 'Create and manage personalized workout routines tailored to your goals.' 
      },
      { 
        icon: 'fas fa-cog', 
        title: 'Customize Your Dashboard', 
        description: 'Personnalisez votre tableau de bord pour afficher les données qui comptent le plus pour vous.' 
      },
      { 
        icon: 'fas fa-th-large', 
        title: 'Widgets Library', 
        description: 'Accédez à une bibliothèque de widgets pour personnaliser votre expérience.' 
      },
    ];

    return { features };
  }
};
</script>

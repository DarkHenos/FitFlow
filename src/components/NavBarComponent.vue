<template>
  <div class="relative">
    <nav class="bg-beige dark:bg-gray-800 shadow-md z-50 transition-colors duration-300 relative">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex-shrink-0">
            <h1 class="text-xl font-semibold text-black dark:text-white">FitFlow</h1>
          </div>
          <div class="hidden sm:flex sm:items-center sm:ml-6">
            <router-link
              v-for="item in navItems"
              :key="item.path"
              :to="item.path"
              class="px-3 py-2 rounded-md text-sm font-medium text-black dark:text-white hover:text-primary-dark dark:hover:text-primary-light"
              @click="closeMenu"
            >
              {{ item.name }}
            </router-link>
          </div>
          <div class="flex items-center">
            <button
              @click="theme.toggle()"
              class="p-2 rounded-full text-black dark:text-white hover:text-primary-dark dark:hover:text-primary-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              <i :class="theme.isDarkMode ? 'fas fa-sun' : 'fas fa-moon'" class="h-6 w-6"></i>
            </button>
            <button
              @click="toggleMenu"
              class="sm:hidden ml-3 p-2 rounded-full text-black dark:text-white hover:text-primary-dark dark:hover:text-primary-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              <i :class="isMenuOpen ? 'fas fa-times' : 'fas fa-bars'" class="h-6 w-6"></i>
            </button>
          </div>
        </div>
      </div>
      <transition name="slide-fade">
        <div v-if="isMenuOpen" class="absolute top-16 left-0 right-0 bg-beige dark:bg-gray-800 shadow-lg z-50">
          <div class="px-2 pt-2 pb-3 space-y-1">
            <router-link
              v-for="item in navItems"
              :key="item.path"
              :to="item.path"
              class="block px-3 py-2 rounded-md text-base font-medium text-black dark:text-white hover:text-primary-dark dark:hover:text-primary-light"
              @click="closeMenu"
            >
              {{ item.name }}
            </router-link>
          </div>
        </div>
      </transition>
    </nav>
    
    <!-- Overlay avec effet de fondu -->
    <transition name="fade">
      <div v-if="isMenuOpen" class="fixed inset-x-0 top-16 bottom-0 bg-black bg-opacity-50 z-40" @click="closeMenu"></div>
    </transition>
  </div>
</template>

<script>
import { ref, inject } from 'vue';

export default {
  name: 'NavBarComponent',
  setup() {
    const theme = inject('theme');
    const isMenuOpen = ref(false);
    const navItems = [
      { name: 'Presentation', path: '/' },
      { name: 'Home', path: '/home' },
      { name: 'Widgets', path: '/widgets' },
      { name: 'Profile', path: '/profile' },
    ];

    const toggleMenu = () => {
      isMenuOpen.value = !isMenuOpen.value;
    };

    const closeMenu = () => {
      isMenuOpen.value = false;
    };

    return { theme, isMenuOpen, navItems, toggleMenu, closeMenu };
  },
};
</script>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Accentuer le contraste des éléments du menu */
.bg-beige {
  background-color: #f5f5dc; /* Modifiez la couleur selon vos besoins */
}
</style>
<template>
  <div :class="{ dark: theme.isDarkMode }" id="app">
    <NavBarComponent />
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import NavBarComponent from "./components/NavBarComponent.vue";
import theme from "./theme";

export default defineComponent({
  name: "App",
  components: {
    NavBarComponent,
  },
  setup() {
    onMounted(() => {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = (event: MediaQueryListEvent) => {
        theme.isDarkMode = event.matches;
        localStorage.setItem("theme", theme.isDarkMode ? "dark" : "light");
        document.body.classList.toggle("dark", theme.isDarkMode);
      };

      mediaQuery.addEventListener("change", handleChange);

      return () => {
        mediaQuery.removeEventListener("change", handleChange);
      };
    });

    return {
      theme,
    };
  },
});
</script>

<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: #f5f5dc;
  transition: background-color 0.3s ease;
}

body.dark {
  background-color: #1a1a1a;
  color: #ffffff;
}
</style>

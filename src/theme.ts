import { reactive } from "vue";

const theme = reactive({
  isDarkMode: localStorage.getItem("theme") === "dark",
  toggle() {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem("theme", this.isDarkMode ? "dark" : "light");
    document.body.classList.toggle("dark", this.isDarkMode);
  },
});

export default theme;

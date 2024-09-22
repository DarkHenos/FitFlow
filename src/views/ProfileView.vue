<template>
  <div class="relative profile-page">
    <!-- Message "Coming Soon" en grand au-dessus -->
    <div class="absolute inset-0 flex justify-center items-center z-10">
      <p class="text-5xl font-bold text-white opacity-90">
        🚧 Coming Soon 🚧
      </p>
    </div>

    <!-- Structure de base du profil -->
    <div class="profile-content p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg relative z-0 opacity-40 dark:opacity-50">
      <div class="profile-header flex flex-col items-center mb-6">
        <img 
          class="w-24 h-24 rounded-full object-cover mb-4" 
          :src="user.avatar" 
          alt="User Avatar" 
        />
        <div class="text-center">
          <h1 class="text-3xl font-semibold text-gray-800 dark:text-gray-100">{{ user.name }}</h1>
          <p class="text-gray-600 dark:text-gray-400">{{ user.email }}</p>
        </div>
      </div>

      <!-- Champs d'information de base -->
      <div class="profile-details space-y-4">
        <div>
          <label class="block text-gray-700 dark:text-gray-300">Username</label>
          <input 
            type="text" 
            v-model="user.username" 
            class="mt-1 block w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 rounded-lg dark:border-gray-600" 
            disabled
          />
        </div>
        <div>
          <label class="block text-gray-700 dark:text-gray-300">Location</label>
          <input 
            type="text" 
            v-model="user.location" 
            class="mt-1 block w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 rounded-lg dark:border-gray-600" 
            disabled
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfileView',
  data() {
    return {
      user: {
        name: 'Username',
        email: 'username@example.com',
        username: 'Username',
        location: 'World 🌍',
        avatar: 'https://via.placeholder.com/150', // Image par défaut
      },
    };
  },
};
</script>

<style scoped>
.profile-page {
  position: relative;
  min-height: calc(100vh - 4rem); /* 4rem = hauteur supposée de la navbar */
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #bbbb91; /* Assombrit la page pour le thème clair */
}

.dark .profile-page {
  background-color: #1a1a1a; /* Assombrissement pour le thème sombre */
}

.profile-content {
  z-index: 1; /* Assurez-vous que le contenu soit derrière le message "Coming Soon" */
  max-width: 400px;
  width: 100%;
}

.text-5xl {
  font-size: 3rem;
}

.opacity-50 {
  opacity: 0.5; /* Assombrit le contenu du profil */
}

.absolute {
  z-index: 10;
}
</style>

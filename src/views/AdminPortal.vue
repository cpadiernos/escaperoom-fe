<template>
  <div class="small-container">
    <h1>Admin</h1>
    <nav>
      <router-link class="nav-link" :to="{name: 'admin-games'}">All Games</router-link>
      <router-link class="nav-link" :to="{name: 'admin-puzzles', params: {}}">All Puzzles</router-link>
      <router-link class="nav-link" :to="{name: 'admin-clues', params: {}}">All Clues</router-link>
      <router-link class="nav-link" :to="{name: 'admin-hints', params: {}}">All Hints</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'admin-portal',
}
</script>

<style scoped>
.nav-link {
  padding: 0 20px 0 0;
}
</style>


<template>
  <div class="small-container">
    <h1>Admin</h1>
    <nav>
      <router-link class="nav-link" to="/admin">All Games</router-link>
      <router-link class="nav-link" to="/admin/puzzles">All Puzzles</router-link>
      <router-link class="nav-link" to="/admin/clues">All Clues</router-link>
      <router-link class="nav-link" to="/admin/hints">All Hints</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
</script>

<style scoped>
.nav-link {
  padding: 0 20px 0 0;
}
</style>


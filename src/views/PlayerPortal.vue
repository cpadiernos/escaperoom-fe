<template>
  <div class="small-container">
    <h1>Hint:</h1>
    <p class="hint">{{ hint }}</p>
  </div>
</template>

<script>
  export default {
    name: 'player-portal',
    data() {
      return {
        hint: '',
      }
    },
    sockets: {
      hint(hint) {
        this.hint = hint
      }
    }
  }
</script>

<style scoped>
.hint {
  font-size: 2em;
}
</style>
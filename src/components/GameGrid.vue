<template>
<div>
  <div  v-if="games.length" class="game-grid">
    <div class="game-box" v-for="game in games" :key="game.id">
      <game-box :game="game"/>
    </div>
  </div>
  <div v-else>
    <p>Please add game.</p>
  </div>
</div>
</template>

<script>
import GameBox from "./GameBox.vue"

  export default {
    name: 'game-grid',
    components: {
      GameBox
    },
    props: {
      games: Array,
    },
  }
</script>

<style scoped>
.game-grid {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
}
.game-box {
  border: solid;
  max-width: 49%;
  margin: .2rem;
  min-width: 300px;
  flex-basis: auto;
  flex-grow: 1;
}
</style>
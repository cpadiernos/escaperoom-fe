<template>
<div>
  <div  v-if="games.length" class="game-grid">
    <div class="game-box" v-for="game in games" :key="game.id">
      <game-box
        :game="game"
        @add:event="addEvent"
      />
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
    methods: {
      addEvent(event) {
        this.$emit('add:event', event)
      },
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
  border: 1px solid #ccc;
  max-width: 49%;
  margin: .5rem;
  min-width: 300px;
  flex-basis: auto;
  flex-grow: 1;
  background-color: #ffffff;
  -webkit-box-shadow: 10px 10px 9px -1px rgba(0,0,0,0.25);
  -moz-box-shadow: 10px 10px 9px -1px rgba(0,0,0,0.25);
  box-shadow: 10px 10px 9px -1px rgba(0,0,0,0.25);
}
</style>
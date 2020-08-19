<template>
  <div id="game-form">
    <form @submit.prevent="handleSubmit">
      <label>Game name</label>
      <input v-model="game.name" type="text" />
      <label>Game description</label>
      <input v-model="game.description" type="text" />
      <label>Number of players</label>
      <input v-model="game.numOfPlayers" type="number" />
      <button>Add Game</button>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'game-form',
    data() {
      return {
        game: {
          name: '',
          description: '',
          numOfPlayers: '',
        },
      }
    },
    methods: {
      handleSubmit() {
        this.$emit('add:game', this.game)
      },
    },
  }
</script>
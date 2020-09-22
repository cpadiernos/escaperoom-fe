<template>
  <div id="game-table">
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th># of Players</th>
          <th></th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="game in games" :key="game.id">
          <td>{{ game.name }}</td>
          <td>{{ game.description }}</td>
          <td>{{ game.numOfPlayers }}</td>
          <td>
            <button
              @click="openEditGameModal(game)"
            >
              Edit
            </button>
          </td>
          <td>
            <button
              @click="openDeleteGameModal(game)"
            >
              Delete
            </button>
          </td>
          <td>
            <a
            >
              View Puzzles
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

  export default {
    name: 'game-table',
    data() {
      return {
        game: {},
        isModalVisible: false,
      }
    },
    props: {
      games: Array,
    },
    methods: {
      openEditGameModal(game) {
        this.$emit('open:edit', game)
      },
      openDeleteGameModal(game) {
        this.$emit('open:delete', game)
      }
    },
  }
</script>

<style scoped>
</style>
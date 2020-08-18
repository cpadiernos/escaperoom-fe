<template>
  <div id="game-table">
    <table>
      <thead>
        <tr>
          <th>Game Name</th>
          <th>Description</th>
          <th>Number of Players</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="game in games" :key="game.id">
          <td>{{ game.name }}</td>
          <td>{{ game.description }}</td>
          <td>{{ game.numOfPlayers }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    name: 'game-table',
    props: {
      games: Array,
    }
  }
</script>

<style scoped></style>
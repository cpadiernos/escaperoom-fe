<template>
  <div id="app" class="small-container">
    <h1>Games</h1>
    <game-table :games="games"/>
  </div>
</template>

<script>
import GameTable from './components/GameTable.vue'

export default {
  name: 'app',
  components: {
    GameTable,
  },
  data() {
    return {
      games: [],
    }
  },
  mounted() {
    this.getGames()
  },
  methods: {
    async getGames() {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/games')
        const data = await response.json()
        this.games = data
        data.forEach(game => {
          for (var key of Object.keys(game)) {
            let new_key = key.replace(/_[a-z]/g, function(regexMatch) {
                    if (key.indexOf(regexMatch) == 0) {
                      return regexMatch[1]
                    } else {
                      return regexMatch[1].toUpperCase()
                    }
                  });
            if (new_key != key) {
              game[new_key] = game[key];
              delete game[key];
            }
          }
        });
      } catch (error) {
        console.error(error)
      }
    },
  }
}
</script>

<style>

</style>

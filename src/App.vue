<template>
  <div id="app" class="small-container">
    <h1>Games</h1>
    <game-form @add:game="addGame" />
    <br />
    <game-table :games="games"/>
  </div>
</template>

<script>
import GameTable from './components/GameTable.vue'
import GameForm from './components/GameForm.vue'

export default {
  name: 'app',
  components: {
    GameTable,
    GameForm,
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
    snakeToCamel(str) {
        return str.replace(/_[a-z]/g, function(regexMatch) {
          if (str.indexOf(regexMatch) == 0) {
            return regexMatch[1];
          } else {
            return regexMatch[1].toUpperCase();
          }
        });
    },
    camelToSnake(str) {
      return str.replace(/[A-Z]/g, function(regexMatch) {
        return "_" + regexMatch.toLowerCase();
      });
    },
    convertKeyCase(obj, caseConverter) {
      for (var key of Object.keys(obj)) {
        let new_key = caseConverter(key);
        if (new_key != key) {
          obj[new_key] = obj[key];
          delete obj[key];
        }
      }
    },
    async getGames() {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/games')
        const data = await response.json()
        data.forEach(game => {
          this.convertKeyCase(game, this.snakeToCamel);
        });
        this.games = data;
      } catch (error) {
        console.error(error)
      }
    },
    async addGame(game) {
      try {
        this.convertKeyCase(game, this.camelToSnake);
        const response = await fetch('http://127.0.0.1:5000/api/games' ,{
          method: 'POST',
          body: JSON.stringify(game),
          headers: {'Content-type': 'application/json; charset=UTF=8'}
          });
        const data = await response.json();
        this.convertKeyCase(data, this.snakeToCamel);
        this.games = [...this.games, data];
      } catch (error) {
        console.error(error);
      }
    }
  }
}
</script>

<style>

</style>

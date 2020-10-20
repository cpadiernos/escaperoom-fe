<template>
  <div class="medium-container">
    <br/>
      <h1>Select Game</h1>
      <game-grid
        :games="games"
        @add:event="addEvent"
      />
    <br />
  </div>
</template>

<script>
import GameGrid from '../components/GameGrid.vue'
import caseConversion from '../mixins/caseConversion.js'

export default {
  name: 'gamemaster-portal',
  components: {
    GameGrid,
  },
  mixins: [caseConversion],
  data() {
    return {
      games: [],
      };
  },
  mounted() {
    this.getGames()
  },
  methods: {
    async getGames() {
      try {
        const response = await fetch(process.env.VUE_APP_BASE_URL + '/api/games')
        const data = await response.json()
        data.forEach(game => {
          this.convertKeyCase(game, this.snakeToCamel);
        });
        this.games = data;
      } catch (error) {
        console.error(error)
      }
    },
    async addEvent(event) {
      try {
        this.convertKeyCase(event, this.camelToSnake);
        const response = await fetch(process.env.VUE_APP_BASE_URL + '/api/events' ,{
          method: 'POST',
          body: JSON.stringify(event),
          headers: {'Content-type': 'application/json; charset=UTF=8'}
        });
        const data = await response.json();
        this.convertKeyCase(data, this.snakeToCamel);
        this.$router.push({name: 'hint-portal', params: {game: this.game}})
        this.$socket.emit('event', {status: 'created'})
      } catch (error) {
        console.error(error)
      }
    },
  }
}
</script>
<style scoped>
</style>

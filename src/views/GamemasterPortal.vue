<template>
  <div class="small-container">
    <br/>
    <button
        type="button"
        class="btn"
        @click="showModal"
      >
        Add Game
      </button>

      <modal-box
        v-show="isModalVisible"
        @close="closeModal"
      >
        <div slot="header">
          <h2>Add Game</h2>
        </div>
        <div slot="body">
          <game-form @add:game="addGame" @close="closeModal"/>
        </div>
      </modal-box>
      <h1>Select Game</h1>
      <game-grid :games="games" />
    <br />
  </div>
</template>

<script>
import GameGrid from '../components/GameGrid.vue'
import ModalBox from '../components/ModalBox.vue'
import GameForm from '../components/GameForm.vue'

export default {
  name: 'gamemaster-portal',
  components: {
    GameGrid,
    ModalBox,
    GameForm,
  },
  data() {
    return {
      games: [],
      isModalVisible: false,
      };
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
        this.games = []
      }
    },
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
  }
}
</script>

<style scoped>
</style>

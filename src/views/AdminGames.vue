<template>
  <div>
    <h1>Games</h1>
    <button
        @click="openAddGameModal"
      >
        Add Game
      </button>

      <modal-box
        v-show="isModalVisible"
        @close="closeModal"
      >
        <div slot="header">
          <h2 v-if="!editing">Add Game</h2>
          <h2 v-if="editing">Edit Game</h2>
        </div>
        <div slot="body">
          <game-form
            v-if="!editing" 
            @add:game="addGame"
            :editing="false"
            @clear="clearForm"
            @close="closeModal" />
          <game-form 
            v-if="editing"
            :game="game"
            @edit:game="editGame"
            :editing="true"
            @clear="clearForm"
            @close="closeModal" />
        </div>
      </modal-box>
      <game-table :games="games" @open:edit="openEditGameModal"/>
    <br />
  </div>
</template>

<script>
import GameTable from '../components/GameTable.vue'
import ModalBox from '../components/ModalBox.vue'
import GameForm from '../components/GameForm.vue'

export default {
  name: 'gamemaster-portal',
  components: {
    GameTable,
    ModalBox,
    GameForm,
  },
  data() {
    return {
      games: [],
      isModalVisible: false,
      editing: false,
      game: {},
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
      }
      this.getGames()
    },
    async editGame(game) {
      try {
        this.convertKeyCase(game, this.camelToSnake);
        await fetch('http://127.0.0.1:5000/api/games/' + game.id, {
          method: 'PUT',
          body: JSON.stringify(game),
          headers: {'Content-type': 'application/json; charset=UTF=8'}
        });
      } catch (error) {
        console.error(error)
      }
      this.getGames()
    },
    openAddGameModal() {
      this.editing = false
      this.showModal()
      this.game = {}
    },
    openEditGameModal(game) {
      this.editing = true
      this.showModal()
      this.game = game
    },
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
      this.getGames()
    },
    clearForm() {
      this.game = {}
    },
  }
}
</script>

<style scoped>
</style>


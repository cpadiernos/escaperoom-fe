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
          <h2 v-if="action === 'adding'">Add Game</h2>
          <h2 v-if="action === 'editing'">Edit Game</h2>
          <h2 v-if="action === 'deleting'">Delete Game</h2>
        </div>
        <div slot="body">
          <game-form 
            :game="game"
            @add:game="addGame"
            @edit:game="editGame"
            @delete:game="deleteGame"
            :action="action"
            @clear="clearForm"
            @close="closeModal" />
        </div>
      </modal-box>
      <generic-table
        :items="games"
        @open:edit="openEditGameModal"
        @open:delete="openDeleteGameModal"
        :itemType="itemType"
        :subItems="subItems"
      />
    <br />
  </div>
</template>

<script>
import GameForm from '../components/GameForm.vue'
import GenericTable from '../components/GenericTable.vue'
import ModalBox from '../components/ModalBox.vue'

export default {
  name: 'admin-games',
  components: {
    GameForm,
    GenericTable,
    ModalBox,
  },
  data() {
    return {
      games: [],
      isModalVisible: false,
      action: '',
      game: {},
      itemType: 'game',
      subItems: ['puzzles'],
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
        let newKey = caseConverter(key);
        if (newKey != key) {
          obj[newKey] = obj[key];
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
    async deleteGame(game) {
      try {
        await fetch('http://127.0.0.1:5000/api/games/' + game.id, {
          method: 'DELETE',
        });
      } catch (error) {
        console.error(error)
      }
      this.getGames()
    },
    openAddGameModal() {
      this.action = "adding"
      this.showModal()
      this.game = {}
    },
    openEditGameModal(game) {
      this.action = "editing"
      this.showModal()
      this.game = game
    },
    openDeleteGameModal(game) {
      this.action = "deleting"
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


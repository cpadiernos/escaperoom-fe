<template>
  <div>
    <h1>Games</h1>
    <button class="accent-button"
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
import caseConversion from '../mixins/caseConversion.js'

export default {
  name: 'admin-games',
  components: {
    GameForm,
    GenericTable,
    ModalBox,
  },
  mixins: [caseConversion],
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
    async addGame(game) {
      try {
        this.convertKeyCase(game, this.camelToSnake);
        const response = await fetch(process.env.VUE_APP_BASE_URL + '/api/games' ,{
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
        await fetch(process.env.VUE_APP_BASE_URL + '/api/games' + game.id, {
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
        await fetch(process.env.VUE_APP_BASE_URL + '/api/games' + game.id, {
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


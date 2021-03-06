<template>
  <div>
    <h1 v-if="itemName">{{itemName}} Puzzles</h1>
    <h1 v-else>All Puzzles</h1>
    <button class="accent-button"
      @click="openAddPuzzleModal"
    >
      Add Puzzle
    </button>
    
      <modal-box
        v-show="isModalVisible"
        @close="closeModalandReset"
      >
        <div slot="header">
          <h2 v-if="action === 'adding'">Add Puzzle</h2>
          <h2 v-if="action === 'editing'">Edit Puzzle</h2>
          <h2 v-if="action === 'deleting'">Delete Puzzle</h2>
        </div>
        <div slot="body">
          <puzzle-form 
            :puzzle="puzzle"
            @add:puzzle="addPuzzle"
            @edit:puzzle="editPuzzle"
            @delete:puzzle="deletePuzzle"
            :action="action"
            @clear="clearForm"
            @complete:submission="closeModal" />
        </div>
      </modal-box>
    <generic-table 
      :items="puzzles"
      @open:edit="openEditPuzzleModal"
      @open:delete="openDeletePuzzleModal"
      :itemType="itemType"
      :subItems="subItems"
    />
    <br />
  </div>
</template>

<script>
import GenericTable from "../components/GenericTable.vue"
import ModalBox from "../components/ModalBox.vue"
import PuzzleForm from "../components/PuzzleForm.vue"
import caseConversion from '../mixins/caseConversion.js'

function initialize() {
  return {
    puzzles: [],
    isModalVisible: false,
    action: '',
    puzzle: {},
    itemType: 'puzzle',
    subItems: ['clues', 'hints']
  }
}

export default {
  name: 'admin-puzzles',
  components: {
    GenericTable,
    ModalBox,
    PuzzleForm,
  },
  mixins: [caseConversion],
  props: {
    itemName: String,
    itemId: [String, Number],
    itemTypeProp: String,
  },
  data() {
    return initialize()
  },
  watch: {
    //'$route.path': function() {
    // this.itemId = this.$route.params.itemId
    //},
    itemId: function(newVal) {
      Object.assign(this.$data, initialize());
      this.getPuzzles(newVal)
    },
  },
  mounted() {
    this.getPuzzles(this.itemId)
  },
  methods: {
    async getPuzzles(itemId) {
      try {
        const itemURL = itemId ? this.itemTypeProp + 's/' + itemId + '/' : '';
        const response = await fetch(process.env.VUE_APP_BASE_URL + '/api/' + itemURL + 'puzzles')
        const data = await response.json()
        data.forEach(async puzzle => {
          this.convertKeyCase(puzzle, this.snakeToCamel)
          const response = await fetch(process.env.VUE_APP_BASE_URL + puzzle.links.self )
          const data = await response.json()
          this.convertKeyCase(data, this.snakeToCamel)
          this.puzzles = [...this.puzzles, data]
        });
      } catch (error) {
        console.error(error)
      }
    },
    async addPuzzle(puzzle) {
      try {
        this.convertKeyCase(puzzle, this.camelToSnake);
        await fetch(process.env.VUE_APP_BASE_URL + '/api/puzzles' ,{
          method: 'POST',
          body: JSON.stringify(puzzle),
          headers: {'Content-type': 'application/json; charset=UTF=8'}
          });
      } catch (error) {
        console.error(error);
      }
      Object.assign(this.$data, initialize());
      this.getPuzzles(this.itemId)
    },
    async editPuzzle(puzzle) {
      try {
        this.convertKeyCase(puzzle, this.camelToSnake);
        await fetch(process.env.VUE_APP_BASE_URL + '/api/puzzles/' + puzzle.id, {
          method: 'PUT',
          body: JSON.stringify(puzzle),
          headers: {'Content-type': 'application/json; charset=UTF=8'}
        });
      } catch (error) {
        console.error(error)
      }
      Object.assign(this.$data, initialize());
      this.getPuzzles(this.itemId)
    },
    async deletePuzzle(puzzle) {
      try {
        await fetch(process.env.VUE_APP_BASE_URL + '/api/puzzles/' + puzzle.id, {
          method: 'DELETE',
        });
      } catch (error) {
        console.error(error)
      }
      Object.assign(this.$data, initialize());
      this.getPuzzles(this.itemId)
    },
    openAddPuzzleModal() {
      this.action = "adding"
      this.showModal()
      this.puzzle = {}
    },
    openEditPuzzleModal(puzzle) {
      this.action = "editing"
      this.showModal()
      this.puzzle = puzzle
    },
    openDeletePuzzleModal(puzzle) {
      this.action = "deleting"
      this.showModal()
      this.puzzle = puzzle
    },
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    closeModalandReset() {
      this.isModalVisible = false;
      Object.assign(this.$data, initialize());
      this.getPuzzles(this.itemId)
    },
    clearForm() {
      this.puzzle = {}
    },
  }
}
</script>

<style scoped>
</style>
<template>
  <div>
    <h1 v-if="itemName">{{itemName}} Clues</h1>
    <h1 v-else>All Clues</h1>
    <button class="accent-button"
      @click="openAddClueModal"
    >
      Add Clue
    </button>
    
      <modal-box
        v-show="isModalVisible"
        @close="closeModalAndReset"
      >
        <div slot="header">
          <h2 v-if="action === 'adding'">Add Clue</h2>
          <h2 v-if="action === 'editing'">Edit Clue</h2>
          <h2 v-if="action === 'deleting'">Delete Clue</h2>
        </div>
        <div slot="body">
          <clue-form 
            :clue="clue"
            @add:clue="addClue"
            @edit:clue="editClue"
            @delete:clue="deleteClue"
            :action="action"
            @clear="clearForm"
            @complete:submission="closeModal" />
        </div>
      </modal-box>
    <generic-table 
      :items="clues"
      @open:edit="openEditClueModal"
      @open:delete="openDeleteClueModal"
      :itemType="itemType"
      :subItems="subItems"
    />
    <br />
  </div>
</template>

<script>
import GenericTable from "../components/GenericTable.vue"
import ModalBox from "../components/ModalBox.vue"
import ClueForm from "../components/ClueForm.vue"
import caseConversion from '../mixins/caseConversion.js'

function initialize() {
  return {
    clues: [],
    isModalVisible: false,
    action: '',
    clue: {},
    itemType: 'clue',
    subItems: []
  }
}

export default {
  name: 'admin-clues',
  components: {
    GenericTable,
    ModalBox,
    ClueForm,
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
      this.getClues(newVal)
    },
  },
  mounted() {
    this.getClues(this.itemId)
  },
  methods: {
    async getClues(itemId) {
      try {
        const itemURL = itemId ? this.itemTypeProp + 's/' + itemId + '/' : '';
        const response = await fetch(process.env.VUE_APP_BASE_URL + '/api/' + itemURL + 'clues')
        const data = await response.json()
        data.forEach(async clue => {
          this.convertKeyCase(clue, this.snakeToCamel)
          const response = await fetch(process.env.VUE_APP_BASE_URL + clue.links.self )
          const data = await response.json()
          this.convertKeyCase(data, this.snakeToCamel)
          this.clues = [...this.clues, data]
        });
      } catch (error) {
        console.error(error)
      }
    },
    async addClue(clue) {
      try {
        this.convertKeyCase(clue, this.camelToSnake);
        await fetch(process.env.VUE_APP_BASE_URL + '/api/clues' ,{
          method: 'POST',
          body: JSON.stringify(clue),
          headers: {'Content-type': 'application/json; charset=UTF=8'}
          });
      } catch (error) {
        console.error(error);
      }
      Object.assign(this.$data, initialize());
      this.getClues(this.itemId)
    },
    async editClue(clue) {
      try {
        this.convertKeyCase(clue, this.camelToSnake);
        await fetch(process.env.VUE_APP_BASE_URL + '/api/clues/' + clue.id, {
          method: 'PUT',
          body: JSON.stringify(clue),
          headers: {'Content-type': 'application/json; charset=UTF=8'}
        });
      } catch (error) {
        console.error(error)
      }
      Object.assign(this.$data, initialize());
      this.getClues(this.itemId)
    },
    async deleteClue(clue) {
      try {
        await fetch(process.env.VUE_APP_BASE_URL + '/api/clues/' + clue.id, {
          method: 'DELETE',
        });
      } catch (error) {
        console.error(error)
      }
      Object.assign(this.$data, initialize());
      this.getClues(this.itemId)
    },
    openAddClueModal() {
      this.action = "adding"
      this.showModal()
      this.clue = {}
    },
    openEditClueModal(clue) {
      this.action = "editing"
      this.showModal()
      this.clue = clue
    },
    openDeleteClueModal(clue) {
      this.action = "deleting"
      this.showModal()
      this.clue = clue
    },
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    closeModalAndReset() {
      this.isModalVisible = false;
      Object.assign(this.$data, initialize());
      this.getClues(this.itemId)
    },
    clearForm() {
      this.clue = {}
    },
  }
}
</script>

<style scoped>
</style>
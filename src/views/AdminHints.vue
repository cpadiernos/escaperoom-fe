<template>
  <div>
    <h1 v-if="itemName">{{itemName}} Hints</h1>
    <h1 v-else>All Hints</h1>
    <button class="accent-button"
      @click="openAddHintModal"
    >
      Add Hint
    </button>
    
      <modal-box
        v-show="isModalVisible"
        @close="closeModalAndReset"
      >
        <div slot="header">
          <h2 v-if="action === 'adding'">Add Hint</h2>
          <h2 v-if="action === 'editing'">Edit Hint</h2>
          <h2 v-if="action === 'deleting'">Delete Hint</h2>
        </div>
        <div slot="body">
          <hint-form 
            :hint="hint"
            @add:hint="addHint"
            @edit:hint="editHint"
            @delete:hint="deleteHint"
            :action="action"
            @clear="clearForm"
            @complete:submission="closeModal" />
        </div>
      </modal-box>
    <generic-table 
      :items="hints"
      @open:edit="openEditHintModal"
      @open:delete="openDeleteHintModal"
      :itemType="itemType"
      :subItems="subItems"
    />
    <br />
  </div>
</template>

<script>
import GenericTable from "../components/GenericTable.vue"
import ModalBox from "../components/ModalBox.vue"
import HintForm from "../components/HintForm.vue"
import caseConversion from '../mixins/caseConversion.js'

function initialize() {
  return {
    hints: [],
    isModalVisible: false,
    action: '',
    hint: {},
    itemType: 'hint',
    subItems: []
  }
}

export default {
  name: 'admin-hints',
  components: {
    GenericTable,
    ModalBox,
    HintForm,
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
      this.getHints(newVal)
    },
  },
  mounted() {
    this.getHints(this.itemId)
  },
  methods: {
    async getHints(itemId) {
      try {
        const itemURL = itemId ? this.itemTypeProp + 's/' + itemId + '/' : '';
        const response = await fetch(process.env.VUE_APP_BASE_URL + '/api/' + itemURL + 'hints')
        const data = await response.json()
        data.forEach(async hint => {
          this.convertKeyCase(hint, this.snakeToCamel)
          const response = await fetch(process.env.VUE_APP_BASE_URL + hint.links.self )
          const data = await response.json()
          this.convertKeyCase(data, this.snakeToCamel)
          this.hints = [...this.hints, data]
        });
      } catch (error) {
        console.error(error)
      }
    },
    async addHint(hint) {
      try {
        this.convertKeyCase(hint, this.camelToSnake);
        await fetch(process.env.VUE_APP_BASE_URL + '/api/hints' ,{
          method: 'POST',
          body: JSON.stringify(hint),
          headers: {'Content-type': 'application/json; charset=UTF=8'}
          });
      } catch (error) {
        console.error(error);
      }
      Object.assign(this.$data, initialize());
      this.getHints(this.itemId)
    },
    async editHint(hint) {
      try {
        this.convertKeyCase(hint, this.camelToSnake);
        await fetch(process.env.VUE_APP_BASE_URL + '/api/hints/' + hint.id, {
          method: 'PUT',
          body: JSON.stringify(hint),
          headers: {'Content-type': 'application/json; charset=UTF=8'}
        });
      } catch (error) {
        console.error(error)
      }
      Object.assign(this.$data, initialize());
      this.getHints(this.itemId)
    },
    async deleteHint(hint) {
      try {
        await fetch(process.env.VUE_APP_BASE_URL + '/api/hints/' + hint.id, {
          method: 'DELETE',
        });
      } catch (error) {
        console.error(error)
      }
      Object.assign(this.$data, initialize());
      this.getHints(this.itemId)
    },
    openAddHintModal() {
      this.action = "adding"
      this.showModal()
      this.hint = {}
    },
    openEditHintModal(hint) {
      this.action = "editing"
      this.showModal()
      this.hint = hint
    },
    openDeleteHintModal(hint) {
      this.action = "deleting"
      this.showModal()
      this.hint = hint
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
      this.getHints(this.itemId)
    },
    clearForm() {
      this.hint = {}
    },
  }
}
</script>

<style scoped>
</style>
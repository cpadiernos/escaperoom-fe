<template>
  <div class="game-container">
    <div class="game-section">
      <h2>{{ game.name }}</h2>
      {{ game.description }}<br/><br/>
      Players Max: {{ game.numOfPlayers }}<br/>
    </div>
    <div class="game-section">
    <button
      type="button"
      class="btn"
      @click="showModal"
    >
      Select
    </button>
    </div>
    <modal-box
      v-show="isModalVisible"
      @close="closeModal"
    >
      <h4 slot="header">{{ game.name }}</h4>
      <event-form
        slot="body"
        :game="game"
        @add:event="addEvent"
      />
    </modal-box>
  </div>
</template>

<script>
import ModalBox from './ModalBox.vue';
import EventForm from './EventForm.vue'

export default {
  name: 'game-box',
  components: {
    ModalBox,
    EventForm,
  },
  props: {
    game: Object,
  },
  data() {
    return {
      isModalVisible: false,
    }
  },
  methods: {
    addEvent(event) {
      this.$emit('add:event', event)
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
.game-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.game-section {
  text-align: center;
  padding: 5px;
}
</style>
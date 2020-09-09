<template>
  <div class="puzzle-bin">
    <slot name="header"></slot>
    <div v-for="puzzle in puzzles" :key="puzzle.id">
      <puzzle-box @select:puzzle="selectPuzzle" :puzzle="puzzle">
        <div class="hint" slot="hints-section">
          <div v-for="hint in puzzle.hints" :key="hint.id">{{ hint.text }}
          <button
            class="hint"
            @click="sendHint(hint.text)"
          >
            Send
          </button>
          </div>
        </div>
      </puzzle-box>
    </div>
  </div>
</template>

<script>
import PuzzleBox from './PuzzleBox.vue'

  export default {
    name: 'puzzle-grid',
    components: {
      PuzzleBox,
    },
    props: {
      puzzles: Array,
    },
    methods: {
      selectPuzzle(puzzle) {
        this.$emit('select:puzzle', puzzle)
      },
      sendHint(hint) {
        this.$emit('send:hint', hint)
      },
    },
  }
</script>

<style scoped>
.puzzle-bin {
  margin: 5px;
  min-width: 230px;
  text-align: center;
  border: solid grey;
  min-height: 250px;
}
button.hint {
  background-color: green;
  border: 0px;
}
.hint {
  background: lightgrey;
}
</style>
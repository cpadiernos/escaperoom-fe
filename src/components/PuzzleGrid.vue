<template>
  <div class="puzzle-bin">
    <slot name="header"></slot>
    <div v-for="puzzle in puzzles" :key="puzzle.id">
      <puzzle-box @select:puzzle="selectPuzzle" :puzzle="puzzle">
        <div slot="hints-section">
          <div class="hint" v-for="hint in puzzle.hints" :key="hint.id">{{ hint.text }}<br/>
          <button class="accent-button"
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
  margin: .5rem;
  min-width: 230px;
  text-align: center;
  background-color: #e9e9ec;
  min-height: 250px;
  border: 1px solid #ccc;
}

.hint {
  background: #fbf5d2;
  padding: .5rem;
}
</style>
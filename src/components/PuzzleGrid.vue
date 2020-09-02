<template>
  <div class="puzzle-bin">
    <slot name="header"></slot>
    <div v-for="puzzle in puzzles" :key="puzzle.id">
      <puzzle-box @select:puzzle="selectPuzzle" :puzzle="puzzle"/>
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
      }
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
</style>
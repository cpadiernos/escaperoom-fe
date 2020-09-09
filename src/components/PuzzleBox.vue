<template>
  <div class="puzzle-box">
    <div class="puzzle-section">
    {{ puzzle.name }}<br/>
    {{ puzzle.code }}<br/>
    <button
      @click="selectPuzzle"
    >Select</button>
    <slot name="hints-section"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'puzzle-box',
    props: {
      puzzle: Object,
    },
    methods: {
      selectPuzzle() {
        this.$emit('select:puzzle', this.puzzle)
      }
    },
  }
</script>

<style scoped>
.puzzle-box {
  border: solid;
  margin: 10px;
  min-width: 120px;
  max-width: 220px;
}
.puzzle-section {
  text-align: center;
}
</style>
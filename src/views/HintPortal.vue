<template>
  <div class="small-container">
    <h1>{{ game.name }}</h1>
    <!--<input type="text" />-->
    <!--<button>Send Hint</button>-->
    <div v-if="puzzles.length"  class="puzzle-nav" >
      <div v-for="puzzle in puzzles" :key="puzzle.id" >
        <puzzle-box @select:puzzle="selectPuzzle" :puzzle="puzzle"/>
      </div>
    </div>
    <div v-else>
      <p>Please add puzzles.</p>
    </div>
    <div class="puzzle-grid">
      <puzzle-grid 
        @send:hint="sendHint"
        @select:puzzle="selectPuzzle"
        :puzzles="beforePuzzles">
        <h4 slot="header">Before Puzzles</h4>
      </puzzle-grid>
      <puzzle-grid
        @send:hint="sendHint"
        @select:puzzle="selectPuzzle"
        :puzzles="selectedPuzzle">
        <h4 slot="header">Selected Puzzle</h4>
      </puzzle-grid>
      <puzzle-grid
        @send:hint="sendHint"
        @select:puzzle="selectPuzzle"
        :puzzles="afterPuzzles">
        <h4 slot="header">After Puzzles</h4>
      </puzzle-grid>
    </div>
  </div>
</template>

<script>
import PuzzleGrid from '../components/PuzzleGrid.vue'
import PuzzleBox from '../components/PuzzleBox.vue'

export default {
  name: 'hint-portal',
  components: {
    PuzzleGrid,
    PuzzleBox,
  },
  props: {
    game: Object,
  },
  data() {
    return {
      puzzles: [],
      selectedPuzzle: [],
      beforePuzzles: [],
      afterPuzzles: [],
    }
  },
  mounted() {
    this.getPuzzles()
  },
  methods: {
    sendHint(hint) {
      this.$socket.emit('hint', {hint: hint})
    },
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
        let new_key = caseConverter(key);
        if (new_key != key) {
          obj[new_key] = obj[key];
          delete obj[key];
        }
      }
    },
    async getPuzzles() {
      try {
        const response = await fetch('http://127.0.0.1:5000' + this.game.links.self )
        const data = await response.json()
        data.puzzles.forEach( async puzzle => {
          this.convertKeyCase(puzzle, this.snakeToCamel)
          const response = await fetch('http://127.0.0.1:5000' + puzzle.links.self )
          const data = await response.json()
          this.puzzles = [...this.puzzles, data]
        })
      } catch (error) {
        console.error(error)
      }
    },
    async selectPuzzle(puzzle) {
      this.beforePuzzles = []
      this.afterPuzzles = []
      this.selectedPuzzle = [puzzle]
      this.convertKeyCase(puzzle, this.snakeToCamel)
      const resBefore = await fetch('http://127.0.0.1:5000' + puzzle.links.self + '/before-puzzles')
      const dataBefore = await resBefore.json()
      dataBefore.forEach( async puzzle => {
        this.convertKeyCase(puzzle, this.snakeToCamel)
        const response = await fetch('http://127.0.0.1:5000' + puzzle.links.self)
        const data = await response.json()
        this.beforePuzzles = [...this.beforePuzzles, data]
      })
      const resAfter = await fetch('http://127.0.0.1:5000' + puzzle.links.self + '/after-puzzles')
      const dataAfter = await resAfter.json()
      dataAfter.forEach( async puzzle => {
        this.convertKeyCase(puzzle, this.snakeToCamel)
        const response = await fetch('http://127.0.0.1:5000' + puzzle.links.self)
        const data = await response.json()
        this.afterPuzzles = [...this.afterPuzzles, data]
      })
    },
  }
}
</script>

<style scoped>
.puzzle-nav {
  display: flex;
  justify-content: center;
  flex-flow: row wrap;
}
.puzzle-grid {
  display: flex;
  justify-content: center;
  flex-flow: row wrap;
}
</style>
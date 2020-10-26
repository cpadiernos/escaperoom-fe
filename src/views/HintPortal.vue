<template>
  <div class="medium-container">
    <h1>{{ game.name }}<base-timer :time-left="timeLeft"/></h1>
    <input ref="input" type="text" id="custom-hint"/>
    <button 
      class="accent-button"
      @click="sendCustomHint"
      >
      Send Hint
    </button>
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
import BaseTimer from '../components/BaseTimer.vue'
import caseConversion from '../mixins/caseConversion.js'

export default {
  name: 'hint-portal',
  components: {
    PuzzleGrid,
    PuzzleBox,
    BaseTimer,
  },
  mixins: [caseConversion],
  data() {
    return {
      puzzles: [],
      selectedPuzzle: [],
      beforePuzzles: [],
      afterPuzzles: [],
      timerInterval: null,
      timeLimit: null,
      timePassed: 0,
      game: {},
    }
  },
  computed: {
    timeLeft() {
      return this.timeLimit - this.timePassed
    }
  },
  mounted() {
    this.getEvent()
  },
  methods: {
    startTimer() {
      this.timerInterval = setInterval(() => (this.timePassed += 1), 1000)
    },
    sendCustomHint() {
      const hint = document.getElementById('custom-hint').value
      this.$socket.emit('hint', {hint: hint})
      this.$refs.input.focus()
      document.getElementById('custom-hint').value = ""
    },
    sendHint(hint) {
      this.$socket.emit('hint', {hint: hint})
    },
    async getEvent() {
      try {
        const response = await fetch(process.env.VUE_APP_BASE_URL + '/api/events/active' )
        const data = await response.json()
        this.convertKeyCase(data, this.snakeToCamel)
        this.getGame(data.gameId)
        this.getTimeLimit(data.endTime)
      } catch (error) {
        console.error(error)
      }
    },
    async getGame(gameId) {
      try {
        const response = await fetch(process.env.VUE_APP_BASE_URL + '/api/games/' + gameId)
        const data = await response.json()
        this.convertKeyCase(data, this.snakeToCamel)
        this.game = data
        this.getPuzzles()
      } catch (error) {
        console.error(error)
      }
    },
    getTimeLimit(endTime) {
        const endHrs = endTime.split(':')[0]
        const endMins = endTime.split(':')[1]
        const endSecs = endTime.split(':')[2]
        const endMs = (endHrs * 60 * 60 * 1000)
          + (endMins * 60 * 1000)
          + (endSecs * 1000);
        const today = new Date();
        const currentMs = ((endHrs - 1) * 60 * 60 * 1000)
          + (today.getMinutes() * 60  * 1000)
          + (today.getSeconds() * 1000);
        this.timeLimit = (endMs - currentMs)/(1000)
        this.timePassed = 0
        this.startTimer()
    },
    async getPuzzles() {
      try {
        const response = await fetch(process.env.VUE_APP_BASE_URL + this.game.links.self )
        const data = await response.json()
        data.puzzles.forEach( async puzzle => {
          this.convertKeyCase(puzzle, this.snakeToCamel)
          const response = await fetch(process.env.VUE_APP_BASE_URL + puzzle.links.self )
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
      const resBefore = await fetch(process.env.VUE_APP_BASE_URL + puzzle.links.self + '/before-puzzles')
      const dataBefore = await resBefore.json()
      dataBefore.forEach( async puzzle => {
        this.convertKeyCase(puzzle, this.snakeToCamel)
        const response = await fetch(process.env.VUE_APP_BASE_URL + puzzle.links.self)
        const data = await response.json()
        this.beforePuzzles = [...this.beforePuzzles, data]
      })
      const resAfter = await fetch(process.env.VUE_APP_BASE_URL + puzzle.links.self + '/after-puzzles')
      const dataAfter = await resAfter.json()
      dataAfter.forEach( async puzzle => {
        this.convertKeyCase(puzzle, this.snakeToCamel)
        const response = await fetch(process.env.VUE_APP_BASE_URL + puzzle.links.self)
        const data = await response.json()
        this.afterPuzzles = [...this.afterPuzzles, data]
      })
    },
  },
}
</script>

<style scoped>
input {
  background-color: #ffffff;
}

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
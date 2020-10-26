<template>
  <div class="medium-container">
    <h1><base-timer :time-left="timeLeft"/></h1>
    <h1>Hint:</h1>
    <p class="hint">{{ hint }}</p>
  </div>
</template>

<script>
import BaseTimer from '../components/BaseTimer.vue'
import caseConversion from '../mixins/caseConversion.js'

  export default {
    name: 'player-portal',
    components: {
      BaseTimer,
    },
    mixins: [caseConversion],
    data() {
      return {
        hint: '',
        timerInterval: null,
        timeLimit: null,
        timePassed: null,
      }
    },
    computed: {
      timeLeft() {
        return this.timeLimit - this.timePassed
      }
    },
    sockets: {
      hint(hint) {
        this.hint = hint
      },
      event(status) {
        if (status == "created") {
          this.getEvent()
        }
      }
    },
    mounted() {
      this.getEvent()
    },
    methods: {
      startTimer() {
        this.timerInterval = setInterval(() => (this.timePassed += 1), 1000)
      },
      async getEvent() {
        try {
          const response = await fetch(process.env.VUE_APP_BASE_URL + '/api/events/active' )
          const data = await response.json()
          this.convertKeyCase(data, this.snakeToCamel)
          this.getTimeLimit(data.endTime)
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
    },
  }
</script>

<style scoped>
.hint {
  font-size: 2em;
}
</style>
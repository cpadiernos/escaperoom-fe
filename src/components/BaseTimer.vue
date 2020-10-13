<template>
  <div class="timer">
    <span class="timer-info">
      {{ formattedTimeLeft }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'base-timer',
  props: {
    timeLeft: {
      type: Number,
      required: true
    }
  },
  computed: {
    formattedTimeLeft() {
      const timeLeft = this.timeLeft
      const minutes = Math.floor(timeLeft / 60)
      let seconds = timeLeft % 60
      if (seconds < 10) {
        seconds = `0${seconds}`
      }
      if (timeLeft < 0) {
        return '0:00'
      }
      return `${minutes}:${seconds}`
    }
  }
}
</script>

<style scoped>
.timer {
  float: right;
}

.timer-info {
  font-size: 2rem;
}
</style>
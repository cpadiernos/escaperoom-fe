<template>
  <div id="event-form">
    <form @submit.prevent="handleSubmit">
      <label>How many players? (Max {{ game.numOfPlayers }})</label>
      <input
        v-model="event.numOfPlayers"
        type="number"
        :class="{ 'has-error': submitting && invalidNumOfPlayers }"
      />
      <p v-if="error && submitting" class="error-message">
        Please enter a number from 1 to {{ game.numOfPlayers }}.
      </p>
      <button>Start Game!</button>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'event-form',
    props: {
      game: Object,
    },
    data() {
      return {
        submitting: false,
        error: false,
        success: false,
        event: {
          gameId: this.game.id,
          numOfPlayers: '',
        },
      }
    },
    computed: {
      invalidNumOfPlayers() {
        return (this.event.numOfPlayers <= 0)
          || (this.event.numOfPlayers > this.game.numOfPlayers)
      }
    },
    methods: {
      handleSubmit() {
        this.submitting = true
        this.clearStatus()
        
        if (
          this.invalidNumOfPlayers
        ) { this.error = true; return}
        
        this.$emit('add:event', this.event)
        this.$emit('close')
      },
      clearStatus() {
        this.error = false
        this.success = false
      }
    },
  }
</script>

<style scoped>
  form {
    margin-bottom: 2rem;
  }
  
  [class*='-message'] {
    font-weight: 500;
  }
  
  .error-message {
    color: red;
  }
  
  .success-message {
    color: green;
  }
</style>
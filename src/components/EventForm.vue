<template>
  <div id="event-form">
    <form @submit.prevent="handleSubmit">
      <label>How many players? (Max {{ game.numOfPlayers }})</label>
      <input
        v-model="gameInstance.numOfPlayers"
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
        gameInstance: {
          numOfPlayers: '',
        },
      }
    },
    computed: {
      invalidNumOfPlayers() {
        return (this.gameInstance.numOfPlayers <= 0)
          || (this.gameInstance.numOfPlayers > this.game.numOfPlayers)
      }
    },
    methods: {
      handleSubmit() {
        this.submitting = true
        this.clearStatus()
        
        if (
          this.invalidNumOfPlayers
        ) { this.error = true; return}
          
        this.$router.push({name: 'hint-portal', params: {game: this.game}})
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
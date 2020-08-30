<template>
  <div id="game-form">
    <form @submit.prevent="handleSubmit">
      <label>Game name</label>
      <input
        v-model="game.name"
        type="text"
        :class="{ 'has-error': submitting && invalidName }"
        @focus="clearStatus"
        @keypress="clearStatus"
        ref="first"
      />
      <label>Game description</label>
      <input
        v-model="game.description"
        type="text"
        :class="{ 'has-error': submitting && invalidDescription }"
        @focus="clearStatus"
      />
      <label>Number of players</label>
      <input
        v-model="game.numOfPlayers"
        type="number"
        :class="{ 'has-error': submitting && invalidNumOfPlayers }"
      />
      <p v-if="error && submitting" class="error-message">
        Please fill out all the required fields.
      </p>
      <button>Add Game</button>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'game-form',
    data() {
      return {
        submitting: false,
        error: false,
        success: false,
        game: {
          name: '',
          description: '',
          numOfPlayers: '',
        },
      }
    },
    computed: {
      invalidName() {
        return this.game.name === ''
      },
      invalidDescription() {
        return this.game.description === ''
      },
      invalidNumOfPlayers() {
        return this.game.numOfPlayers <= 0
      }
    },
    methods: {
      handleSubmit() {
        this.submitting = true
        this.clearStatus()
        
        if (
          this.invalidName ||
          this.invalidDescription ||
          this.invalidNumOfPlayers
        ) { this.error = true; return}
          
        this.$emit('add:game', this.game)
        this.$emit('close')
        this.$refs.first.focus()
        this.game = {
          name: '',
          description: '',
          numOfPlayers: '',
        }
        this.error = false
        this.success = true
        this.submitting = false
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
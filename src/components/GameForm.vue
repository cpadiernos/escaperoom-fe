<template>
  <div id="game-form">
    <form
      v-if="action === 'adding' || action === 'editing'"
      @submit.prevent="handleSubmit"
      >
      <label>Game name</label>
      <input
        v-model="game.name"
        type="text"
        :class="{ 'has-error': submitting && invalidName }"
      />
      <label>Game description</label>
      <input
        v-model="game.description"
        type="text"
        :class="{ 'has-error': submitting && invalidDescription }"
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
      <button v-if="action === 'adding'">Add</button>
      <button v-if="action === 'editing'">Update</button>
    </form>
    <form v-else
      @submit.prevent="handleSubmit"
      >
      <p>Are you sure you want to delete <span class="thick">{{ game.name }}</span>?</p>
      <button>Yes, Delete</button>
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
      }
    },
    props: {
      game: {
        type: Object,
        default: () => ({ 
          name: '',
          description: '',
          numOfPlayers: '',
        })
      },
      action: String,
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
          
        if (this.action === "editing") {
          this.$emit('edit:game', this.game)
        } else if (this.action === "adding") {
          this.$emit('add:game', this.game)
        } else if (this.action === "deleting") {
          this.$emit('delete:game', this.game)
        }

        this.$emit('close')
        this.$emit('clear')
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
  
  .thick {
    font-weight: bold;
  }
</style>
<template>
  <div id="puzzle-form">
    <form
      v-if="action === 'adding' || action === 'editing'"
      @submit.prevent="handleSubmit"
      >
      <label>Puzzle name</label>
      <input
        v-model="puzzle.name"
        type="text"
        :class="{ 'has-error': submitting && invalidName }"
      />
      <label>Puzzle code</label>
      <input
        v-model="puzzle.code"
        type="text"
        :class="{ 'has-error': submitting && invalidCode }"
      />
      <label>Game Id</label>
      <input
        v-model="puzzle.gameId"
        type="number"
        :class="{ 'has-error': submitting && invalidGameId }"
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
      <p>Are you sure you want to delete <span class="thick">{{ puzzle.name }}</span>?</p>
      <button>Yes, Delete</button>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'puzzle-form',
    data() {
      return {
        submitting: false,
        error: false,
        success: false,
      }
    },
    props: {
      puzzle: Object,
      action: String,
    },
    computed: {
      invalidName() {
        return !this.puzzle.name || /^\s*$/.test(this.puzzle.name)
      },
      invalidCode() {
        return !this.puzzle.code || /^\s*$/.test(this.puzzle.code)
      },
      invalidGameId() {
        return !this.puzzle.gameId || this.puzzle.gameId <= 0
      }
    },
    watch: {
      puzzle: function() {
        this.submitting = false
        this.clearStatus()
      },
    },
    methods: {
      handleSubmit() {
        this.submitting = true
        this.clearStatus()
        
        if (
          this.invalidName ||
          this.invalidCode ||
          this.invalidGameId
        ) {this.error = true; return}
          
        if (this.action === "editing") {
          this.$emit('edit:puzzle', this.puzzle)
        } else if (this.action === "adding") {
          this.$emit('add:puzzle', this.puzzle)
        } else if (this.action === "deleting") {
          this.$emit('delete:puzzle', this.puzzle)
        }

        this.$emit('complete:submission')
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
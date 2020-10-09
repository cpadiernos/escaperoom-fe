<template>
  <div id="hint-form">
    <form
      v-if="action === 'adding' || action === 'editing'"
      @submit.prevent="handleSubmit"
      >
      <label>Hint text</label>
      <input
        v-model="hint.text"
        type="text"
        :class="{ 'has-error': submitting && invalidText }"
      />
      <label>Puzzle Id</label>
      <input
        v-model="hint.puzzleId"
        type="number"
        :class="{ 'has-error': submitting && invalidPuzzleId }"
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
      <p>Are you sure you want to delete <span class="thick">{{ hint.text }}</span>?</p>
      <button>Yes, Delete</button>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'hint-form',
    data() {
      return {
        submitting: false,
        error: false,
        success: false,
      }
    },
    props: {
      hint: Object,
      action: String,
    },
    computed: {
      invalidText() {
        return !this.hint.text || /^\s*$/.test(this.hint.text)
      },
      invalidPuzzleId() {
        return !this.hint.puzzleId || this.hint.puzzleId <= 0
      },
    },
    watch: {
      hint: function() {
        this.submitting = false
        this.clearStatus()
      },
    },
    methods: {
      handleSubmit() {
        this.submitting = true
        this.clearStatus()
        
        if (
            this.invalidText ||
            this.invalidPuzzleId
        ) {this.error = true; return}
          
        if (this.action === "editing") {
          this.$emit('edit:hint', this.hint)
        } else if (this.action === "adding") {
          this.$emit('add:hint', this.hint)
        } else if (this.action === "deleting") {
          this.$emit('delete:hint', this.hint)
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
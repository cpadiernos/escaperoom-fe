<template>
  <div id="clue-form">
    <form
      v-if="action === 'adding' || action === 'editing'"
      @submit.prevent="handleSubmit"
      >
      <label>Clue name</label>
      <input
        v-model="clue.name"
        type="text"
        :class="{ 'has-error': submitting && invalidName }"
      />
      <label>Clue needer</label>
      <input
        v-model="clue.needer"
        type="number"
        :class="{ 'has-error': submitting && invalidNeeder }"
      />
      <label>Clue holder</label>
      <input
        v-model="clue.holder"
        type="number"
        :class="{ 'has-error': submitting && invalidHolder }"
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
      <p>Are you sure you want to delete <span class="thick">{{ clue.name }}</span>?</p>
      <button>Yes, Delete</button>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'clue-form',
    data() {
      return {
        submitting: false,
        error: false,
        success: false,
      }
    },
    props: {
      clue: Object,
      action: String,
    },
    computed: {
      invalidName() {
        return !this.clue.name || /^\s*$/.test(this.clue.name)
      },
      invalidHolder() {
        return !this.clue.holder || this.clue.gameId <= 0
      },
      invalidNeeder() {
        return !this.clue.needer || this.clue.gameId <= 0
      }
    },
    watch: {
      clue: function() {
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
          this.invalidHolder ||
          this.invalidNeeder
        ) {this.error = true; return}
          
        if (this.action === "editing") {
          this.$emit('edit:clue', this.clue)
        } else if (this.action === "adding") {
          this.$emit('add:clue', this.clue)
        } else if (this.action === "deleting") {
          this.$emit('delete:clue', this.clue)
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
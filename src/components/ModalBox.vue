<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal">
        <header class="modal-header">
          <slot name="header"></slot>
            <button
              type="button"
              class="btn-close"
              @click="close"
            >
              x
            </button>
        </header>
        
        <section class="modal-body">
          <slot name="body">
          </slot>
        </section>
        
        <footer class="modal-footer">
          <slot name="footer">
            <button
              type="button"
              class="btn-red"
              @click="close"
            >
              Close
            </button>
          </slot>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'modal-box',
    methods: {
      close() {
        this.$emit('close');
      },
    },
  };
</script>

<style scoped>
  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    min-width: 50%;
  }

  .modal-header,
  .modal-footer {
    padding: 10px 10px 8px 15px;
    display: flex;
  }

  .modal-header {
    border-bottom: 1px solid #eeeeee;
    justify-content: space-between;
  }

  .modal-footer {
    border-top: 1px solid #eeeeee;
    justify-content: flex-end;
  }

  .modal-body {
    position: relative;
    padding: 30px 15px;
  }

  .btn-close {
    border: none;
    font-size: 20px;
    cursor: pointer;
    font-weight: bold;
    color: #404040;
    background: transparent;
  }

  .btn-red {
    color: white;
    background: red;
    border: 1px solid red;
  }
  
  .modal-fade-enter,
  .modal-fade-leave-active {
    opacity: 0;
  }

  .modal-fade-enter-active,
  .modal-fade-leave-active {
    transition: opacity .5s ease
  }
</style>
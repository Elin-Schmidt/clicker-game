<!-- Options API -->

<template>
  <header><h1>Welcome to the Clicker Game!</h1></header>
  <main>
    <section>
      <Heart :progress="totalProgress" />
    </section>
    <section id="clicker-button">
      <ClickerButton
        id="button1"
        :initial-style="defaultButtonStyle"
        :disabled="isFirstButtonDisabled"
        :change-text-at-max="true"
        :max-count="firstMaxCount"
        @count-reached="firstButtonAction"
      />
      <ClickerButton
        id="button2"
        :initial-style="defaultButtonStyle"
        :disabled="isSecondButtonDisabled"
        :change-text-at-max="true"
        :max-count="secondMaxCount"
        @count-reached="secondButtonAction"
      />
    </section>
  </main>
</template>

<script>
  import ClickerButton from '../components/ClickerButton.vue'
  import Heart from '../components/HeartComponent.vue'
  import { useHeartStore } from '../stores/heartStore'

  export default {
    components: {
      ClickerButton,
      Heart
    },
    data() {
      return {
        defaultButtonStyle: {
          backgroundColor: '#ad615d',
          color: '#fff',
          borderRadius: '2rem',
          border: 'none',
          padding: '15px 32px',
          textAlign: 'center',
          textDecoration: 'none',
          display: 'inline-block',
          fontSize: '1rem',
          margin: '0.4rem 0.2rem',
          cursor: 'pointer'
        },

        count_button1: 0,
        count_button2: 0,
        firstButtonNumber: 0,
        secondButtonNumber: 0,
        isFirstButtonDisabled: false,
        isSecondButtonDisabled: false,

        // Max count for each button
        firstMaxCount: 50,
        secondMaxCount: 100
      }
    },

    computed: {
      totalProgress() {
        const firstButtonProgress =
          (this.firstButtonNumber / this.firstMaxCount) * 50
        const secondButtonProgress =
          (this.secondButtonNumber / this.secondMaxCount) * 50
        return parseInt(firstButtonProgress + secondButtonProgress)
      }
    },
    methods: {
      firstButtonAction(count) {
        this.firstButtonNumber = count
        if (count === this.firstMaxCount) {
          this.isFirstButtonDisabled = true
          localStorage.setItem('isFirstButtonDisabled', true)
        }
        localStorage.setItem('firstButtonNumber', count)
      },
      secondButtonAction(count) {
        this.secondButtonNumber = count
        if (count === this.secondMaxCount) {
          this.isSecondButtonDisabled = true
          localStorage.setItem('isSecondButtonDisabled', true)
        }
        localStorage.setItem('secondButtonNumber', count)
      },
      resetProgress() {
        const heartStore = useHeartStore()
        heartStore.resetProgress()
      }
    },

    mounted() {
      const savedFirstButtonNumber = localStorage.getItem('firstButtonNumber')
      const savedSecondButtonNumber = localStorage.getItem('secondButtonNumber')
      const savedFirstButtonDisabled = localStorage.getItem(
        'isFirstButtonDisabled'
      )
      const savedSecondButtonDisabled = localStorage.getItem(
        'isSecondButtonDisabled'
      )

      if (savedFirstButtonNumber !== null) {
        this.firstButtonNumber = parseInt(savedFirstButtonNumber, 10)
      }
      if (savedSecondButtonNumber !== null) {
        this.secondButtonNumber = parseInt(savedSecondButtonNumber, 10)
      }
      if (savedFirstButtonDisabled !== null) {
        this.isFirstButtonDisabled = JSON.parse(savedFirstButtonDisabled)
      }
      if (savedSecondButtonDisabled !== null) {
        this.isSecondButtonDisabled = JSON.parse(savedSecondButtonDisabled)
      }
    }
  }
</script>

<style scoped>
  h1 {
    color: #333;
  }
  main {
    display: flex;
    flex-direction: column;
  }
  #clicker-button {
    align-self: center;
  }
</style>

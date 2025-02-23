<!-- Options API -->

<template>
  <header>
    <h1>
      Heartful Clicks!<br />
      Collect and Reflect
    </h1>
  </header>
  <main>
    <button class="tooltip-button" @click="toggleTooltip" ref="howToPlay">
      How to Play
    </button>
    <div
      class="tooltip"
      ref="tooltip"
      :class="{ 'tooltip-visible': isTooltipVisible }"
    >
      <p>
        <strong>Click the Buttons</strong> – There are two buttons at the bottom
        of the screen. Clicking them will gradually fill up the heart. Each
        button contributes to the heart's progress. Once the heart is filled, a
        quote will appear inside it.
      </p>
      <p>
        Click on the quote to save it as a note in your notebook. Your notebook
        can be accessed from another link on the page.
      </p>
    </div>
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
        secondMaxCount: 100,

        // Tooltip visibility
        isTooltipVisible: false
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
      },
      toggleTooltip(event) {
        console.log('toggleTooltip called')
        event.stopPropagation() // Prevent the click event from propagating to the document
        this.isTooltipVisible = !this.isTooltipVisible
        if (this.isTooltipVisible) {
          document.addEventListener('click', this.hideTooltip)
        } else {
          document.removeEventListener('click', this.hideTooltip)
        }
      },
      hideTooltip(event) {
        console.log('hideTooltip called')
        const button = this.$refs.howToPlay
        const tooltip = this.$refs.tooltip
        if (
          tooltip &&
          !tooltip.contains(event.target) &&
          event.target !== button
        ) {
          this.isTooltipVisible = false
          document.removeEventListener('click', this.hideTooltip)
        }
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
    color: #eee3e3 !important;
    background-clip: text;
    background-image: linear-gradient(
      to right,
      #ad615d,
      #767e7a,
      #ad615d,
      #767e7a,
      #ad615d,
      #767e7a
    );
    color: var(--color-background);
    font-size: var(--font-size);
    font-weight: var(--font-weight);
    letter-spacing: var(--letter-spacing);
    padding: calc(--stroke-width / 2);
    -webkit-text-stroke-color: transparent;
    -webkit-text-stroke-width: var(--stroke-width);
    margin-bottom: 13px;
    font-family: Poppins, sans-serif;
    --stroke-width: calc(2em / 16);
    --font-size: 5vmin;
    --font-weight: 700;
    --letter-spacing: calc(1.2em / 8);
  }
  main {
    display: flex;
    flex-direction: column;
    position: relative;
  }
  #clicker-button {
    align-self: center;
  }

  .tooltip-button {
    padding: 10px 20px;
    background-color: #ad615d;
    color: white;
    border: none;
    cursor: pointer;
    font-size: 16px;
    border-radius: 5px;
    max-width: 300px;
    align-self: center;
  }
  .tooltip {
    max-width: 300px;
    text-align: left;
    z-index: 1000; /* Ensure the tooltip is above other elements */
    overflow: hidden;
    height: 0;
    opacity: 0;
    transition: height 0.3s ease, opacity 0.3s ease;
    align-self: center;
  }
  .tooltip-visible {
    height: auto;
    opacity: 1;
    padding: 15px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    background: white;
    color: black;
  }
  .tooltip::after {
    content: '';
    position: absolute;
    top: -10px;
    left: 20px;
    border-width: 10px;
    border-style: solid;
    border-color: transparent transparent white transparent;
  }
</style>

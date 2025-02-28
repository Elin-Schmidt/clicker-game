<!-- Composition API -->

<template>
  <div class="heart-container">
    <div
      class="heart"
      :class="{ pulsate: progress === 100 }"
      :style="{
        background: `linear-gradient(to top, #ff6b6b ${progress}%, #fff ${progress}%)`
      }"
    >
      <section class="quote-container">
        <p
          class="fetched-quote"
          v-if="progress === 100"
          @click="addQuoteToNotes"
        >
          {{ heartStore.quote }}
        </p>

        <button
          class="reset-button"
          v-if="heartStore.pulsateCount >= 5"
          @click="confirmReset"
        >
          Reset Progress
        </button>
      </section>
    </div>
    <p>{{ progress }}% av hjärtat är helt!</p>
  </div>
</template>

<script>
  import { watch, onMounted } from 'vue'
  import axios from 'axios'
  import { useNotesStore } from '../stores/notes'
  import { useHeartStore } from '../stores/heartStore'

  export default {
    props: {
      progress: {
        type: Number,
        required: true
      }
    },
    setup(props) {
      const heartStore = useHeartStore()
      const notesStore = useNotesStore()

      const fetchQuote = async () => {
        if (localStorage.getItem('quote')) {
          heartStore.setQuote(localStorage.getItem('quote'))
          return
        }
        const proxyUrl = 'https://api.allorigins.win/get?url='
        const targetUrl = 'https://zenquotes.io/api/random'
        const fullUrl = `${proxyUrl}${encodeURIComponent(
          targetUrl
        )}&timestamp=${new Date().getTime()}`
        console.log('Fetching quote from:', fullUrl)

        try {
          const response = await axios.get(fullUrl)
          const parsedData = JSON.parse(response.data.contents)

          if (Array.isArray(parsedData) && parsedData.length > 0) {
            heartStore.setQuote(parsedData[0].q)
            localStorage.setItem('quote', heartStore.quote)
          } else {
            heartStore.setQuote('Citat kunde inte hämtas.')
          }
        } catch (error) {
          console.error('Kunde inte hämta citatet', error)
          heartStore.setQuote('I Believe In You')
        }
      }

      const addQuoteToNotes = () => {
        notesStore.addNote(heartStore.quote)
      }

      const confirmReset = () => {
        if (confirm('Are you sure you want to reset the progress?')) {
          heartStore.resetProgress()
        }
      }

      watch(
        () => props.progress,
        (newVal) => {
          console.log('Heart.vue: Progress ändrad till:', newVal)
          if (newVal === 100) {
            fetchQuote()
            heartStore.startPulse()
          }
        }
      )

      onMounted(() => {
        heartStore.restorePulsateState()
      })

      return {
        heartStore,
        fetchQuote,
        addQuoteToNotes,
        confirmReset
      }
    }
  }
</script>

<style>
  .heart-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 40px;
  }

  .heart {
    width: 50vw;
    height: 40vh;
    max-width: 500px;
    max-height: 400px;
    background: linear-gradient(to top, #ff6b6b 0%, #fff 0%);
    mask: radial-gradient(at 70% 31%, #000 29%, #0000 30%),
      radial-gradient(at 30% 31%, #000 29%, #0000 30%),
      linear-gradient(#000 0 0) bottom/100% 50% no-repeat;
    clip-path: polygon(-41% 0, 50% 91%, 141% 0);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    text-align: center;
    color: black;
    font-size: 16px;
    box-shadow: 0 0 10px rgba(255, 0, 0, 0.5);
    padding: 1rem;
    overflow: hidden;
  }

  .pulsate {
    animation: pulse 1s ease-in-out infinite;
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }

  .quote-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .fetched-quote {
    font-size: clamp(1rem, 1.2vw, 1.8rem);
    font-weight: bold;
    font-variant: small-caps;
    line-height: 1.3;
    color: #000000;
    max-width: 90%;
    word-wrap: break-word;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    overflow: hidden;
    margin-top: 1rem;
    cursor: pointer;
  }

  .reset-button {
    background-color: #eee3e3;
    color: #000;
    border: none;
    padding: 10px 20px;
    margin-top: 0.5rem;
    font-size: 16px;
    cursor: pointer;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
      rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
      rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
    max-width: 200px;
    width: auto;
  }

  .reset-button:hover {
    background-color: #fbcfc1;
    color: #000;
  }

  .reset-button:active {
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset,
      rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
  }

  @media (min-width: 1600px) {
    .fetched-quote {
      font-size: clamp(0.8rem, 1vw, 1.5rem);
      line-height: 1.2;
    }
  }

  @media (min-width: 1200px) {
    .fetched-quote {
      font-size: clamp(1rem, 1.8vw, 2rem);
    }
  }

  @media (min-width: 769px) and (max-width: 1199px) {
    .fetched-quote {
      font-size: clamp(1rem, 2vw, 2rem);
      line-height: 1.3;
      max-width: 80%;
      word-wrap: break-word;
    }
  }

  @media (max-width: 768px) {
    .heart {
      width: 70vw;
      height: 30vh;
    }

    .fetched-quote {
      font-size: clamp(0.8rem, 2.5vw, 1.5rem);
      line-height: 1.2;
    }

    .reset-button {
      padding: 8px 16px;
      font-size: 14px;
      max-width: 150px;
    }
  }
</style>

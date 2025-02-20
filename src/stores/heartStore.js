// Composition API

import { defineStore } from 'pinia'

export const useHeartStore = defineStore('heart', {
  state: () => ({
    pulsateCount: 0,
    progress: 0,
    quote: '',
    pulseInterval: null,
    firstButtonNumber: 0,
    secondButtonNumber: 0,
    isFirstButtonDisabled: false,
    isSecondButtonDisabled: false
  }),
  actions: {
    incrementPulsateCount() {
      this.pulsateCount += 1
      console.log('Pulsate count: ' + this.pulsateCount)
      localStorage.setItem('pulsateCount', this.pulsateCount)
      if (this.pulsateCount >= 5) {
        this.stopPulsating()
      }
    },
    startPulse() {
      if (this.pulsateCount < 5 && !this.pulseInterval) {
        this.pulseInterval = setInterval(() => {
          this.incrementPulsateCount()
        }, 2000)
      }
    },
    resetProgress() {
      this.pulsateCount = 0
      this.progress = 0
      this.stopPulsating()
      this.quote = ''
      this.count_button1 = 0
      this.count_button2 = 0
      this.firstButtonNumber = 0
      this.secondButtonNumber = 0
      this.isFirstButtonDisabled = false
      this.isSecondButtonDisabled = false
      localStorage.removeItem('quote')
      localStorage.removeItem('pulsateCount')
      localStorage.removeItem('count_button1')
      localStorage.removeItem('count_button2')
      localStorage.removeItem('firstButtonNumber')
      localStorage.removeItem('secondButtonNumber')
      localStorage.removeItem('isFirstButtonDisabled')
      localStorage.removeItem('isSecondButtonDisabled')
      window.location.reload()
    },
    setQuote(newQuote) {
      this.quote = newQuote
    },
    setProgress(newProgress) {
      this.progress = newProgress
      if (newProgress === 100) {
        this.startPulse()
      }
    },
    stopPulsating() {
      if (this.pulseInterval) {
        clearInterval(this.pulseInterval)
        this.pulseInterval = null
      }
    },
    restorePulsateState() {
      const savedPulsateCount = localStorage.getItem('pulsateCount')
      if (savedPulsateCount !== null) {
        this.pulsateCount = parseInt(savedPulsateCount, 10)
      }
      const savedFirstButtonNumber = localStorage.getItem('firstButtonNumber')
      if (savedFirstButtonNumber !== null) {
        this.firstButtonNumber = parseInt(savedFirstButtonNumber, 10)
      }
      const savedSecondButtonNumber = localStorage.getItem('secondButtonNumber')
      if (savedSecondButtonNumber !== null) {
        this.secondButtonNumber = parseInt(savedSecondButtonNumber, 10)
      }
      const savedFirstButtonDisabled = localStorage.getItem(
        'isFirstButtonDisabled'
      )
      if (savedFirstButtonDisabled !== null) {
        this.isFirstButtonDisabled = JSON.parse(savedFirstButtonDisabled)
      }
      const savedSecondButtonDisabled = localStorage.getItem(
        'isSecondButtonDisabled'
      )
      if (savedSecondButtonDisabled !== null) {
        this.isSecondButtonDisabled = JSON.parse(savedSecondButtonDisabled)
      }
    }
  }
})

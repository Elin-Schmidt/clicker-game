import { defineStore } from 'pinia';

export const useHeartStore = defineStore('heart', {
    state: () => ({
        pulsateCount: 0,
        progress: 0,
        quote: '',
        pulseInterval: null,
        count_button1: 0,
        count_button2: 0,
        firstButtonNumber: 0,
        secondButtonNumber: 0,
        isFirstButtonDisabled: false,
        isSecondButtonDisabled: false
    }),
    actions: {
        incrementPulsateCount() {
            this.pulsateCount += 1;
            console.log('Pulsate count: ' + this.pulsateCount);
            if (this.pulsateCount >= 5) {
                this.stopPulsating();
            }
        },
        startPulse() {
            if (this.pulsateCount < 5 && !this.pulseInterval) {
                this.pulseInterval = setInterval(() => {
                    this.incrementPulsateCount();
                }, 2000);
            }
        },
        resetProgress() {
            this.pulsateCount = 0;
            this.progress = 0;
            this.stopPulsating();
            this.quote = '';
            this.count_button1 = 0;
            this.count_button2 = 0;
            this.firstButtonNumber = 0;
            this.secondButtonNumber = 0;
            this.isFirstButtonDisabled = false;
            this.isSecondButtonDisabled = false;
            localStorage.removeItem('quote');
            localStorage.removeItem('count_button1');
            localStorage.removeItem('count_button2');
            localStorage.removeItem('firstButtonNumber');
            localStorage.removeItem('secondButtonNumber');
            localStorage.removeItem('isFirstButtonDisabled');
            localStorage.removeItem('isSecondButtonDisabled');
            window.location.reload();
        },
        setQuote(newQuote) {
            this.quote = newQuote;
        },
        setProgress(newProgress) {
            this.progress = newProgress;
            if (newProgress === 100) {
                this.startPulse();
            }
        },
        stopPulsating() {
            if (this.pulseInterval) {
                clearInterval(this.pulseInterval);
                this.pulseInterval = null;
            }
        }
    }
});

<template>
    <button
        :style="computedButtonStyle"
        :disabled="disabled"
        @click="incrementCount"
        @mousedown="startDelayedIncrement"
        @mouseup="stopIncrement"
        @mouseleave="stopIncrement"
    >
        {{ buttonText }}
    </button>
</template>

<script>
    export default {
        props: {
            id: {
                type: String,
                required: true
            },
            initialStyle: {
                type: Object,
                required: true
            },
            disabled: {
                type: Boolean,
                default: false
            },
            changeTextAtMax: {
                type: Boolean,
                default: false
            },
            maxCount: {
                type: Number,
                default: 100
            }
        },
        data() {
            return {
                count: 0,
                buttonStyle: { ...this.initialStyle },
                interVallId: null
            };
        },
        computed: {
            buttonText() {
                return this.changeTextAtMax && this.count >= this.maxCount
                    ? 'Max'
                    : this.count;
            },
            computedButtonStyle() {
                return this.disabled
                    ? {
                          ...this.buttonStyle,
                          backgroundColor: '#d3d3d3',
                          color: '#a9a9a9',
                          cursor: 'not-allowed'
                      }
                    : this.buttonStyle;
            }
        },
        methods: {
            incrementCount() {
                if (this.count < this.maxCount) {
                    this.count++;
                    this.updateButtonStyle(this.count);
                    this.$emit('countReached', this.count);
                    localStorage.setItem(`count_${this.id}`, this.count);
                }
                if (this.count >= this.maxCount) {
                    this.stopIncrement();
                }
            },
            startIncrement() {
                if (this.count < this.maxCount) {
                    this.incrementCount();
                    this.intervalId = setInterval(this.incrementCount, 100);
                }
            },
            startDelayedIncrement() {
                this.intervalId = setTimeout(this.startIncrement, 10000);
            },
            stopIncrement() {
                clearInterval(this.intervalId);
                clearTimeout(this.timeoutId);
                this.intervalId = null;
                this.timeoutId = null;
            },
            updateButtonStyle(newCount) {
                switch (true) {
                    case newCount >= 250:
                        this.buttonStyle = {
                            ...this.initialStyle,
                            backgroundColor: '#000',
                            color: '#fff'
                        };
                        break;
                    case newCount >= 200:
                        this.buttonStyle = {
                            ...this.initialStyle,
                            backgroundColor: '#9c27b0',
                            color: '#fff'
                        };
                        break;
                    case newCount >= 150:
                        this.buttonStyle = {
                            ...this.initialStyle,
                            backgroundColor: '#2196f3',
                            color: '#fff'
                        };
                        break;
                    case newCount >= 100:
                        this.buttonStyle = {
                            ...this.initialStyle,
                            backgroundColor: '#2d1918',
                            color: '#fff'
                        };
                        break;
                    case newCount >= 50:
                        this.buttonStyle = {
                            ...this.initialStyle,
                            backgroundColor: '#7a4441',
                            color: '#fff'
                        };
                        break;
                    default:
                        this.buttonStyle = { ...this.initialStyle };
                        break;
                }
            }
        },
        mounted() {
            console.log(`Laddar nyckel: count_${this.id}`);
            const savedCount = localStorage.getItem(`count_${this.id}`);
            console.log(`Hämtat värde: ${savedCount}`);
            if (savedCount !== null) {
                this.count = parseInt(savedCount, 10);
                this.updateButtonStyle(this.count);
            }
        }
    };
</script>

<style scoped></style>

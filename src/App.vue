<template>
    <header><h1>Welcome to the Clicker Game!</h1></header>
    <main>
        <section>
            <Heart :progress="totalProgress" />
        </section>
        <section>
            <ClickerButton
                id="button1"
                :initialStyle="defaultButtonStyle"
                :disabled="isFirstButtonDisabled"
                :changeTextAtMax="true"
                :maxCount="firstMaxCount"
                @countReached="firstButtonAction"
            />
            <ClickerButton
                id="button2"
                :initialStyle="defaultButtonStyle"
                :disabled="isSecondButtonDisabled"
                :changeTextAtMax="true"
                :maxCount="secondMaxCount"
                @countReached="secondButtonAction"
            />
        </section>
    </main>
</template>

<script>
    import ClickerButton from './components/ClickerButton.vue';
    import Heart from './components/Heart.vue';

    export default {
        components: {
            ClickerButton,
            Heart
        },
        data() {
            return {
                // Default button style
                defaultButtonStyle: {
                    backgroundColor: '#4caf50',
                    color: '#fff',
                    padding: '15px 32px',
                    textAlign: 'center',
                    textDecoration: 'none',
                    display: 'inline-block',
                    fontSize: '1rem',
                    margin: '0.4rem 0.2rem',
                    cursor: 'pointer'
                },

                firstButtonNumber: 0,
                secondButtonNumber: 0,
                isFirstButtonDisabled: false,
                isSecondButtonDisabled: false,

                // Max count for each button
                firstMaxCount: 100,
                secondMaxCount: 500
            };
        },
        // Calculate the total progress of the heart
        computed: {
            totalProgress() {
                const firstButtonProgress =
                    (this.firstButtonNumber / this.firstMaxCount) * 50;
                const secondButtonProgress =
                    (this.secondButtonNumber / this.secondMaxCount) * 50;
                return parseInt(firstButtonProgress + secondButtonProgress);
            }
        },
        methods: {
            firstButtonAction(count) {
                this.firstButtonNumber = count;
                if (count === this.firstMaxCount) {
                    this.isFirstButtonDisabled = true;
                    localStorage.setItem('isFirstButtonDisabled', true);
                }
                localStorage.setItem('firstButtonNumber', count);
            },
            secondButtonAction(count) {
                this.secondButtonNumber = count;
                if (count === this.secondMaxCount) {
                    this.isSecondButtonDisabled = true;
                    localStorage.setItem('isSecondButtonDisabled', true);
                }
                localStorage.setItem('secondButtonNumber', count);
            }
        },
        // Load the saved data from the local storage
        mounted() {
            const savedFirstButtonNumber =
                localStorage.getItem('firstButtonNumber');
            const savedSecondButtonNumber =
                localStorage.getItem('secondButtonNumber');
            const savedFirstButtonDisabled = localStorage.getItem(
                'isFirstButtonDisabled'
            );
            const savedSecondButtonDisabled = localStorage.getItem(
                'isSecondButtonDisabled'
            );

            if (savedFirstButtonNumber !== null) {
                this.firstButtonNumber = parseInt(savedFirstButtonNumber, 10);
            }
            if (savedSecondButtonNumber !== null) {
                this.secondButtonNumber = parseInt(savedSecondButtonNumber, 10);
            }
            if (savedFirstButtonDisabled !== null) {
                this.isFirstButtonDisabled = JSON.parse(
                    savedFirstButtonDisabled
                );
            }
            if (savedSecondButtonDisabled !== null) {
                this.isSecondButtonDisabled = JSON.parse(
                    savedSecondButtonDisabled
                );
            }
        }
    };
</script>

<style scoped>
    h1 {
        color: #333;
    }
</style>

<template>
    <div class="heart-container">
        <div
            class="heart"
            :class="{ pulsate: progress === 100 }"
            :style="{
                background: `linear-gradient(to top, #ff6b6b ${progress}%, #fff ${progress}%)`
            }"
        >
            <p class="fetched-quote" v-if="progress === 100">{{ quote }}</p>
        </div>
        <p>{{ progress }}% av hjärtat är helt!</p>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        props: {
            progress: {
                type: Number,
                required: true
            }
        },
        data() {
            return {
                quote: ''
            };
        },
        watch: {
            progress(newVal) {
                console.log('Heart.vue: Progress ändrad till:', newVal);
                if (newVal === 100) {
                    this.fetchQuote();
                }
            }
        },
        methods: {
            async fetchQuote() {
                const proxyUrl = 'https://api.allorigins.win/get?url=';
                const targetUrl = 'https://zenquotes.io/api/random';
                const fullUrl = `${proxyUrl}${encodeURIComponent(
                    targetUrl
                )}&timestamp=${new Date().getTime()}`;

                try {
                    const response = await axios.get(fullUrl);
                    const parsedData = JSON.parse(response.data.contents);

                    // Kontrollera om API:et returnerade en array och ta första objektet
                    if (Array.isArray(parsedData) && parsedData.length > 0) {
                        this.quote = parsedData[0].q;
                    } else {
                        this.quote = 'Citat kunde inte hämtas.';
                    }
                } catch (error) {
                    console.error('Kunde inte hämta citatet', error);
                    this.quote = 'Fallback citat!';
                }
            }
        }
    };
</script>

<style>
    .heart-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 20px;
    }

    .heart {
        width: 500px;
        height: 400px;
        background: linear-gradient(to top, #ff6b6b 0%, #fff 0%);
        mask: radial-gradient(at 70% 31%, #000 29%, #0000 30%),
            radial-gradient(at 30% 31%, #000 29%, #0000 30%),
            linear-gradient(#000 0 0) bottom/100% 50% no-repeat;
        clip-path: polygon(-41% 0, 50% 91%, 141% 0);
        margin: 20px;
        display: flex;
        align-items: flex-start;
        justify-content: center;
        text-align: center;
        color: black;
        font-size: 16px;
        box-shadow: 0 0 10px rgba(255, 0, 0, 0.5);
    }

    /* Pulsating animation */
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

    .fetched-quote {
        font-size: 24px;
        font-weight: bold;
        font-variant: small-caps;
        line-height: 1.5;
        color: #000000;
        transition: color 0.5s ease;
        padding: 40px 95px;
    }
</style>

<template>
    <div class="heart-container">
        <div
            class="heart"
            :class="{ pulsate: progress === 100 }"
            :style="{
                background: `linear-gradient(to top, #ff6b6b ${progress}%, #fff ${progress}%)`
            }"
        >
            <p
                class="fetched-quote"
                v-if="progress === 100"
                @click="addQuoteToNotes"
            >
                {{ quote }}
            </p>
        </div>
        <p>{{ progress }}% av hjärtat är helt!</p>
    </div>
</template>

<script>
    import axios from 'axios';
    import { useNotesStore } from '../stores/notes';

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
                console.log('Fetching quote from:', fullUrl);

                try {
                    const response = await axios.get(fullUrl);
                    const parsedData = JSON.parse(response.data.contents);

                    if (Array.isArray(parsedData) && parsedData.length > 0) {
                        this.quote = parsedData[0].q;
                    } else {
                        this.quote = 'Citat kunde inte hämtas.';
                    }
                } catch (error) {
                    console.error('Kunde inte hämta citatet', error);
                    this.quote = 'I Believe in you';
                }
            },
            addQuoteToNotes() {
                const notesStore = useNotesStore();
                notesStore.addNote(this.quote);
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
        width: 50vw;
        height: 40vh;
        max-width: 500px;
        max-height: 400px;
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

    .fetched-quote {
        font-size: clamp(1rem, 1.2vw, 1.8rem);
        font-weight: bold;
        font-variant: small-caps;
        line-height: 1.3;
        color: #000000;
        max-width: 90%;
        max-height: 90%;
        word-wrap: break-word;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        overflow: hidden;
        margin-top: 2rem;
        cursor: pointer;
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
    }
</style>

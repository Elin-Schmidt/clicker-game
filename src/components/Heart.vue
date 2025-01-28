<template>
    <div class="heart-container">
        <div
            class="heart"
            :style="{
                background: `linear-gradient(to bottom, #ff6b6b ${progress}%, #fff ${progress}%)`
            }"
        ></div>
        <p>{{ progress }}% av hjärtat är helt!</p>
    </div>
</template>

<script>
    export default {
        props: {
            progress: {
                type: Number,
                required: true
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
        background: linear-gradient(to bottom, #ff6b6b 0%, #fff 0%);
        clip-path: polygon(
            30.2% 0%,
            52% 15.3%,
            69.8% 0%,
            89% 10.3%,
            100% 35.5%,
            80% 69.8%,
            52% 100%,
            20% 69.8%,
            0% 35.5%,
            11% 10.3%
        );
        margin-bottom: 10px;
    }
</style>

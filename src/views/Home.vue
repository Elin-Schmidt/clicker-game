<template>
    <div>
        <div class="image-container">
            <img
                src="/img/welcome.png"
                alt="Welcome"
                class="img-fluid welcome"
            />
        </div>
        <p>
            Needed Implementations:
            <ul>
                <li>No new quote on reload</li>
                <li>"Restart" button inside heart after 20(?) heartbeats</li>
            </ul>
        </p>
    </div>
</template>

<script>
    export default {
        name: 'Home'
    };
</script>

<style>
    .image-container {
        display: flex;
        justify-content: center;
    }
</style>

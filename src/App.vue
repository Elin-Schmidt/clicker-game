<template>
    <div>
        <main>
            <nav>
                <router-link to="/">Home</router-link> |
                <router-link to="/clicker-game">Clicker Game</router-link>
            </nav>
            <section>
                <router-view></router-view>
            </section>
        </main>
    </div>
</template>

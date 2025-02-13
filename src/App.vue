<template>
    <div>
        <main>
            <!-- Navbar -->
            <b-navbar
                fixed="top"
                toggleable="lg"
                type="light"
                class="custom-navbar flex-column align-items-center"
            >
                <b-navbar-brand href="/" class="text-center"
                    >Min App</b-navbar-brand
                >

                <b-navbar-toggle
                    target="nav-collapse"
                    v-model="isNavOpen"
                ></b-navbar-toggle>

                <b-collapse id="nav-collapse" is-nav v-model="isNavOpen">
                    <b-navbar-nav class="w-100 d-flex justify-content-center">
                        <b-nav-item to="/" exact @click.native="closeNav"
                            >Home</b-nav-item
                        >
                        <b-nav-item to="/clicker-game" @click.native="closeNav"
                            >Clicker Game</b-nav-item
                        >
                        <b-nav-item to="/notes" @click.native="closeNav"
                            >Notes</b-nav-item
                        >
                    </b-navbar-nav>
                </b-collapse>
            </b-navbar>

            <!-- Router view for the main content -->
            <section class="container mt-4">
                <router-view></router-view>
            </section>
        </main>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isNavOpen: false // Startar som stängd
            };
        },
        methods: {
            closeNav() {
                if (window.innerWidth <= 991) {
                    this.isNavOpen = false; // Stänger menyn
                }
            }
        }
    };
</script>

<style>
    .custom-navbar {
        background-color: #eee3e3;
        color: #2f4f4f;
        list-style: none;
    }
    .container {
        padding: 20px;
    }
</style>

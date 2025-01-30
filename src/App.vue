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
                <!-- Centered Brand -->
                <b-navbar-brand href="/" class="text-center"
                    >Min App</b-navbar-brand
                >

                <!-- Toggle button for small screens -->
                <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

                <!-- Collapsible content -->
                <b-collapse id="nav-collapse" is-nav>
                    <b-navbar-nav class="w-100 d-flex justify-content-center">
                        <b-nav-item to="/" exact>Home</b-nav-item>
                        <b-nav-item to="/clicker-game">Clicker Game</b-nav-item>
                        <b-nav-item to="/notes">Notes</b-nav-item>
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

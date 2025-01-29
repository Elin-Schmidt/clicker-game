<template>
    <div>
        <main>
            <!-- Navbar -->
            <b-navbar toggleable="lg" type="light" class="custom-navbar">
                <b-navbar-brand href="/">Min App</b-navbar-brand>

                <!-- Toggle button for small screens -->
                <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

                <!-- Collapsible content -->
                <b-collapse id="nav-collapse" is-nav>
                    <b-navbar-nav>
                        <b-nav-item to="/" exact>Home</b-nav-item>
                        <b-nav-item to="/clicker-game">Clicker Game</b-nav-item>
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

<style scoped>
    .custom-navbar {
        background-color: #eee3e3;
        color: #2f4f4f;
    }
</style>

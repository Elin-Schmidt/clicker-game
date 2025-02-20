<!-- Options API -->

<template>
  <div>
    <main>
      <header class="custom-header">
        <img
          src="/img/click-n-dream.png"
          alt="Click n' Dream Logo"
          class="logo img-fluid rounded-circle"
        />

        <b-navbar
          fixed="top"
          toggleable="lg"
          type="light"
          class="custom-navbar"
        >
          <b-navbar-toggle target="nav-collapse" v-model="isNavOpen" />

          <b-collapse id="nav-collapse" is-nav v-model="isNavOpen">
            <b-navbar-nav class="w-100 d-flex justify-content-center">
              <b-nav-item to="/" exact @click="closeNav">Home</b-nav-item>
              <b-nav-item to="/clicker-game" @click="closeNav"
                >Clicker Game</b-nav-item
              >
              <b-nav-item to="/notes" @click="closeNav">Notes</b-nav-item>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
      </header>

      <section class="container mt-4">
        <router-view />
      </section>
    </main>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        isNavOpen: false
      }
    },
    methods: {
      closeNav() {
        if (window.innerWidth <= 991) {
          this.isNavOpen = false
        }
      }
    }
  }
</script>

<style>
  body {
    align-items: flex-start !important;
    background-color: whitesmoke !important;
  }

  /* Bootstrap har en important på sin .mt-4 som förstör!
    En lösning är att använda en mer specifik CSS-selektor för att tvinga din stil
    att åsidosätta Bootstrap's !important genom att öka specificiteten.
     */
  body .container {
    margin-top: 12.5rem !important;
  }
  .custom-header {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 1030;
    background-color: whitesmoke;
  }
  .logo {
    width: 120px;
    transition: all 0.3s ease-in-out;
  }
  .custom-navbar {
    background-color: #eee3e3;
    color: #2f4f4f;
    list-style: none;
    margin-top: 150px;
  }
  .container {
    padding: 20px;
  }
  @media (max-width: 991px) {
    .custom-header {
      display: flex;
    }
  }
</style>

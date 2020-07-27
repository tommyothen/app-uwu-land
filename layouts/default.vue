<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <nuxt-link class="navbar-brand" to="/">
        <Logo style="height: 3vh; width: 3vh;" />
      </nuxt-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div id="navbarNav" class="collapse navbar-collapse">
        <ul class="navbar-nav">
          <li class="nav-item">
            <nuxt-link class="nav-link" to="/">
              Home
            </nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link class="nav-link" to="/api">
              Documentation
            </nuxt-link>
          </li>
        </ul>
        <button
          class="btn btn-outline-success ml-auto"
          type="button"
          @click="$store.state.users.user ? logout() : login()"
        >
          <span>Log {{ this.$store.state.users.user ? 'Out' : 'In' }}</span>
        </button>
      </div>
    </nav>
    <div class="nuxt bg-light">
      <Nuxt />
    </div>
  </div>
</template>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.nav {
  height: 5vh;
  width: 100vw;
}

.nuxt {
  height: 95vh;
  overflow: auto;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>

<script>
import { setTimeout } from 'timers';
import Cookie from 'js-cookie';
import { firebase } from '@/services/firebase/firebase';

export default {
  data: () => ({
    isError: false,
    errMsg: '',
    title: 'Log in',
  }),
  methods: {
    login() {
      this.$store
        .dispatch('users/login')
        .then(this.$router.push('/profile'))
        .catch((error) => {
          this.isError = true;
          this.errMsg = error.code;

          setTimeout(() => {
            this.isError = false;
          }, 5000);
        });
    },
    async logout() {
      await firebase.auth().signOut();
      await Cookie.remove('access_token');

      location.href = '/';
    },
  },
};
</script>

<template>
  <div>
    <b-nav class="navbar navbar-expand-lg navbar-light">
      <nuxt-link class="navbar-brand" to="/">
        <Logo style="height: 2em; width: 2em;" />
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
          <li class="nav-item universal-center">
            <nuxt-link class="nav-link" to="/">
              <p class="nav-text">Home</p>
            </nuxt-link>
          </li>
          <li class="nav-item universal-center">
            <nuxt-link class="nav-link" to="/api">
              <p class="nav-text">Documentation</p>
            </nuxt-link>
          </li>
        </ul>
        <div class="d-flex ml-auto">
          <ColorModePicker style="height: 100%;" />
          <button
            class="btn btn-outline-success"
            type="button"
            @click="$store.state.users.user ? logout() : login()"
          >
            <span>Log {{ this.$store.state.users.user ? 'Out' : 'In' }}</span>
          </button>
        </div>
      </div>
    </b-nav>
  </div>
</template>

<style>
.universal-center {
  display: grid;
  place-items: center;
}

.nav-text {
  color: var(--color);
}
</style>

<script>
import { setTimeout } from 'timers';
import Cookie from 'js-cookie';
import { firebase } from '@/services/firebase/firebase';
import ColorModePicker from '@/components/ColorModePicker';

export default {
  components: {
    ColorModePicker,
  },
  data: () => ({
    isError: false,
    errMsg: '',
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

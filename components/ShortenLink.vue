<template>
  <div>
    <b-form>
      <b-input-group>
        <b-form-input
          id="urlInput"
          v-model="url"
          class="bg-transparent border-secondary"
          type="url"
          placeholder="Long URL"
          :state="validURL"
          style="color: var(--color);"
        ></b-form-input>
        <b-input-group-append>
          <b-button
            variant="outline-secondary"
            @mouseover="hover = true"
            @mouseleave="hover = false"
            @click="busy ? '' : !recieved ? sendForm() : copyURL()"
          >
            <b-icon
              :icon="
                hover
                  ? `${recieved ? 'file-earmark' : 'cursor'}-fill`
                  : recieved
                  ? 'file-earmark'
                  : 'cursor'
              "
            ></b-icon>
          </b-button>
        </b-input-group-append>
      </b-input-group>
    </b-form>
  </div>
</template>

<script>
import Cookie from 'js-cookie';
import { firebase } from '@/services/firebase/firebase';

export default {
  data() {
    return {
      form: {},
      res: {},
      busy: false,
      hover: false,
      url: '',
      recieved: false,
    };
  },
  computed: {
    validURL() {
      const urlCheck = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_.~#?&//=]*)/;
      return this.recieved || this.url.length === 0
        ? null
        : /uwu.land/.test(this.url)
        ? false
        : urlCheck.test(this.url);
    },
  },
  methods: {
    async sendForm() {
      this.busy = true;

      const options = {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          url: this.url,
        },
        url: 'https://uwu.land/public',
      };
      if (this.$store.state.users.user) {
        options.url = 'https://uwu.land/api';
        options.headers['x-api-key'] =
          (await Cookie.get('x-api-key')) || (await this.getApiKey());
      }

      this.$axios(options)
        .then((response) => {
          this.busy = false;
          this.recieved = true;
          this.url = response.data.shortened;
        })
        .catch((error) => {
          this.error = error;
          this.busy = false;
        });
    },
    getApiKey() {
      return new Promise((resolve, reject) => {
        try {
          const keysRef = firebase.firestore().collection('apikeys');
          keysRef
            .where('author', '==', this.$store.users.user.uid)
            .get((snapshot) => {
              if (!snapshot.empty) {
                Cookie.set('x-api-key', snapshot.docs[0].data().key);
                resolve(snapshot.docs[0].data().key);
              }
            });
        } catch (error) {
          reject(error);
        }
      });
    },
    copyURL() {
      this.$clipboard(this.url);
      this.recieved = false;
      this.url = '';
    },
  },
};
</script>

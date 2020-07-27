import Cookie from 'js-cookie';
import { firebase } from '@/services/firebase/firebase';

export const state = () => ({
  user: null,
});

export const mutations = {
  SET_USER: (state, account) => {
    state.user = account;
  },
};

export const actions = {
  async login({ commit }) {
    // eslint-disable-next-line no-useless-catch
    try {
      // Login the user
      const provider = new firebase.auth.GoogleAuthProvider();
      await firebase.auth().signInWithPopup(provider);

      // JWT from firebase
      const token = await firebase.auth().currentUser.getIdToken();
      const { email, uid } = firebase.auth().currentUser;

      // Set cookies
      Cookie.set('access_token', token);

      // Set the user login
      commit('SET_USER', { email, uid });
    } catch (error) {
      throw error;
    }
  },
};

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
      const { email, uid, displayName, photoURL } = firebase.auth().currentUser;

      // Set cookies
      Cookie.set('access_token', token);

      // Add user to firebase
      firebase.firestore().collection('users').doc(uid).set(
        {
          uid,
          email,
          displayName,
          photoURL,
        },
        {
          merge: true,
        }
      );

      const keysRef = firebase.firestore().collection('apikeys');
      const snapshot = await keysRef.where('author', '==', uid).get();

      if (!snapshot.empty) Cookie.set('x-api-key', snapshot.docs[0].data().key);

      // Set the user login
      commit('SET_USER', { email, uid, displayName, photoURL });
    } catch (error) {
      throw error;
    }
  },
};

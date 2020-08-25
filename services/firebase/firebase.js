import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/analytics';
import 'firebase/firestore';

const config = {
  apiKey: 'AIzaSyD3QfTTh9w6HxANMyJlSqM9VEg0sXo9mQI',
  authDomain: 'uwu-land.firebaseapp.com',
  databaseURL: 'https://uwu-land.firebaseio.com',
  projectId: 'uwu-land',
  storageBucket: 'uwu-land.appspot.com',
  messagingSenderId: '1015136013053',
  appId: '1:1015136013053:web:344a1e2a838e3fa7284c94',
  measurementId: 'G-0BF9R85M1Y',
};

if (!firebase.apps.length) firebase.initializeApp(config);

export { firebase };

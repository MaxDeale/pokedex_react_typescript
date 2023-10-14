 import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyDGB5_ZQ0cWlA2WY0HDyhVuF-qIHPG_K-k",
  authDomain: "pokemon-dd-app.firebaseapp.com",
  projectId: "pokemon-dd-app",
  storageBucket: "pokemon-dd-app.appspot.com",
  messagingSenderId: "22899143142",
  appId: "1:22899143142:web:373b8e19f3278b0984a627"
};

const app = initializeApp(firebaseConfig);
export const auth = app.auth();
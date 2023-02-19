import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'

const firebaseConfig = {
    apiKey: "AIzaSyBb0d0m4qXIr7uUavuaBdizjDC0SCQU5UE",
    authDomain: "heroes-city.firebaseapp.com",
    projectId: "heroes-city",
    storageBucket: "heroes-city.appspot.com",
    messagingSenderId: "61924869486",
    appId: "1:61924869486:web:b06329aa883e58477a2d7f",
    measurementId: "G-H0SFXRYSFY"
  };

  // Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app
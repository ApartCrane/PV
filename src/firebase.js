import app from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyAmfwa3LbVcoc5IIhRaJqNqzx7M6N6LYMk",
    authDomain: "prueba-siu.firebaseapp.com",
    projectId: "prueba-siu",
    storageBucket: "prueba-siu.appspot.com",
    messagingSenderId: "484321772113",
    appId: "1:484321772113:web:8b279a6784ffcf5f57ae70"
};


app.initializeApp(firebaseConfig);

const db = app.firestore();
const auth = app.auth();

export {auth, db}
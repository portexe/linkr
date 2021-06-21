import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

try {
  firebase.initializeApp({
    apiKey: "AIzaSIdDWIoadiamt83Gy3-MTdwauidhwuadidmwa",
    authDomain: "portexe-cawdaw.firebaseapp.com",
    databaseURL: "portexe-hrgdgs.appspot.com",
    projectId: "portexe-hjtfjseg",
    messagingSenderId: "38979783",
    appId: "2:33542290468153:web:9981e237e68eed2eba6de8",
  });
} catch (error) {
  if (!/already exists/u.test(error.message)) {
    console.error("Firebase admin initialization error", error.stack);
  }
}

export const fb = {
  firestore: firebase.firestore(),
  auth: firebase.auth(),
};

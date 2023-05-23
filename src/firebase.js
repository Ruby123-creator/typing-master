// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyCiLv5UUVS5sRDqwtZ7xrbXNQtVo4AaLp4",
  authDomain: "typing-tester-5add3.firebaseapp.com",
  projectId: "typing-tester-5add3",
  storageBucket: "typing-tester-5add3.appspot.com",
  messagingSenderId: "14784492463",
  appId: "1:14784492463:web:de74ff6e135d1a090db55a",
  measurementId: "G-QKZ7BK9HKQ"
};

 const firebaseapp = firebase.initializeApp(firebaseConfig);
 const auth = firebase.auth()
 const db = firebase.firestore()

 export {auth ,db}
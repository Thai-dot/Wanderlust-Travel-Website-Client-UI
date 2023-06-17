import { initializeApp } from "firebase/app" ;   


const firebaseConfig = { 
  apiKey : "AIzaSyAZqeoFabZsoBxJuaiUIROK0TkYVjbNqno" , 
  authDomain : "trevelease.firebaseapp.com" , 
  projectId : "trevelease" , 
  storageBucket : "trevelease.appspot.com" , 
  messagingSenderId : "107513486769" , 
  appId : "1:107513486769:web:88ab5fd11a98d6844d7190" , 
  measurementId : "G-LBPVNPVQMZ" 
};



// Initialize Firebase
const firebaseApp = initializeApp ( firebaseConfig );


export default firebaseApp;
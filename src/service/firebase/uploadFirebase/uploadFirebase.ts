import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfigForUpload = {
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: 'fileupload-travel-managementui.firebaseapp.com',
    projectId: 'fileupload-travel-managementui',
    storageBucket: 'fileupload-travel-managementui.appspot.com',
    messagingSenderId: '174272666730',
    appId: '1:174272666730:web:58fa880c2d6cf176f2be13'
};

// Initialize Firebase
const appTwo = initializeApp(firebaseConfigForUpload, 'appTwo');

const storage = getStorage(appTwo);

export default storage;

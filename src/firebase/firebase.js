// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyDAw-5uo3TVA0UO9zPVDOFPokehvpfFZIo",
	authDomain: "maya-portfolio-ad6bd.firebaseapp.com",
	projectId: "maya-portfolio-ad6bd",
	storageBucket: "maya-portfolio-ad6bd.appspot.com",
	messagingSenderId: "330145157434",
	appId: "1:330145157434:web:dc576069ac64882d75c003",
	measurementId: "G-LJHHK9EGKC",
};

// Initialize Firebase
initializeApp(firebaseConfig);

const storage = getStorage();

export { storage };

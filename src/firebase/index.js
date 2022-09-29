import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
   apiKey: "AIzaSyC5tiycr9SOePWdUF5AVnerc2N4pMATV2A",
   authDomain: "todo-99dd5.firebaseapp.com",
   projectId: "todo-99dd5",
   storageBucket: "todo-99dd5.appspot.com",
   messagingSenderId: "598431955727",
   appId: "1:598431955727:web:7a8e80a0d3d3907a8e9c7a"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {
   db
}

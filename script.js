// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCTUSmRMBn7hCCBO1TQWPg-2xTC3tQZ41k",
  authDomain: "todolist-72a0e.firebaseapp.com",
  projectId: "todolist-72a0e",
  storageBucket: "todolist-72a0e.appspot.com",
  messagingSenderId: "619438175520",
  appId: "1:619438175520:web:3afe82fc0220730a239345"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)

import {
    getFirestore,
    collection,
    doc,
    query,
    where,
    getDoc,
    getDocs,
    deleteDoc,
    addDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js"

const db = getFirestore(app)

const listeRef = document.getElementById("liste")

// const q = query(collection(db, "todoItems"), where("erFerdig", "==", false));
// const querySnapshot = await getDocs(q);
const querySnapshot = await getDocs(collection(db, "todoitems"));
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data());
  const item = document.createElement("li")
  item.innerHTML = doc.data().tekst
  item.dataset.id = doc.id
  if (doc.data().erFerdig){
    item.classList.add("ferdig")
  }
  listeRef.appendChild(item)
  item.addEventListener("click", klikk)
});

async function klikk(event) {
  console.log("klikk")
  console.log(event.target)
  // Fjern objektet fra listen vår "lokalt":
  listeRef.removeChild(event.target)
  // Fjern objektet fra Google Firestore:
  const id = event.target.dataset.id
  await deleteDoc(doc(db, "todoitems", id));
}

document.getElementById("knapp").addEventListener("click", leggTilOppgave)

async function leggTilOppgave(){
  const oppgaveTekst = document.getElementById("oppgave").value
  console.log("oppgaveTekst")


// Add a new document with a generated id.
const docRef = await addDoc(collection(db, "todoitems"), {
  tekst: oppgaveTekst,
  erFerdig: false
});
console.log("Document written with ID: ", docRef.id);

const item = document.createElement("li")
  item.innerHTML = oppgaveTekst
  item.dataset.id = docRef.id
  listeRef.appendChild(item)
  item.addEventListener("click", klikk)

}
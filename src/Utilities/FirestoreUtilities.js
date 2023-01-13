import {
  numbersDict,
  italianDict,
  coloursDict,
  practiceDict,
} from "../dictionaries";
import {
  doc,
  getFirestore,
  setDoc,
  getDoc,
  getDocs,
  collection,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

export async function getAllDict() {
  const docRef = await doc(getFirestore(), "translations", "all");
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data().italianDict;
  } else {
    return false;
  }
}

export async function getColoursDict() {
  const docRef = await doc(getFirestore(), "translations", "colours");
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data().coloursDict;
  } else {
    return false;
  }
}

export async function getNumbersDict() {
  const docRef = await doc(getFirestore(), "translations", "numbers");
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data().numbersDict;
  } else {
    return false;
  }
}

export async function getPracticeDict() {
  const docRef = await doc(getFirestore(), "translations", "practice");
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data().practiceDict;
  } else {
    return false;
  }
}

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, getDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAKklt9wnZ7b3mH66FJONX_l_9pO4oQJqM",
    authDomain: "golfle-4938f.firebaseapp.com",
    projectId: "golfle-4938f",
    storageBucket: "golfle-4938f.appspot.com",
    messagingSenderId: "1090526103127",
    appId: "1:1090526103127:web:61e3c5e304d77675a80512"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore();

export const setData = async (data) => {
    const dataRef = collection(db, 'data');

    await setDoc(doc(dataRef, 'players'), data);
}

export const getPlayerData = async () => {
    const docRef = doc(db, 'data', 'players');
    const docSnap = await getDoc(docRef);

    return docSnap.data();
}

export const randomizePlayerAnswers = async () => {
    const docRef = doc(db, 'data', 'answers');
    const docSnap = await getDoc(docRef);

    const answers = docSnap.data().playerAnswers;
    answers.sort(() => Math.random() - 0.5);

    await setDoc(docRef, {
        playerAnswers: answers
    });
}

export const getPlayerAnswer = async () => {
    const begin = new Date('3/16/2022');
    const today = new Date();
    const diffTime = Math.abs(today - begin);
    const i = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    const docRef = doc(db, 'data', 'answers');
    const docSnap = await getDoc(docRef);

    const answer = docSnap.data().playerAnswers[i];

    return answer;
}
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, doc, setDoc, getDoc } = require('firebase/firestore');

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

const setData = async (data) => {
    const dataRef = collection(db, 'data');

    await setDoc(doc(dataRef, 'players'), data);
}

const getPlayerData = async () => {
    const docRef = doc(db, 'data', 'players');
    const docSnap = await getDoc(docRef);

    return docSnap.data();
}

const getRandomPlayer = async () => {
    const playerData = await getPlayerData();
    const playerNames = Object.keys(playerData);

    return playerNames[Math.floor(Math.random() * playerNames.length)];
}

exports.setData = setData;
exports.getPlayerData = getPlayerData;
exports.getRandomPlayer = getRandomPlayer;
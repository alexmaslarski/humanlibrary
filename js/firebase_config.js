"use strict"
var firebaseConfig = {
    apiKey: "AIzaSyDCXLU2GcycnU9THs5wffadsf1Ph9rVKPY",
    authDomain: "humanlibrary-71515.firebaseapp.com",
    databaseURL: "https://humanlibrary-71515.firebaseio.com",
    projectId: "humanlibrary-71515",
    storageBucket: "humanlibrary-71515.appspot.com",
    messagingSenderId: "801196229241",
    appId: "1:801196229241:web:d253b6cf41179e48ef4aa8"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


const db = firebase.firestore();
const storyRef = db.collection("stories");
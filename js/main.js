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
let people = [];

let updateStory = name => {
    let htmlTemplate = "";
    people.forEach(person => {
        if (person.name === name) {
            htmlTemplate += markUp(person);
            document.querySelector('#content-display').innerHTML = htmlTemplate;
        }
    });
}

let markUp = person => `
<div class="flex">
    <div id="hero-image">

                    <img src="img/${person.img}" style="box-shadow: -20px 20px 0px ${person.shadow}" alt="">
                </div>
                <div id="hero-content">
                    <h2>${person.title}</h2>
                    <div class="hero-story">
                        <p><span>Name:</span> ${person.name}</p>
                        <p><span>Age:</span> ${person.age}</p>
                        <p><span>Gender:</span> ${person.gender}</p>
                        <p><span>Sexuality:</span> ${person.sexuality}</p>
                        <br>
                        <p><span>Interests:</span> ${person.interests}</p>
                        <br>
                        <p><span>Realisation:</span> ${person.realisation}</p>
                        <p><span>Coming Out:</span> ${person.comingOut}</p>
                        <p><span>Response:</span> ${person.response}</p>
                        
                    </div>
                    <div class="buttons-wrapper">
                        <a href="#"><i class="fas fa-heart"></i></a>
                        <a onclick="contactBox('${person.name}', '${person.pronoun}')" href="#"><i class="fas fa-envelope"></i></a>
                    </div>

                </div>
    </div>
    `
let contactBox = (name, pronoun) =>{
    let htmlTemplate = `
    <div class="contact-form">
            <div class="form-heading">

                <i class="fas fa-envelope"></i>
                <h2>SEND A MESSAGE</h2>
            </div>
            <p>Would you like to send ${name} a message?
                Fill in the formula and click ‘Send!’ and ${pronoun} will get right back to you!</p>
            <form action="mailto:someone@yoursite.com&Subject=Fake%20News&Body=Body-goes-here">
                <div class="form-group">

                    <label for="email">Email</label>
                    <input type="email" name="email">
                </div>
            <div class="form-group">

                <label for="message">Your message</label>
                <textarea name="message" id="message" cols="30" rows="10"></textarea>
            </div>
            <div class="form-buttons">

                <a onclick="hideContact()" href="#">RETURN</a>
                <input type="submit" value="SEND!">
            </div>
                
            
            </form>
        </div>`;
document.querySelector('#contact-wrapper').innerHTML = htmlTemplate;
}
let hideContact = () =>{
    let htmlTemplate = '';
    document.querySelector('#contact-wrapper').innerHTML = htmlTemplate;
}


storyRef.onSnapshot((snapshotData) => {
    snapshotData.forEach(doc => {
        let data = doc.data();
        people.push(data);
    })

});
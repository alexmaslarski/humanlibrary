"use strict"
let people = []; // array containing characters from firebase
let clickDisabled = false; // boolean that disables and enables the like button

let updateStory = name => { // function called on click on one of the grid elements, gets a name parameter
    let htmlTemplate = "";
    people.forEach(person => { // cycles through the people array and checks if the names match
        if (person.name === name) {
            htmlTemplate += markUp(person); // when they match it calls the markup function which returns the html content
            document.querySelector('#content-display').innerHTML = htmlTemplate; // appends the htmlTemplate to the #content-display element
                clickDisabled = false; // enables liking - this happens on every change of the character
                likeBtn(); // calls a function which displays the like button

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
                        <p id="likeBtn" onclick="likeStory('${person.name}')"></p>
                        <p onclick="contactBox('${person.name}', '${person.pronoun}')" ><i class="fas fa-envelope"></i></p>
                    </div>

                </div>
    </div>
    `
let contactBox = (name, pronoun) => { // creates the template for the contact box using the name and pronoun of the current character
    let htmlTemplate = `
    <div class="contact-form">
            <div class="form-heading">

                <i class="fas fa-envelope"></i>
                <h2>SEND A MESSAGE</h2>
            </div>
            <p>Would you like to send ${name} a message?
                Fill in the formula and click ‘Send!’ and ${pronoun} will get right back to you!</p>
            <form action="#">
                <div class="form-group">

                    <label for="email">Email</label>
                    <input type="email" name="email">
                </div>
            <div class="form-group">

                <label for="message">Your message</label>
                <textarea name="message" id="message" cols="30" rows="10"></textarea>
            </div>
            <div class="form-buttons">

                <p onclick="hideContact()" href="#">RETURN</p>
                <p onclick="submitForm('${name}')" class="submit" href="#">SEND</p>
                
            </div>
                
            
            </form>
        </div>`;
    document.querySelector('#contact-wrapper').innerHTML = htmlTemplate;
}

let submitForm = name => {
    let message = document.querySelector('#message').value;
    open(`mailto:character@gmail.com?subject=Human Library&body=${message}`); // opens the default email client with a link pointing to the character's email
    //containing the body of the message already written in the contact box
    let htmlTemplate = `
    <div class="contact-form">
            <div class="form-heading">

                <i class="fas fa-heart"></i>
                <h2>THANK YOU!</h2>
                <p>Your message has been sent to ${name}.</p>
            </div>
            <div class="form-buttons centered">
                <p class="submit" onclick="hideContact()" href="#">RETURN</p>                
            </div>
                
            
            </form>
        </div>`;
    document.querySelector('#contact-wrapper').innerHTML = htmlTemplate;

}


let hideContact = () => {
    let htmlTemplate = '';
    document.querySelector('#contact-wrapper').innerHTML = htmlTemplate;
}



let likeStory = (name) => {
    if (clickDisabled === false) { // if the liking is enabled
        storyRef.where('name', '==', name).get() // finds the document containing the name of the selected character
            .then(function (document) {
                document.forEach(function (doc) { // then loops through the documents ( it's only one element but this way we get access to the document itself)
                    storyRef.doc(doc.id).update({ // we update the document with the character's ID (we need ID to select the doc in order to use update())
                        likes: doc.data().likes += 1 // and increment his current likes by 1
                    });

                });
            });
            clickDisabled = true;// then we disable liking
            likeBtn(); // call the likebtn function to change the button
            setTimeout(function () { // after some time we enable liking and change the button back
                clickDisabled = false;
                likeBtn();
            }, 6000);
            
        
    }
    console.log(people);
}
let likeBtn = () =>{
    if(clickDisabled){

        document.querySelector(`#likeBtn`).innerHTML = 'Liked';

    }else if(clickDisabled === false){
        document.querySelector(`#likeBtn`).innerHTML = '<i class="fas fa-heart"></i>';
    }
}

storyRef.onSnapshot((snapshotData) => { // updates the people array on every change in firebase
    people = [];
    snapshotData.forEach(doc => {
        let data = doc.data();
        people.push(data);
    })

});
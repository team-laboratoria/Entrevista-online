$(document).ready(function(){
let config = {
    apiKey: "AIzaSyBCVgvNV0gko5O9rNFgQv8aXrtZOF2gzeM",
    authDomain: "fir-p-a292a.firebaseapp.com",
    databaseURL: "https://fir-p-a292a.firebaseio.com",
    projectId: "fir-p-a292a",
    storageBucket: "fir-p-a292a.appspot.com",
    messagingSenderId: "215671637058"
};

firebase.initializeApp(config);

$('.registradas').click(function () {
    window.location.href = '../views/registradas.html';
})

    var users = firebase.database().ref('users/');
    users.on('value', function (snapshot) {
        console.log(snapshot.val());
    });



// $('.card-registradas').append('<p class="card-text">''</p>')
})
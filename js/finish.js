let config = {
    apiKey: "AIzaSyBCVgvNV0gko5O9rNFgQv8aXrtZOF2gzeM",
    authDomain: "fir-p-a292a.firebaseapp.com",
    databaseURL: "https://fir-p-a292a.firebaseio.com",
    projectId: "fir-p-a292a",
    storageBucket: "fir-p-a292a.appspot.com",
    messagingSenderId: "215671637058"
  };
  
  firebase.initializeApp(config);

// Funcionalidad cerrar sesión
$('#logout').on('click', function (event) {
    event.preventDefault();
    firebase.auth().signOut().then(function () {
      // Sign-out successful.
      console.log('Saliste de sesion');
      window.location.href = 'http://www.laboratoria.la/';
    }).catch(function (error) {
      // An error happened.
      console.log(error);
    });
  });
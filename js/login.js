$(document).ready(function() {
  $('#signInUp').hide();
  $('#signIn').on('click', function() {
    $('#login').hide();
    $('#signInUp').show();
  });
  var config = {
    apiKey: 'AIzaSyBCVgvNV0gko5O9rNFgQv8aXrtZOF2gzeM',
    authDomain: 'fir-p-a292a.firebaseapp.com',
    databaseURL: 'https://fir-p-a292a.firebaseio.com',
    projectId: 'fir-p-a292a',
    storageBucket: 'fir-p-a292a.appspot.com',
    messagingSenderId: '215671637058'
  };
  firebase.initializeApp(config);

  // autenticando al usuario con google
  var provider = new firebase.auth.GoogleAuthProvider();
  $('#button-google').on('click', function() {
    firebase.auth().signInWithPopup(provider).then(function(result) {
      // The signed-in user info.
      var user = result.user;
      console.log(user);
      // ...
    });
  });

  var opEmail = false;
  var opPassword = false;
  var opname = false;
  var opsede = true;

  function activeFinalButton() {
    if (opEmail === true && opPassword === true && opname === true && opsede === true) {
      $('#login-button').attr('disabled', false);
      $('#btnSignUp').attr('disabled', false);
    } else {
      $('#login-button').attr('disabled', true);
      $('#btnSignUp').attr('disabled', true);

    }
  }

  $('#name').on('input', function(event) {
    if ($(this).val().length >= 5) {
      opname = true;
    } else {
      opname = false;
    }
    activeFinalButton();
  });

  // $('#sede').on('change', function(event) {
  //     opsede = true;
  //   activeFinalButton();
  // });

  $('#email').on('input', function(event) {
    var EMAILESTRUC = /^[a-zA-Z0-9\._-]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,3}$/;
    if (EMAILESTRUC.test($(this).val())) {
      opEmail = true;
    } else {
      opEmail = false;
    }
    activeFinalButton();
  });

  // validando password
  $('#password').on('input', function(event) {
    if ($(this).val().length >= 6) {
      opPassword = true;
    } else {
      opPassword = false;
    }
    activeFinalButton();
  });

  $('#btnSignUp').on('click', function(event) {
    var emailText = $('#email').val();
    var passwordText = $('#password').val();
    firebase.auth().createUserWithEmailAndPassword(emailText, passwordText).catch(function(error) {
    // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode) {
        $('#inputPassword').val('');
        alert(errorMessage);
      }
    });
  });
  $('#login-button').on('click', function(event) {
    // event.preventDefault();
    var emailText = $('#inputEmail').val();
    var passwordText = $('#inputPassword').val();
    firebase.auth().signInWithEmailAndPassword(emailText, passwordText).catch(function(error) {
    // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode) {
        $('#inputPassword').val('');
        alert(errorMessage);
      }
    });
  });


  // realizando acciones cuando el usuario este autenticado
  firebase.auth().onAuthStateChanged(function(user) {
    // si el usuario esta activo
    if (user) {
      var name = $('#name').val();
      var sede = $('#sede').val();
      localStorage.setItem('name', name);
      localStorage.setItem('sede', sede);
      window.location.href = 'views/welcome.html';
    } else {
      console.log('usuario no logeado');
    }
  });
});

  var config = {
    apiKey: 'AIzaSyBCVgvNV0gko5O9rNFgQv8aXrtZOF2gzeM',
    authDomain: 'fir-p-a292a.firebaseapp.com',
    databaseURL: 'https://fir-p-a292a.firebaseio.com',
    projectId: 'fir-p-a292a',
    storageBucket: 'fir-p-a292a.appspot.com',
    messagingSenderId: '215671637058'
  };
  firebase.initializeApp(config);

  var opEmail = false;
  var opPassword = false;
  var opname = false;
  var opsede = true;
  
  $('#email1').focus();
  
  function activeFinalButton() {
    if (opEmail && opPassword && opname && opsede) {
      $('#btnSignUp1').attr('disabled', false);
    } else {
      $('#btnSignUp1').attr('disabled', true);
    }
  }
  // realizando acciones cuando el usuario este autenticado
  $('#btnSignUp1').on('click', function(event) {
    event.preventDefault();
    var emailText = $('#email1').val();
    var passwordText = $('#password1').val();
    firebase.auth().signInWithEmailAndPassword(emailText, passwordText)
      .catch(function(error) {
    // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        alert('Contraseña incorrecta');
        $('#password1').val('');
      }
      if(errorCode === 'auth/invalid-email') {
        alert('Email no válido');
        $('#email1').val('');
      } else {
        alert(errorMessage);
      }
    });
  });
  
  function observer() { 
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
  };
  observer()
  var config = {
    apiKey: 'AIzaSyBCVgvNV0gko5O9rNFgQv8aXrtZOF2gzeM',
    authDomain: 'fir-p-a292a.firebaseapp.com',
    databaseURL: 'https://fir-p-a292a.firebaseio.com',
    projectId: 'fir-p-a292a',
    storageBucket: 'fir-p-a292a.appspot.com',
    messagingSenderId: '215671637058'
  };
  firebase.initializeApp(config);

  let opEmail = false;
  let opPassword = false;
  let opname = false;
  let opsede = true;
  
  $('#email1').focus();
  
  const activeFinalButton = () => {
    if (opEmail && opPassword && opname && opsede) {
      $('#btnSignUp1').attr('disabled', false);
    } else {
      $('#btnSignUp1').attr('disabled', true);
    }
  };
 
  // realizando acciones cuando el usuario este autenticado
  $('#btnSignUp1').on('click', function(event) {
    event.preventDefault();
    let emailText = $('#email1').val();
    let passwordText = $('#password1').val();
    firebase.auth().signInWithEmailAndPassword(emailText, passwordText)
      .catch(function(error) {
    // Handle Errors here.
      let errorCode = error.code;
      let errorMessage = error.message;
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
  
  const observer = () => {
    firebase.auth().onAuthStateChanged(function(user) {
      // si el usuario esta activo
      if (user) {
        let name = $('#name').val();
        let sede = $('#sede').val();
        localStorage.setItem('name', name);
        localStorage.setItem('sede', sede);
        window.location.href = 'views/welcome.html';
      } else {
        console.log('usuario no logeado');
      }
    });
  }
  observer()
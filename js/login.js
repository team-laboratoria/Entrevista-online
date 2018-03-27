let config = {
  apiKey: "AIzaSyBCVgvNV0gko5O9rNFgQv8aXrtZOF2gzeM",
  authDomain: "fir-p-a292a.firebaseapp.com",
  databaseURL: "https://fir-p-a292a.firebaseio.com",
  projectId: "fir-p-a292a",
  storageBucket: "fir-p-a292a.appspot.com",
  messagingSenderId: "215671637058"
};
firebase.initializeApp(config);

let opEmail = false,
  opPassword = false,
  opname = false,
  opsede = true;

$('#btnSignUp1').attr('disabled', true);
$('#btnSignUp').attr('disabled', true);

function activeFinalButton() {
  if (opEmail && opPassword && opname && opsede) {
    $('#btnSignUp1').attr('disabled', false);
    $('#btnSignUp').attr('disabled', false);
  }
}

$('#name').on('input', function (event) {
  if ($(this).val().length >= 5) opname = true
  else opname = false
  activeFinalButton();
});

$('#email').on('input', function (event) {
  let regex = /^[a-zA-Z0-9\._-]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,3}$/;
  if (regex.test($(this).val())) opEmail = true
  else opEmail = false
  activeFinalButton();
});

// validando password
$('#password').on('input', function (event) {
  if ($(this).val().length >= 6) opPassword = true
  else opPassword = false
  activeFinalButton();
});

$('#btnSignUp').on('click', function (event) {;
  firebase.auth().createUserWithEmailAndPassword($('#email').val(), $('#password').val()).catch(function (error) {
    if (error.code) {
      $('#password1').val('');
      alert(error.message);
    }
  });
});

// realizando acciones cuando el usuario este autenticado
$('#btnSignUp1').on('click', function (event) {
  firebase.auth().signInWithEmailAndPassword($('#email1').val(), $('#password1').val()).catch(function (error) {
    if (error.code) {
      $('#password1').val('');
      alert(error.message);
    }
  });
});

function observer() {
  firebase.auth().onAuthStateChanged(function (user) {
    // si el usuario esta activo
    if (user) {
      localStorage.setItem('name', $('#name').val());
      localStorage.setItem('sede', $('#sede').val());
      window.location.href = 'views/welcome.html';
    } else {
      console.log('usuario no logeado')
    }
  });
};
observer();

$('#btn-google').click(googleLogin);

function googleLogin() {
  var provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithPopup(provider)
    .then(function (result) {
      writeData(result)
    });

}

function writeData(user) {
  var usuario = {
    name: user.displayName,
    email: user.email,
    foto: user.photoURL
  };

  firebase.database().ref('users').child(user.uid)
    .set(usuario);
}

$('#btn-fb').click(fbLogin);

function fbLogin() {
  var provider = new firebase.auth.FacebookAuthProvider();

  firebase.auth().signInWithPopup(provider)
    .then(function (result) {});

}